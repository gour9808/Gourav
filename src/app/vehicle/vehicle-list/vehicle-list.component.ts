import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Constants } from '../../service/constants';
import { VehicleService } from '../../service/vehicle.service';
import * as cbv from '../../models/VehicleDetail';
import * as _ from 'lodash';
import { ToasterService } from 'angular2-toaster';
import { vehicles } from '../../app.globals';
import { Communicator } from '../../service/communicator.service';
import * as consts from '../../models/DropValues';
import { countries } from '../../models/DropValues';
import { Router } from '@angular/router';
import { DataStorageService } from '../../service/data-storage.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  @Input() vehicles: cbv.Vehicle.VehicleDetail;
  @Input() loadingVehicles;
  @Input() isFleet;
  @Input() showAdd;
  @Output() onVehicleSelected = new EventEmitter<any>();
  @Output() onVehicleDeleted = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() showToast = new EventEmitter<any>();
  @ViewChild('vehicleListTable') tableDiv: ElementRef;
  scrollH: any;
  countries = consts.countries; 

  constructor(private service: VehicleService, private toasterservice: ToasterService, 
  private communicator: Communicator,private router:Router, private storage:DataStorageService) {
    this.communicator.vehicleList$.subscribe(list => {
      console.log("Comms active", list);
      if (list != undefined)
        this.vehicles = list;
      else
        this.getVehicleList();
    });
  }

  ngOnInit() {
    console.log(this.vehicles);
    if (this.vehicles == undefined)
      this.getVehicleList();
  }

  ngAfterViewInit() {
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
    });
  }

  showSearch() {
    console.log(this.vehicles);
    this.onSearch.emit(true);
  }

  vehicleDuplicate(event){
    console.log(event);
    this.storage.setClone(event);
    this.router.navigate(['/home/vehicle/new']);
  }

  vehicleSelected(event) {
    console.log(event.data);
    this.router.navigate(['/home/vehicle/update',event.data.id]);
  }

  getCountry(locale) {
    let country = _.find(countries, function (item) {
      return item.value == locale;
    });
    if(country)
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
}
