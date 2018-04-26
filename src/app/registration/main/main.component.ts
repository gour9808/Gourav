import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
/**
 * This is the main for Registration, if a user is coming for the first time.
 * This page consists of three parts:
 *  1. Profile Setup:
 *  2. Working Hours Entry
 *  3. Sales & Service Information
 */
export class MainComponent implements OnInit {
  tabItems:any;
  menuItems = [{
    name: "REGISTRATION",
    icon: "mdi-account-plus",
    path: "/registration",
    active: true
  }]
  constructor() {
    this.tabItems = [
            {name: 'CREATE_PROFILE',path:'/registration/profile'},
            {name: 'SETUP_WORKING_HOURS',path:'/registration/hours'},
            {name: 'Setup Images',path:'/registration/images'},
            {name: 'SETUP_SALES_AND_SERVICE',path:'/registration/sales'}]
   }

  ngOnInit() {
  }

}
