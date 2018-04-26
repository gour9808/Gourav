import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as cbv from '../../models/VehicleDetail';

@Component({
  selector: 'app-new-part-dialog',
  templateUrl: './new-part-dialog.component.html',
  styleUrls: ['./new-part-dialog.component.scss']
})
export class NewPartDialogComponent implements OnInit {
  @Input() parts: any;
  @Output() partsChange: any = new EventEmitter<any>();
  partItem: cbv.Vehicle.Part = new cbv.Vehicle.Part();
  constructor() {
    if (this.parts != null || this.parts != undefined)
      this.partItem = this.parts;

    console.log(this.partItem);
  }

  ngOnInit() {
  }

  onAdd() {
    console.log("Part is ", this.partItem);
    this.partsChange.next(this.partItem);
    this.partItem = new cbv.Vehicle.Part();
    this.parts = null;
  }

}
