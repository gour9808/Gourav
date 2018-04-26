import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { Constants } from '../../service/constants';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import * as _ from 'lodash';
import { UserService } from '../../service/user.service';
import * as cbv from '../../models/VehicleDetail';
import * as consts from '../../models/DropValues';
import { VehicleService } from '../../service/vehicle.service';
import { vehicles } from '../../app.globals';
import { ToasterService } from 'angular2-toaster';
import { VehicleServiceComponent } from '../../widgets/vehicle-service/vehicle-service.component';
import { VehicleServiceDirective } from '../../directives/vehicle-service.directive';
import { Communicator } from '../../service/communicator.service';
import { Utils } from "../../utils/utils";
import { DataStorageService } from '../../service/data-storage.service';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleCreateComponent implements OnInit {
  displaySearchDialog: boolean;
  @Output() hide = new EventEmitter<any>();
  partsList: cbv.Vehicle.Part[] = [];

  showDialog: boolean = false;
  @Output() refresh: any = new EventEmitter<any>();
  serviceList: cbv.Vehicle.ServiceDetail[] = [];
  maxDateValue: Date;
  selectedDateValue: Date;

  val: any = "some www";
  @ViewChild('vehicleNameInput') vehicleNameInput: ElementRef;
  @ViewChild('vin') vinInput: ElementRef;
  @ViewChild(VehicleServiceDirective) adHost: VehicleServiceDirective;
  engineType = consts.engineType;
  bodyType = consts.bodyType;
  chargerType = consts.chargerType;
  driveTrain = consts.driveTrain;
  instrumentType = consts.instrumentType;
  serviceType = consts.serviceType;
  transmissionType = consts.transmissionType;
  countries = consts.countries;
  test: any[] = new Array<any>();
  serviceCount: number = 0;
  displayPartDialog;
  editPart: cbv.Vehicle.Part = new cbv.Vehicle.Part();
  vehicle: cbv.Vehicle.VehicleDetail = new cbv.Vehicle.VehicleDetail();
  constructor(private service: VehicleService, private toasterService: ToasterService, private _componentFactoryResolver: ComponentFactoryResolver,
    private storage: DataStorageService) {
  }

  ngOnInit() {
    console.log("Init Vehicle Create");
    if (!this.storage.isEmpty) {
      console.log(this.storage.getClone);
      this.vehicle = _.merge(new cbv.Vehicle.VehicleDetail(), this.storage.getClone);
      this.storage.clearClone();
    }
  }

  log(event) {
    console.log("Selected " + event);
    this.vehicle.engineTransmission.engineType = event;
    this.vehicle.engineTransmission.emissionNorms = event;
    console.log(this.vehicle);
  }

  cancel() {
    this.vehicle = new cbv.Vehicle.VehicleDetail();
  }

  save() {
    this.showDialog = true;
    console.log(this.vehicle);
    this.vehicle.id = null;
    console.log(Utils.pruneEmpty(this.vehicle));
    this.service.createVehicle(Utils.pruneEmpty(this.vehicle)).subscribe(res => {
      console.log("response is", res);
      console.log(res);
      this.showDialog = false;
      this.toasterService.pop('success', 'Add New Vehicle', 'Vehicle Created Successfully');
      this.vehicle = new cbv.Vehicle.VehicleDetail();
    }, error => {
      console.log(error);
      this.showDialog = false;
      this.toasterService.pop('error', 'Add New Vehicle', 'Error creating vehicle' + error);
    });
  }

  setParts(event) {
    console.log(event instanceof Array);
    if (event instanceof Array) {
      this.vehicle.parts = [...this.vehicle.parts, ...event];
    }
    else {
      this.vehicle.parts.push(event);
      this.vehicle.parts = [...this.vehicle.parts];
    }
    console.log(this.vehicle.parts);
  }

  deletePart(event) {
    this.vehicle.parts = Utils.removeByIndex(this.vehicle.parts, event);
  }

  setService(event) {
    console.log(event);
    if (event instanceof Array)
      this.vehicle.serviceDetailList = [...this.vehicle.serviceDetailList, ...event];
    else {
      this.vehicle.serviceDetailList.push(event);
      this.vehicle.serviceDetailList = [...this.vehicle.serviceDetailList];
    }
  }

  deleteService(event) {
    console.log("Delete at", event);
    this.vehicle.serviceDetailList = Utils.removeByIndex(this.vehicle.serviceDetailList, event);
  }

  cloneFromVehicle(event) {
    console.log('Search clone', event);
    switch (event.clone) {
      case 'Service':
        event.vehicle[0].serviceDetailList ? this.setService(event.vehicle[0].serviceDetailList) : this.toasterService.pop('error', 'No Service Found', 'No service exist in ' + event.vehicle[0].make + ' ' + event.vehicle[0].model + ' ' + event.vehicle[0].variant);
        break;
      case 'Parts':
        event.vehicle[0].parts ? this.setParts(event.vehicle[0].parts) : this.toasterService.pop('error', 'No Parts Found', 'No parts exist in ' + event.vehicle[0].make + ' ' + event.vehicle[0].model + ' ' + event.vehicle[0].variant);
        break;
    }
    this.displaySearchDialog = false;
  }

  goForIgnition() {
    return (this.vehicle.make && this.vehicle.model && this.vehicle.variant && this.vehicle.countryCode);
  }
}
