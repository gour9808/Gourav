import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../service/constants';
import * as cbv from '../../models/VehicleDetail';
import * as consts from '../../models/DropValues';
import { VehicleService } from '../../service/vehicle.service';
import { ToasterService } from 'angular2-toaster';
import * as _ from 'lodash';
import { plainToClass } from "class-transformer";
import { Utils } from '../../utils/utils';
import { Communicator } from '../../service/communicator.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-vehicle-paste',
  templateUrl: './vehicle-paste.component.html',
  styleUrls: ['./vehicle-paste.component.scss']
})
export class VehiclePasteComponent implements OnInit {
partEdit: any;
  serviceEdit: any;
  displaySearchDialog: boolean;
  original: any;
  @Input() editData: any;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  showDialog: boolean = false;
  @Output() showToast = new EventEmitter<any>();
  vehicle: cbv.Vehicle.VehicleDetail = new cbv.Vehicle.VehicleDetail();
  engineType = consts.engineType;
  bodyType = consts.bodyType;
  chargerType = consts.chargerType;
  driveTrain = consts.driveTrain;
  instrumentType = consts.instrumentType;
  serviceType = consts.serviceType;
  transmissionType = consts.transmissionType;
  countries = consts.countries;
  gotVehicle: boolean;
  constructor(private service: VehicleService, private toasterService: ToasterService, private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.showDialog = true;
    this.route.params
      .switchMap((params: Params) => this.service.getVehicleInfo(params['id']))
      .subscribe((hero: any) => {
        console.log(hero);
        this.vehicle = _.merge(new cbv.Vehicle.VehicleDetail(), hero)
        console.log(this.vehicle);
        this.showDialog = false;
        this.gotVehicle = true;
      }, err => {
        this.showDialog = false;
        this.toasterService.pop('error', "Update Vehicle", "Choose Vehicle from vehicle list")
      });
  }

  cancelEdit() {
    console.log("Cancel edit");
    this.router.navigate(['/home/vehicle/list']);
  }

  createVehicle() {
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


  changed(event) {
    this.vehicle.serviceDetailList = [...this.vehicle.serviceDetailList, event];
    console.log(this.vehicle.serviceDetailList);
  }

  setParts(event) {
    console.log(event);
    if (event instanceof Array)
      this.vehicle.parts = [...this.vehicle.parts, ...event];
    else {
      this.vehicle.parts.push(event);
      this.vehicle.parts = [...this.vehicle.parts];
    }
  }

  editPart(event) {
    console.log('Edit part', event.data);
    this.partEdit = event.data;
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

  editService(event) {
    console.log('Edit service', event.data);
    this.serviceEdit = event.data;
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
