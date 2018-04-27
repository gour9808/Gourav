import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { Constants } from '../service/constants';
import { vehicles } from '../app.globals';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleComponent implements OnInit {
  
  constructor() {

  }
  ngOnInit() {
    console.log("Init Vehicle Component");
  }


}
