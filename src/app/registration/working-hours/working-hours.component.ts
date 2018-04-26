import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as cbv from '../../models/vendor';
import { DealerService } from '../../service/dealer.service';
import * as _ from 'lodash';
import { ToastyService } from 'ng2-toasty';
import * as consts from '../../models/vendor';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
  encapsulation: ViewEncapsulation.None
})

/**
 * This is the second part of main of the registration process for a dealer.
 * The user needs to input the starting and closing time for all the week days.
 * If a day is a holiday or not is also specified here through hours.
 */

export class WorkingHoursComponent implements OnInit {
  hours: any[] = [];
  load: boolean;
  vendor: cbv.Vendor.VendorDetail = new cbv.Vendor.VendorDetail();
  start = new Date();
  end = new Date();  
  checkArray: boolean[] = [];


  constructor(private currentRoute: Router, private dealerService: DealerService) {
    this.start.setHours(8, 0, 0);
    this.end.setHours(18, 0, 0);
    this.hours = [
      { dayOfWeek: 'MONDAY', openingTime: { startTime: this.start, endTime: this.end } },
      { dayOfWeek: 'TUESDAY', openingTime: { startTime: this.start, endTime: this.end } },
      { dayOfWeek: 'WEDNESDAY', openingTime: { startTime: this.start, endTime: this.end } },
      { dayOfWeek: 'THURSDAY', openingTime: { startTime: this.start, endTime: this.end } },
      { dayOfWeek: 'FRIDAY', openingTime: { startTime: this.start, endTime: this.end } },
      { dayOfWeek: 'SATURDAY', openingTime: { startTime: this.start, endTime: this.end } },
      { dayOfWeek: 'SUNDAY', openingTime: { startTime: this.start, endTime: this.end } }
    ];
  }

  ngOnInit() {
   if((localStorage.getItem('vendorId')))
      this.fetchDealer();
  }

  getDealerProfile() {
    this.load = true;
    this.dealerService.getDealerDetails(localStorage.getItem('vendorId')).subscribe(res => {
      if(res.openTimes){
        this.convertToISO(res.openTimes);
      }          
      this.vendor = _.merge(new cbv.Vendor.VendorDetail(), res);
      console.log(this.vendor);
      // Boolean Array for checkbox
      this.checkArray = new Array(this.vendor.openTimes.length).fill(false);      
      this.hours = _.cloneDeep(this.vendor.openTimes);
      //  console.log('hour',this.hours)
      this.convertFromISO();
      this.load = false;
    });
  }

 fetchDealer() {
    this.dealerService.fetchDealer(localStorage.getItem('vendorId')).subscribe(res => {
      if(res.openTimes)
       this.convertToISO(res.openTimes);
      this.vendor = _.merge(new cbv.Vendor.VendorDetail(), res);     
    })
  }
  convertToISO(openTimes) {
    openTimes.forEach(function(time) {     
      time.openingTime.startTime = time.openingTime.startTime + 'Z';
      time.openingTime.endTime = time.openingTime.endTime + 'Z';
    }.bind(this));
  }

  convertFromISO() {
    this.hours.forEach(function (time, index) {
      time.openingTime.startTime = new Date(time.openingTime.startTime);   //Converting to IST format of openTimes
      time.openingTime.endTime = new Date(time.openingTime.endTime);
      this.statusCheck(time.openingTime.startTime,index)
    }.bind(this));    
  }

  statusCheck(start_time,index){
      if(start_time.getHours() == 0){
        this.checkArray[index] = true;
      }      
  }

  toggle(index, event) {
    console.log(event, index);
    if (event) {
      this.hours[index].openingTime.startTime = new Date(0, 0, 0, 0, 0, 0, 0);
      this.hours[index].openingTime.endTime = new Date(0, 0, 0, 0, 0, 0, 0);
    } else {
      (this.hours[index].openingTime.startTime = new Date()).setHours(8, 0, 0);
      (this.hours[index].openingTime.endTime = new Date()).setHours(18, 0, 0);
    }
    this.vendor.openTimes[index].openingTime.startTime = new Date(this.hours[index].openingTime.startTime).toISOString();
    this.vendor.openTimes[index].openingTime.endTime = new Date(this.hours[index].openingTime.endTime).toISOString();
  }

  setStartTime(i, event) {
    console.log(this.vendor.openTimes);    
    this.vendor.openTimes[i].openingTime.startTime = new Date(event).toISOString();
  }

  setEndTime(i, event) {
    console.log(this.vendor.openTimes);    
    this.vendor.openTimes[i].openingTime.endTime = new Date(event).toISOString();
  }

 updateDealerWorkingHour() {
    console.log(this.vendor.openTimes);
    this.vendor.openTimes = this.hours;
    this.dealerService.updateDealer(this.vendor.id, this.vendor).subscribe(res => {
      console.log('updated successfully', res);
      this.fetchDealer(); //fetch latest dealer info after updating images. 
    }, err => {
      console.log("updateProfile", err);
      // this.toastyService.error({
      //     title: "Error",
      //     msg: "Error updating working hours"+this.vendor.name,
      //     showClose: false,
      //     timeout: 3000,
      //     theme: 'default'
      //   });
    })
  }

}