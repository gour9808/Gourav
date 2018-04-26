import { Component, OnInit } from '@angular/core';
import * as cbv from '../../models/VehicleDetail';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { VehicleService } from '../../service/vehicle.service';
import { Communicator } from '../../service/communicator.service';
import { ToasterService } from 'angular2-toaster';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-vehicle-clone-template',
  templateUrl: './vehicle-clone-template.component.html',
  styleUrls: ['./vehicle-clone-template.component.scss']
})
export class VehicleCloneTemplateComponent implements OnInit {

  serviceItem: any = {};

  serviceList: cbv.Vehicle.ServiceDetail[] = [];
  partsList: cbv.Vehicle.Part[] = [];
  search: any = {};
  vehicle: cbv.Vehicle.VehicleDetail = new cbv.Vehicle.VehicleDetail();


  showDialog: boolean = false;
  displayPartCloneDialog;
  displayVehicleCloneDialog;

  constructor(private router: Router, private service: VehicleService,
    private commmunicator: Communicator, private toast: ToasterService) { }

  ngOnInit() {
  }

  goToVehicleClone() {
    this.router.navigate(['/home/vehicle/vehicle-clone'])
  }

  cloneParts(vehicle) {
    console.log("Parts list is", this.partsList);

    //console.log(vehicle);
    if (this.validateVehicle(vehicle, this.partsList, this.serviceList)) {
      this.service.updatevehicleDetails(vehicle, vehicle.id).subscribe(res => {

        console.log(res)

      }, error => {
        console.log(error);

      });;
    }
    else {
      console.log("no no no")
    }
  }

  validateVehicle(vehicle, parts, services) {
    let i, j;
    let validated = false;
    let present = false;
    for (i = 0; i < parts.length; i++) {
      for (j = 0; j < vehicle.parts.length; j++) {
        if (parts[i].partName === vehicle.parts[j].partName) {
          present = true;
        }
      }
      if (!present) {
        vehicle.parts.push(parts[i])
        validated = true;
      }
      present = false;

    }
    return validated;

  }

  save() {
    this.router.navigate(['/home/vehicle/part-clone'])
  }


}
