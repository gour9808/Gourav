import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import * as cbv from '../../models/VehicleDetail';
import { VehicleService } from '../../service/vehicle.service';
import * as _ from 'lodash';
import { Communicator } from '../../service/communicator.service';
import { ToasterService } from 'angular2-toaster';
import * as consts from '../../models/DropValues';
import { Router } from '@angular/router';
@Component({
  selector: 'app-copy-paste-vehicle',
  templateUrl: './copy-paste-vehicle.component.html',
  styleUrls: ['./copy-paste-vehicle.component.scss']
})
export class CopyPasteVehicleComponent implements OnInit {

  reset: any;
  showDialog:boolean;
  @Output() searchResults = new EventEmitter<any>();
  search = {
    make: "", model: "", variant: "", country: ""
  }
  countries = consts.countries;

  constructor(private service: VehicleService, private router: Router,private commmunicator: Communicator, private toast: ToasterService) { }

  ngOnInit() {
  }

  resetSearch() {
    this.search = {
      make: "", model: "", variant: "", country: null
    }
    this.reset = new Date().getMilliseconds(); //hack to make sure that changes are fired. Because IDK.
    this.commmunicator.resetData();
  }

  searchVehicle() {
    this.showDialog=(true);
    this.service.searchVehicle(this.search.make, this.search.model, this.search.variant, this.search.country).subscribe(res => {
      console.log("Search Results", res);
      this.showDialog=(false);
      if (res) {
        this.commmunicator.publishData(_.filter(res, ['deleted', false]));
      } else {
        this.toast.pop('info', "Search Vehicles", "No vehicles found");
      }
    })
  }

vehicleSelected(event) {
    console.log("vehicle selected",event.data);
   this.router.navigate(['/home/vehicle/clone',event.data.id]);
  }

  goForSearch() {
    return this.search.make || this.search.model || this.search.variant || this.search.country;
  }
}
