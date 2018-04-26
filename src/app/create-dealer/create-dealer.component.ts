import { Component, OnInit, Input } from '@angular/core';
import { ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { Constants } from './../service/constants';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { AuthService } from './../service/auth.service';
import { ImageService } from './../service/image.service';
import * as cbv from './../models/vendor';
import * as _ from 'lodash';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { DealerService } from './../service/dealer.service';
import { Utils } from './../utils/utils';
import { UserService } from './../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Placeholder } from './../widgets/placeholders/placeholder.model';
import * as FileAPI from 'fileapi';
import { Checkbox } from "primeng/primeng";
import { element } from 'protractor';
import * as consts from './../models/DropValues';
import { Communicator } from './../service/communicator.service';
import * as moment from 'moment';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'app-create-dealer',
  templateUrl: './create-dealer.component.html',
  styleUrls: ['./create-dealer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateDealerComponent implements OnInit {

  load: boolean;
  google;
  vendor: cbv.Vendor.VendorDetail = new cbv.Vendor.VendorDetail();
  placedetail: google.maps.places.PlacesService;
  geoCoderDetail: google.maps.Geocoder;
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
  check: boolean = false;
  hours: any[] = [];
  start: any;
  end: any;
  checkArray: boolean[] = [];
  checkBoxes: Checkbox[];
  showBar: any[] = new Array<any>();
  images: any[];
  uploadImgages: any[];
  dialog;
  editImage: any;
  public logoPreviewUrl: any;
  public imagePreviewUrl: any;
  public binary_string: any;
  public image: any;
  public msg: any;
  logoName: any;
  imageName: any;
  hover: any;
  loading: boolean = false;
  disableButton: boolean = false;
  selectedbrand: string;
  checked: boolean = false;
  values: string[];
  errorMessage: string;
  reset: any;
  showDialog: boolean;
  workingHour: any;
  venderfound: boolean = false;
  selectedVendorType: string;
  allbrand: boolean = false;
  vendorstatus: any;
  options: any;
  overlays: any[];
  icon: any;
  checkArrayImage: any[];
  multibrands: boolean = false;
  phoneNo: any[];
  emailList: any[];
  errorEmailMessage: string;
  errorEmail: boolean;
  errorPhoneNo: boolean;
  errorPhoneNoMessage: string;
  errorEmailMsg: string;


  map: google.maps.Map;


  brands = consts.brands;
  dealerType = consts.dealerType;

  debounceSearch = _.debounce((query) => this.searchUnclaimedBusiness(query), 1000, {});
  debounceEmailSearch = _.debounce((query) => this.searchEmailDealer(query), 1000, {});


  @ViewChild("addresssearch", { read: ElementRef })
  public searchElementRef: ElementRef;
  vendortype = [];

  constructor(private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private auth: AuthService,
    private dealer: DealerService,
    private currentRoute: Router, private userService: UserService, private communicator: Communicator, private toasterService: ToasterService) {
    this.start = moment(8, "HH")['_d'].getTime();
    this.end = moment(18, "HH")['_d'].getTime();
    this.hours = [
      { dayOfWeek: 'MONDAY', openingTime: { startTime: this.start, endTime: this.end }, holiday: false },
      { dayOfWeek: 'TUESDAY', openingTime: { startTime: this.start, endTime: this.end }, holiday: false },
      { dayOfWeek: 'WEDNESDAY', openingTime: { startTime: this.start, endTime: this.end }, holiday: false },
      { dayOfWeek: 'THURSDAY', openingTime: { startTime: this.start, endTime: this.end }, holiday: false },
      { dayOfWeek: 'FRIDAY', openingTime: { startTime: this.start, endTime: this.end }, holiday: false },
      { dayOfWeek: 'SATURDAY', openingTime: { startTime: this.start, endTime: this.end }, holiday: false },
      { dayOfWeek: 'SUNDAY', openingTime: { startTime: this.start, endTime: this.end }, holiday: false }
    ];

    this.vendortype = [
      { label: 'Vehicle Dealer', value: 'VEHICLEDEALER' },
      { label: 'Car Repair and Service', value: 'CAR_REPAIR_AND_SERVICE' },
      { label: 'Financing', value: 'FINANCING' },
      { label: 'Garage', value: 'GARAGE' },
      { label: 'Insurance', value: 'INSURANCE' },
      { label: 'Leasing', value: 'LEASING' },
      { label: 'Fuel', value: 'FUEL' },
      { label: 'Preowned Cars', value: 'PREOWNED_CARS' },
      { label: 'Car Detailing Service', value: 'CAR_DETAILING_SERVICE' }
    ];

    this.vendorstatus = [
      { label: 'Registered', value: 'REGISTERED' },
      { label: 'Invited', value: 'INVITED' },
      { label: 'Approved', value: 'APPROVED' },
      { label: 'Removed', value: 'REMOVED' },
      { label: 'Unregistered', value: 'UNREGISTERED' }
    ];

    this.icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

  }

  setMap(event) {
    this.map = event.map;
    console.log('map ready', this.map);
    if (this.vendor.address.geopoint.lat && this.vendor.address.geopoint.lon) {
      this.setPostion();
    }
  }

  ngOnInit() {

    // this.options = {
    //     center: {lat: 36.890257, lng: 30.707417},
    //     zoom: 12
    // };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentPosition.bind(this));
    }

    this.mapsAPILoader.load().then(() => {
      this.placedetail = new google.maps.places.PlacesService(document.createElement('div'))
      this.geoCoderDetail = new google.maps.Geocoder();
    })


    if (localStorage.getItem('vendorId')) {
      this.venderfound = true;
      this.getDealerProfile();
    }

  }

  onAllBrandchange(e) {
    console.log(e);
    this.vendor.listOfBrands.push("All Brands")
  }

  onMultibrandschange(e) {
    this.vendor.listOfBrands.push("Multi Brands")
  }

  setCurrentPosition(position) {
    this.options = {
      center: { lat: position.coords.latitude, lng: position.coords.longitude },
      zoom: 12
    }
  }

  setPostion() {
    this.overlays = [];
    this.map.setCenter(new google.maps.LatLng(this.vendor.address.geopoint.lat, this.vendor.address.geopoint.lon))
    this.overlays.push(new google.maps.Marker({ position: { lat: this.vendor.address.geopoint.lat, lng: this.vendor.address.geopoint.lon }, draggable: true, icon: this.icon }));
  }

  handleDragEnd(event, overlays) {
    console.log('drag', event.originalEvent.latLng.lat(), event.originalEvent.latLng.lng(), overlays);
    var latlng = { lat: event.originalEvent.latLng.lat(), lng: event.originalEvent.latLng.lng() }
    this.geoCoderDetail.geocode({ 'location': latlng }, (results, status) => {
      if (results[0]) {
        var type: any;
        if (event != null && event.overlay != null) {
          this.loadMap(results[0])
        }
      }
    });
  }

  getAutoPlaces(e) {
    this.overlays = [];
    this.placedetail.getDetails({ placeId: e.place_id }, (results, status) => {
      this.options.center.lat = results.geometry.location.lat();
      this.options.center.lng = results.geometry.location.lng();
      this.overlays.push(new google.maps.Marker({ position: { lat: this.options.center.lat, lng: this.options.center.lng }, draggable: true, icon: this.icon }));
      this.map.setCenter(new google.maps.LatLng(this.options.center.lat, this.options.center.lng))
      if (results) {
        console.log(results);
        this.loadMap(results);
      }
    })
  }

  loadMap(place) {

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
            this.vendor.address.county = comp.long_name;
            this.vendor.address.countrycode = comp.short_name;
            break;
          default:
            break;
        }
      }, this);

  }

  resetSearch() {
    localStorage.removeItem('vendor');
    localStorage.removeItem('vendorId');
    window.location.reload();
  }

  getVehicleLogo(make) {
    if (make != null && make != undefined && make.length > 1)
      return Constants.CARBOOK_BASE_URL + Constants.GET_VEHICLE_LOGO(make);
  }

  selectBrand(e) {
    this.vendor.listOfBrands = e.value;
    console.log(this.vendor.listOfBrands);
  }

  selectVendorType(e) {
    console.log(e);
    this.vendor.vendortype = e.value;
  }

  selectVendorStatus(e) {
    this.vendor.vendorStatus = e.value;
  }

  addPhoneNumber(e) {
    this.vendor.phoneNumbers = e;
  }

  removePhoneNumber(e) {
    this.vendor.phoneNumbers = e;
  }

  // addEmail(e){
  //   this.vendor.emails = e;
  // }

  // removeEmail(e){
  //   this.vendor.emails = e;
  // }

  addlistOfService(e) {
    console.log(e);
    this.vendor.servicesOffered = e;
    console.log('service', this.vendor.servicesOffered);
  }

  removelistOfService(e) {
    this.vendor.servicesOffered = e;
    console.log(this.vendor.servicesOffered);
  }

  searchEmail(val) {
    this.debounceEmailSearch(val);
  }

  searchEmailDealer(query) {
    this.dealer.dealerByEmail(query).subscribe(res => {
      this.errorEmailMsg = "Dealer Email Already Exists";
      this.load = false;
      this.toasterService.pop('error', 'Error', 'Dealer Email Id Exists');
    })
  }

  getDealerProfile() {
    this.load = true;
    this.showDialog = (true);
    this.dealer.getDealerDetails(localStorage.getItem('vendorId')).subscribe(res => {
      this.showDialog = (false);
      if (res.servicesOffered)
        this.values = res.servicesOffered;
      else
        this.values = [];
      if (res.listOfBrands)
        this.selectedbrand = res.listOfBrands;
      if (res.openTimes) {
        this.convertToISO(res.openTimes);
      }
      else {
        res.openTimes = this.hours;
        console.log('time', res.openTimes);
      }
      this.vendor = _.merge(new cbv.Vendor.VendorDetail(), res);
      this.clearChecks(this.vendor.logoUrl ? this.vendor.photoUrlGallery.indexOf(this.vendor.logoUrl) : 0);
      console.log("shgdshjsghjs",this.vendor);
      // Boolean Array for checkbox
      this.checkArray = new Array(this.vendor.openTimes.length).fill(false);
      this.hours = res.openTimes;
      this.convertFromISO(this.hours);
      this.load = false;
    }, err => {
      this.showDialog = (false);
      this.toasterService.pop('error', 'Error', 'Error in getting Dealer Deatails');
    });
  }

  fetchDealer() {
    this.showDialog = (true);
    this.dealer.fetchDealer(localStorage.getItem('vendorId')).subscribe(res => {
      this.showDialog = (false);
      if (res.openTimes)
        this.convertToISO(res.openTimes);

      this.vendor = _.merge(new cbv.Vendor.VendorDetail(), res);
      this.getDealerProfile();
    }, err => {
      this.showDialog = (false);
      this.toasterService.pop('error', 'Error', 'Error in getting Dealer Deatails');
    })
  }

  valEmail() {
    if (this.vendor.email)
      return Utils.validateEmail(this.vendor.email);

    else
      return true;
  }

  valNumber() {
    if (this.vendor.phoneNumber)
        return Utils.returnNumbers(this.vendor.phoneNumber)
    else
      return true;
  }

  /**
   *for adding multiple emails and validating each of them. Same goes for phonenumbers 
   *
   */
  valEmailArray(event) {
    console.log("p chip email", event.value, this.vendor.emails)
    var value = Utils.validateEmail(event.value);
    console.log("value", value);
    if (value) {
      this.errorEmailMessage = ''
      this.errorEmail = false;
    }
    else {
      this.errorEmailMessage = "Invalid Email"
      this.errorEmail = true;
    }
  }

  addEmail(event) {
    if (!_.includes(this.vendor.emails, event.value)) {
      if (this.vendor.emails == undefined) {
        this.vendor.emails = []
        this.vendor.emails.push(event.value);
        console.log("emails", this.vendor.emails);
      }
      else {
        this.vendor.emails.push(event.value);
        console.log("emails", this.vendor.emails);
      }
    }
    this.valEmailArray(event);
  }

  removeEmail(event) {
    console.log("event", event);
    var temp = this.vendor.emails
    _.remove(this.vendor.emails, function (email) {
      console.log("email and value", email, event.value)
      return email == event.value
    })
    console.log("emails after removed", this.vendor.emails)
  }

  parsePhoneNo(event) {
    console.log(event.value);
    var value = Utils.returnNumbers(event.value);
    console.log("value", value, this.vendor.phoneNumbers);
    if (value) {
      this.errorPhoneNo = false;
      this.errorPhoneNoMessage = '';
    }
    else {
      this.errorPhoneNo = true;
      this.errorPhoneNoMessage = 'Invalid Phone Number'
    }
  }

  addPhoneNo(event) {
    console.log(event.value);
    if (!_.includes(this.vendor.phoneNumbers, event.value)) {
      if (this.vendor.phoneNumbers == undefined) {
        this.vendor.phoneNumbers = [];
        this.vendor.phoneNumbers.push(event.value);
      }
      else {
        this.vendor.phoneNumbers.push(event.value);
      }
    }
    this.parsePhoneNo(event)
  }

  removePhoneNo(event) {
    console.log("event", event.value)
    _.remove(this.vendor.phoneNumbers, function (phoneNo) {
      console.log("email and value", phoneNo, event.value)
      return phoneNo == event.value
    })
    console.log("emails after removed", this.vendor.phoneNumbers)
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
    this.errorMessage = "";
    console.log(query);
    this.load = true;
    this.dealer.searchDealer(query).subscribe(res => {
      console.log("Dealer Search", res);
      this.errorMessage = "Dealer Already Exists"
      this.load = false;
    })
  }

  goForIgnition() {
    return this.vendor.name != undefined && this.vendor.email != undefined && Utils.validateEmail(this.vendor.email) &&
    Utils.returnNumbers(this.vendor.phoneNumber) != undefined;
  }


  saveOrUpdate() {
    if (this.vendor.id) {
      this.updateDealerProfile()
    } else {
      this.saveProfile()
    }
  }

  convertToMili() {
    this.workingHour = this.hours
    this.workingHour.forEach(time => {
      time.openingTime.startTime = moment(time.openingTime.startTime)['_d'].getTime();
      time.openingTime.endTime = moment(time.openingTime.endTime)['_d'].getTime();
    })
    this.vendor.openTimes = this.workingHour;
    console.log('fresh', this.vendor.openTimes);
  }


  saveProfile() {
    this.showDialog=(true);
    this.convertToMili();
    //  this.vendor.openTimes = this.hours;
    if(this.vendor.phoneNumbers)
      this.vendor.phoneNumbers.push(this.vendor.phoneNumber)
    else{
      this.vendor.phoneNumbers = []
      this.vendor.phoneNumbers.push(this.vendor.phoneNumber)
    }

    if(this.vendor.emails)
      this.vendor.emails.push(this.vendor.email);
    else {
      this.vendor.emails = [];
      this.vendor.emails.push(this.vendor.email);
    }
    this.vendor.address.countrycode = this.vendor.address.countrycode.toUpperCase();
    this.dealer.createDealer(Utils.pruneEmpty(this.vendor)).subscribe(res => {
      console.log(res);
      //  this.showDialog=(false);
      localStorage.setItem('vendorId', res.vendorId);
      setTimeout(() => {
        this.fetchDealer();
      }, 3000)
      this.venderfound = true;
      this.toasterService.pop('success', 'Add New Dealer', 'Dealer Created Successfully');
    },
      err => {
        console.log("error", err);
        if (err.status == 409) {
          this.toasterService.pop('error', 'Dealer Already Exist', 'Dealer Name or Email Already Exists');
        }
        else {
          this.toasterService.pop('error', 'Add New Dealer', 'Error creating dealer');
        }
        this.showDialog = (false);
      });
  }

  //replace(a.substr(-3), "000")

  convertToISO(openTimes) {
    openTimes.forEach(function (time) {
      if(time.openingTime.startTime.substr(-3) != "000"){
        time.openingTime.startTime = time.openingTime.startTime.slice(0,-3).concat("000")
      }
      if(time.openingTime.endTime.substr(-3) != "000"){
        time.openingTime.endTime = time.openingTime.endTime.slice(0,-3).concat("000")
      }
      time.openingTime.startTime = time.openingTime.startTime + 'Z';
      time.openingTime.endTime = time.openingTime.endTime + 'Z';
    }.bind(this));
    console.log('converted', openTimes);
  }

  convertFromISO(hours) {
    hours.forEach(function (time, index) {
      time.openingTime.startTime = new Date(time.openingTime.startTime);   //Converting to IST format of openTimes
      time.openingTime.endTime = new Date(time.openingTime.endTime);
      this.statusCheck(time.openingTime.startTime, index)
    }.bind(this));
    console.log('converted hour', hours);
  }

  statusCheck(start_time, index) {
    if (start_time.getHours() == 0) {
      this.checkArray[index] = true;
    }
  }

  toggle(index, event) {
    console.log(event, index);
    if (event) {
      this.hours[index].openingTime.startTime = new Date().setHours(0, 0, 0);
      this.hours[index].openingTime.endTime = new Date().setHours(0, 0, 0);
      this.hours[index].holiday = event;
    } else {
      (this.hours[index].openingTime.startTime = new Date()).setHours(8, 0, 0);
      (this.hours[index].openingTime.endTime = new Date()).setHours(18, 0, 0);
      this.hours[index].holiday = event;
    }
    this.vendor.openTimes[index].openingTime.startTime = new Date(this.hours[index].openingTime.startTime);
    this.vendor.openTimes[index].openingTime.endTime = new Date(this.hours[index].openingTime.endTime);
  }

  setStartTime(i, event) {
    this.vendor.openTimes[i].openingTime.startTime = new Date(event);
    console.log('ccc', this.vendor.openTimes);
  }

  setEndTime(i, event) {
    this.vendor.openTimes[i].openingTime.endTime = new Date(event);
  }

  updateDealerProfile() {
    this.showDialog = (true);
    // this.convertToMili();
    this.vendor.openTimes = this.hours;
    this.dealer.updateDealer(this.vendor.id, this.vendor).subscribe(res => {
      // this.showDialog=(false); 
      console.log(res);
      setTimeout(() => {
        this.fetchDealer();
      }, 3000)
      this.toasterService.pop('success', 'Update Dealer', 'Dealer Updated Successfully');
    }, err => {
      console.log("updateProfile", err);
      this.showDialog = (false);
      this.toasterService.pop('error', 'Update Dealer', 'Error updating dealer');
    })
  }

  deleteImage(i) {
    this.vendor.photoUrlGallery.splice(i, 1);
  }

  deleteUploadedLogo(img) {
    this.vendor.logoUrl = '';
  }



  addImageToGallery(event) {
    this.vendor.photoUrlGallery = this.vendor.photoUrlGallery.concat(event);
    console.log(this.vendor.photoUrlGallery);
    //this.updateDealerImage();
  }

  setLogo(index, event) {
    console.log(index);
    if (event) {
      this.vendor.logoUrl = this.vendor.photoUrlGallery[index];
    } else {
      this.vendor.logoUrl = '';
    }
    this.vendor.photoUrlGallery.splice(0, 0, this.vendor.photoUrlGallery.splice(index, 1)[0]);
    this.clearChecks(this.vendor.logoUrl ? this.vendor.photoUrlGallery.indexOf(this.vendor.logoUrl) : 0);
    console.log(this.vendor);
    //this.updateDealerImage();
  }

  private clearChecks(index) {
    this.checkArrayImage = new Array(this.vendor.photoUrlGallery.length).fill(false);
    this.checkArrayImage[index] = true;
    console.log(this.checkArrayImage);
  }

  zoomIn(map) {
    map.setZoom(map.getZoom() + 1);
  }

  zoomOut(map) {
    map.setZoom(map.getZoom() - 1);
  }

}
