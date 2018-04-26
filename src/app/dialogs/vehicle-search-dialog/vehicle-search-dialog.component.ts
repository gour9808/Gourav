import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as consts from '../../models/DropValues';
import { VehicleService } from '../../service/vehicle.service';
import { Communicator } from '../../service/communicator.service';
import { ToasterService } from 'angular2-toaster';
import * as _ from 'lodash';

@Component({
  selector: 'app-vehicle-search-dialog',
  templateUrl: './vehicle-search-dialog.component.html',
  styleUrls: ['./vehicle-search-dialog.component.scss']
})
export class VehicleSearchDialogComponent implements OnInit {

reset: any;
  showDialog:boolean;
  @Input() searchFor:any;
  @Output() searchResults = new EventEmitter<any>();
  search = {
    make: "", model: "", variant: "", country: ""
  }
  countries = consts.countries;

  constructor(private service: VehicleService, private toast: ToasterService) { }

  ngOnInit() {
  }

  resetSearch() {
    this.search = {
      make: "", model: "", variant: "", country: null
    }
    this.reset = new Date().getMilliseconds(); //hack to make sure that changes are fired. Because IDK.
  }

  searchVehicle() {
    this.showDialog=(true);
    this.service.searchVehicle(this.search.make, this.search.model, this.search.variant, this.search.country).subscribe(res => {
      console.log("Search Results", res);
      this.showDialog=(false);
      if (res) {
        this.searchResults.emit({'vehicle':_.filter(res, ['deleted', false]),'clone':this.searchFor});
      } else {
        this.toast.pop('info', "Search Vehicles", "No vehicles found");
      }
    });
  }

  goForSearch() {
    return this.search.make && this.search.model && this.search.variant && this.search.country;
  }
}
