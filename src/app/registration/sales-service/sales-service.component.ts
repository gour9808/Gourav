import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http'
import { SelectItem } from 'primeng/primeng';
import { DealerService } from '../../service/dealer.service';
import { Utils } from '../../utils/utils';
import { ToasterService } from 'angular2-toaster';
import * as consts from '../../models/DropValues';
import { VehicleService } from '../../service/vehicle.service';
import * as _ from 'lodash';
import { Communicator } from '../../service/communicator.service';

@Component({
  selector: 'app-sales-service',
  templateUrl: './sales-service.component.html',
  styleUrls: ['./sales-service.component.scss']
})
export class SalesServiceComponent implements OnInit {
  reset: any;
  vehicles: any[] = [];
  cities : any [] = [];
  serviceOffered :  string[];
  search: any = {};
  countries = consts.countries;
  constructor(private DealerService: DealerService, private service: VehicleService, private commmunicator: Communicator, private toast: ToasterService) {
  }

  ngOnInit() {
        this.cities = [];
        this.cities.push({label:'New York', value:'New York'});
        this.cities.push({label:'Rome', value:'Rome'});
        this.cities.push({label:'London', value:'London'});
        this.cities.push({label:'Istanbul', value:'Istanbul'});
        this.cities.push({label:'Paris', value:'Paris'});
  }

  selectedType(e){
    console.log(e);
  }

   searchVehicle() {
      this.service.searchVehicle(this.search.make, this.search.model, this.search.variant, this.search.country).subscribe(res => {
      console.log("Search Results", res);
      if (res) {
        this.commmunicator.publishData(_.filter(res, ['deleted', false]));
      } else {
        this.toast.pop('info', "Search Vehicles", "No vehicles found");
      }
    })
  }

  resetSearch() {
    this.search = {
      make: "", model: "", variant: "", country: null
    }
    this.reset = new Date().getMilliseconds(); //hack to make sure that changes are fired. Because IDK.
    this.commmunicator.resetData();
  }

   goForSearch() {
    return this.search.make || this.search.model || this.search.variant || this.search.country;
  }
}

