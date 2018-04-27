import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss']
})
/**
 * For data manager, check if user is assiged to a data-manager group. If not assigned, then the user cannot access this page.
 * Show error.
 * 
 * Use this class for loading necessary data before showing the user interface for the user.
 * Do not get. Use fetch instead. This ensures fresh data after every login.
 * Although there could be some better way to do this, I'm in a hurry to push this to test env, so ¯\_(ツ)_/¯
 */
export class DataLoaderComponent implements OnInit {

  constructor(private router: Router)  { }

  ngOnInit() {
    console.log("Init Data Loader");

  }

  

}
