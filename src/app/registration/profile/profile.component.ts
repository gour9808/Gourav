import { Component, OnInit, Input } from '@angular/core';
import { ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { Constants } from '../../service/constants';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { AuthService } from '../../service/auth.service';
import { ImageService } from '../../service/image.service';
import * as cbv from '../../models/vendor';
import * as _ from 'lodash';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { DealerService } from '../../service/dealer.service';
import { Utils } from '../../utils/utils';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Placeholder } from '../../widgets/placeholders/placeholder.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit {
  load: boolean;
  google;
  vendor: cbv.Vendor.VendorDetail = new cbv.Vendor.VendorDetail();
  file: any;
  imageUrl: string;
  user: any;
  latitude: number;
  longitude: number;
  searchControl: FormControl;
  zoom: number;
  route: string;
  fullAddress: any[];
  display: boolean = false;
  check : boolean = false;  

  debounceSearch = _.debounce((query) => this.searchUnclaimedBusiness(query), 1000, {});

  @ViewChild("addresssearch", { read: ElementRef })
  public searchElementRef: ElementRef;

  constructor(private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private auth: AuthService,
    private dealer: DealerService,
    private currentRoute: Router, private userService: UserService) { }

  ngOnInit() {
    //set google maps defaults
    console.log(this.currentRoute.url);
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();
    //load Places Autocomplete
    this.loadMap();

    // this.getUserProfile();
     if (localStorage.getItem('vendorId'))
       this.getDealerProfile();
  }

  getUserProfile() {
    this.userService.getUserOrgInfo().subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }

  getDealerProfile() {
    //this.load = true;
    this.check = true;
    this.dealer.getDealerDetails(localStorage.getItem('vendorId')).subscribe(res => {
      this.vendor = res;
      this.check = false;
      this.vendor = _.merge(new cbv.Vendor.VendorDetail(), res);
      console.log(this.vendor);
      //this.load = false;
    });
  }

  loadMap() {
    this
      .mapsAPILoader
      .load()
      .then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement.children[0].children[1], { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this
            .ngZone
            .run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              console.log(place.address_components)
              //  this.fullAddress = place.address_components; verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }

              //set latitude, longitude and zoom
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();

              this.vendor.address.geopoint.lat = this.latitude;
              this.vendor.address.geopoint.lon = this.longitude;
              this.vendor.address.geopoint.alt = 0;

              place.address_components
                .forEach(function (comp, index) {
                  switch (comp.types[0]) {
                    case "premise":
                      this.vendor.address.housenumber = comp.long_name;
                      break;
                    case "administrative_area_level_1":
                      this.vendor.address.state = comp.long_name;
                      break;
                    case "postal_code":
                      this.vendor.address.postcode = parseFloat(comp.long_name);
                      break;
                    case "locality":
                      this.vendor.address.city = comp.long_name;
                      break;
                    case "route":
                      this.vendor.address.street = comp.long_name
                      break;
                    case "country":
                      this.vendor.address.countrycode = comp.short_name;
                      break;
                    default:
                      break;
                  }
                }, this);

              this.longitude = place
                .geometry
                .location
                .lng();
              this.zoom = 12;
              // this.getAddress();
            });
        });
      });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator
        .geolocation
        .getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
        });
    }
  }

  valEmail() {
    if (this.vendor.email)
      return Utils.validateEmail(this.vendor.email);
    else
      return true;
  }

  /**
   * Use this method to search if dealer already exists in carbook
   * If dealear does exist, check if it is an unclaimed business entity
   * If unnclaimed, then show claim business button and let user claim it
   * If claimed, show conflict that dealer already exists
   * @param val Keyword to search
   * 
   */
  search(val) {
    this.debounceSearch(val);
  }

  searchUnclaimedBusiness(query) {
    console.log(query);
    this.load = true;
    this.dealer.searchDealer(query).subscribe(res => {
      console.log("Dealer Search", res);
      this.load = false;
    })
  }



  goForIgnition() {
    return this.vendor.name != undefined && this.vendor.email != undefined && Utils.validateEmail(this.vendor.email) && this.vendor.phoneNumber != undefined;
  }

  saveOrUpdate() {
    if (this.vendor.id) {
      this.updateProfile()
    } else {
      this.saveProfile()
    }
  }

  saveProfile() {
    this.vendor.vendorStatus = 'REGISTERED';
    this.vendor.vendortype = 'VEHICLEDEALER';
    this.dealer.createDealer(Utils.pruneEmpty(this.vendor)).subscribe(res => {
      console.log(res);
      localStorage.setItem('vendorId', res.vendorId);
    },
      err => {
        console.log("error", err);
        // this.toastyService.error({
        //   title: "Error",
        //   msg: "Dealer Exists",
        //   showClose: false,
        //   timeout: 3000,
        //   theme: 'default'
        // });
      });
  }

  updateProfile() {

    this.dealer.updateDealer(this.vendor.id, this.vendor).subscribe(res => {
      console.log('updated successfully', res);
      // this.toastyService.success({
      //   title: "Profile Updated",
      //   msg: this.vendor.name + ' updated',
      //   showClose: false,
      //   timeout: 3000,
      //   theme: 'default'
      // });
    }, err => {
      console.log("updateProfile", err);
      // this.toastyService.error({
      //     title: "Error",
      //     msg: "Error updating "+this.vendor.name,
      //     showClose: false,
      //     timeout: 3000,
      //     theme: 'default'
      //   });
    })
  }

}

