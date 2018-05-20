import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CatagoriesService } from '../services/catagories.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    '(document:click)': 'closePopout($event)',
  }
})
export class ToolbarComponent implements OnInit {

  @Input() title: String;
  catagoryList : any[];
  @Output() toggleSidenav = new EventEmitter<any>();
  showPopout: boolean = false;
  showFleet: boolean = false;
  showProfile: boolean = false;

  constructor(private router: Router, private catagories: CatagoriesService) { }

  ngOnInit() {
    this.getCatagories();
    console.log("Init Toolbar");
  }



  getCatagories() {
    this.catagories.getCatagories().subscribe(res => {
      console.log(res);
      this.catagoryList = res;

    })
  }

}
