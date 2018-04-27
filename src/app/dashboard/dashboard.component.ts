import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  family: any[];
  visitCount: any[];
  lastVisit: any;
  accordians: any[] = [];
  noOfTests: any[] = [];
  loadingRequest = true;
  weightValue: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    
  }
}
