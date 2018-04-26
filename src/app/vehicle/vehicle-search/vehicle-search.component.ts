import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleService } from '../../service/vehicle.service';
import * as _ from 'lodash';
import { Communicator } from '../../service/communicator.service';
import { ToasterService } from 'angular2-toaster';
import * as consts from '../../models/DropValues';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit {
  reset: any;
  showDialog:boolean;
  @Output() searchResults = new EventEmitter<any>();
  search = {
    make: "", model: "", variant: "", country: ""
  }
  countries = consts.countries;

  constructor(private service: VehicleService, private commmunicator: Communicator, private toast: ToasterService) { }

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

  goForSearch() {
    return this.search.make || this.search.model || this.search.variant || this.search.country;
  }
}
