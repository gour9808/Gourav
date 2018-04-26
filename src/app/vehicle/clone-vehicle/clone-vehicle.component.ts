import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Constants } from '../../service/constants';
import { VehicleService } from '../../service/vehicle.service';
import * as cbv from '../../models/VehicleDetail';
import * as _ from 'lodash';
import { ToasterService } from 'angular2-toaster';
import { vehicles } from '../../app.globals';
import { Communicator } from '../../service/communicator.service';
import * as consts from '../../models/DropValues';
import { countries, serviceType } from '../../models/DropValues';
import { Router } from '@angular/router';
import { DataStorageService } from '../../service/data-storage.service';
import { Utils } from '../../utils/utils';
@Component({
  selector: 'app-clone-vehicle',
  templateUrl: './clone-vehicle.component.html',
  styleUrls: ['./clone-vehicle.component.scss']
})
export class CloneVehicleComponent implements OnInit {
 @Input() vehicles: cbv.Vehicle.VehicleDetail;
  @Input() loadingVehicles;
  vehicle: cbv.Vehicle.VehicleDetail = new cbv.Vehicle.VehicleDetail();

  @Input() showAdd;
  serviceList: cbv.Vehicle.ServiceDetail[] = [];
    serviceList1: cbv.Vehicle.ServiceDetail[] = [];

  partsList: cbv.Vehicle.Part[] = [];
    partsList1: cbv.Vehicle.Part[] = [];

  @Output() onVehicleSelected = new EventEmitter<any>();
  @Output() onVehicleDeleted = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() showToast = new EventEmitter<any>();
  @ViewChild('vehicleListTable') tableDiv: ElementRef;
  scrollH: any;
  displayPartDialog
  countries = consts.countries;
  search = {
    make: "", model: "", variant: "", country: ""
  }

  constructor(private service: VehicleService, private toasterservice: ToasterService,
    private communicator: Communicator, private toaster: ToasterService, private router: Router, private storage: DataStorageService) {
    this.communicator.vehicleList$.subscribe(list => {
      console.log("Comms active", list);
      if (list != undefined)
        this.vehicles = list;
      else
        this.getVehicleList();

    });
  }

  ngOnInit() {
   
  }

  ngAfterViewInit() {
  }

  searchVehicle() {
    this.service.searchVehicle(this.search.make, this.search.model, this.search.variant, this.search.country).subscribe(res => {
      console.log("Search Results", res);
      if (res) {
        this.communicator.publishData(_.filter(res, ['deleted', false]));
      } else {
        this.toaster.pop('info', "Search Vehicles", "No vehicles found");
      }
      if(res.length === 1) {
        this.partsList1 = res[0].parts;
        this.vehicle =  res[0]; 
        console.log("selected vehicle" + this.vehicle);
      }
    })
  }


  goForIgnition() {
    return (this.vehicle.make && this.vehicle.model && this.vehicle.variant && this.vehicle.countryCode);
  }

  getVehicleList() {
    this.loadingVehicles = true;
    this.service.getVehicleList().subscribe(res => {
      this.loadingVehicles = false;
      var results = _.filter(res, ['deleted', false])
      this.vehicles = results;
      console.log("Vehicle are", this.vehicles);
    }, error => {
      this.loadingVehicles = false;
      console.log(error);
      this.toasterservice.pop('error', 'Error Getting Vehicles', error);
    });
  }

  showSearch() {
    console.log(this.vehicles);
    this.onSearch.emit(true);
  }

  vehicleDuplicate(event) {
    console.log(event);
    this.storage.setClone(event);
    this.router.navigate(['/home/vehicle/new']);
  }

  goForSearch() {
    return this.search.make && this.search.model && this.search.variant && this.search.country;
  }

  getCountry(locale) {
    let country = _.find(countries, function (item) {
      return item.value == locale;
    });
    if (country)
      return country.label;
  }

  vehicleDeleted(event) {
    this.showDialog.emit(true);
    console.log("delete ", event);
    this.service.deleteVehicle(event.id).subscribe(res => {
      console.log("toaster")
      this.showDialog.emit(false);
      console.log("Deleted", res);
      this.toasterservice.pop('success', 'Delete Vehicle', 'Vehicle Deleted Successfully');
      this.getVehicleList();
    },
      err => {
        console.log("error", err);
        this.showDialog.emit(false);
        this.toasterservice.pop('error', 'Delete Vehicle', 'Error deleting vehicle ' + err);
      });
  }

  vehicleSelected(event)
  {
console.log(event.data.id)
this.router.navigate(['/home/vehicle/paste',event.data.id ])

  }

}
