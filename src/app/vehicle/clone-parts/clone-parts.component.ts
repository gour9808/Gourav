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
  selector: 'app-clone-parts',
  templateUrl: './clone-parts.component.html',
  styleUrls: ['./clone-parts.component.scss']
})
export class ClonePartsComponent implements OnInit {

  @Input() vehicles: cbv.Vehicle.VehicleDetail;
  @Input() loadingVehicles;
  vehicle: cbv.Vehicle.VehicleDetail = new cbv.Vehicle.VehicleDetail();

  @Input() showAdd;
  serviceList: cbv.Vehicle.ServiceDetail[] = [];
  partsList: cbv.Vehicle.Part[] = [];

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
    return this.search.make && this.search.model || this.search.variant || this.search.country;
  }


  vehicleSelected(event) {
    console.log(event.data.id)
    console.log(event.data)
    this.partsList = [];
    this.serviceList=[];

    for(var i =0; i< event.data.serviceDetailList.length; i++)
    {
      this.serviceList.push(event.data.serviceDetailList[i])
    }
    for(var i = 0; i < event.data.parts.length; i++) {
      this.partsList.push(event.data.parts[i]);
    }
    //this.partsList.push(event.data.parts);
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

  cloneParts(vehicle) {
    console.log(this.partsList);
    //let a = this.partsList;
    console.log(this.serviceList);

    console.log("vehicle is", vehicle);


    vehicle.parts = this.partsList;
    vehicle.serviceDetailList = this.serviceList;
    this.service.updatevehicleDetails(vehicle, vehicle.id).subscribe(res => {

      console.log(res)

    }, error => {
      console.log(error);

    });;
  }

}

  // validateVehicle( parts, services) {
  //   let i, j;
  //   let validated = false;
  //   let present = false;
  //   if (existingParts === undefined) {
  //     existingParts = [];
  //   }
  //   for (i = 0; i < parts.length; i++) {
  //     for (j = 0; j < existingParts.length; j++) {
  //       if (parts[i].partName === existingParts[j].partName) {
  //         present = true;
  //         validated = false;
  //       }
  //     }
  //     if (!present) {
  //       existingParts.push(parts[i])
  //       validated = true;
  //     }
  //     present = false;

  //   }

  //   present = false;
  //   if (existingServices === undefined) {
  //     existingServices = [];
  //   }
  //   for (i = 0; i < services.length; i++) {
  //     for (j = 0; j < existingServices.length; j++) {
  //       if (services[i].serviceNumber === existingServices[j].serviceNumber) {
  //         present = true;
  //         validated = false;
  //       }
  //     }
  //     if (!present) {
  //       existingServices.push(services[i])
  //       validated = true;
  //     }
  //     present = false;


  //   }


  //   return validated;

  // }


