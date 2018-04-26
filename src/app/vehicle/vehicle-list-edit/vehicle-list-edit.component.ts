import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-list-edit',
  templateUrl: './vehicle-list-edit.component.html',
  styleUrls: ['./vehicle-list-edit.component.scss']
})
export class VehicleListEditComponent implements OnInit {
  @Input() isEdit:boolean;
  editVehicle:any;
  constructor() { }

  ngOnInit() {
  }

  searched(event){
    console.log("Searched",event);
  }

  showEdit(event){
    console.log("Enter Edit mode",event.data);
    this.editVehicle = event.data;
    this.isEdit = true;
  }

}
