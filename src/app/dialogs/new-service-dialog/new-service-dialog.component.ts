import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Communicator } from '../../service/communicator.service';
import * as cbv from '../../models/VehicleDetail';
import * as _ from 'lodash';

@Component({
  selector: 'app-new-service-dialog',
  templateUrl: './new-service-dialog.component.html',
  styleUrls: ['./new-service-dialog.component.scss']
})
export class NewServiceDialogComponent implements OnInit {
  filteredParts: any;
  @Input() service: cbv.Vehicle.ServiceDetail = new cbv.Vehicle.ServiceDetail();
  @Input() parts: cbv.Vehicle.Part[] = [];
  @Output() serviceChange: any = new EventEmitter<any>();
  serviceItem: cbv.Vehicle.ServiceDetail = new cbv.Vehicle.ServiceDetail();
  serviceType: any = [{ label: "Free", value: "FREE" }, { label: "Paid", value: "PAID" }];
  constructor(private commmunicator: Communicator) { }

  ngOnInit() {
    if (this.service != null || this.service != undefined)
      this.serviceItem = this.service;

    console.log(this.serviceItem);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onAdd() {
    console.log("service Item", this.serviceItem)
    this.serviceChange.emit(this.serviceItem);
    this.serviceItem = new cbv.Vehicle.ServiceDetail();
    this.service = null;
  }

  getParts(event) {
    console.log("getParts", event);
    this.filteredParts = _.filter(this.parts, function (part) {
      return part.partName.indexOf(event) !== -1;
    });
  }

  addPart(event){
    console.log('Add Part',event);
    this.serviceItem.parts.push(event);
  }

  goForService() {
    return this.serviceItem.serviceNumber && this.serviceItem.serviceType && this.serviceItem.distanceTo  && this.serviceItem.distanceTo && this.serviceItem.price;
  }

}
