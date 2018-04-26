import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Communicator } from '../../service/communicator.service';
import * as cbv from '../../models/VehicleDetail';

@Component({
  selector: 'app-vehicle-service',
  templateUrl: './vehicle-service.component.html',
  styleUrls: ['./vehicle-service.component.scss']
})
export class VehicleServiceComponent implements OnInit {
  @Input() service;
  @Output() serviceChange: any = new EventEmitter<any>();
  serviceItem;
  serviceType: any = [{ label: "Free", value: "FREE" }, { label: "Paid", value: "PAID" }];
  constructor(private commmunicator: Communicator) { }

  ngOnInit() {
    if (this.service != null || this.service != undefined)
      this.serviceItem = this.service;
  }

  onAdd() {
    console.log(this.service);
    this.serviceChange.emit(this.serviceItem);
    this.serviceItem = null;
  }

  goForService() {
    return this.serviceItem.serviceNumber && this.service.serviceType && this.service.distance && this.service.price;
  }

}
