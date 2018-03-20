import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Cache } from '../service/storage.provider';
import * as _ from 'lodash';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit {
  @Cache({ pool: 'User' }) userInfo: any;
  family: any[];
  familycount: any;
  noOfFamily: any[] = [];
  lastVisit: any;
  loadingRequest = true;


  constructor(private user: UserService) { }

  ngOnInit() {
    console.log("patient info", this.userInfo);

    this.getFamily();
    this.getVisits();
  }

  getFamily() {
    this.loadingRequest = true;

    this.user.getFamily(this.userInfo.phone).subscribe(res => {
      console.log("family are", res);
      this.loadingRequest = false;
      _.map(res.patients, (patient) => { this.allAccordian(patient) });

    })
  }

  getVisits() {
    this.user.getVisits(this.userInfo.id).subscribe(res => {
      this.lastVisit = res.visits[0].createTime;

    })
  }

  allAccordian(patient) {
    this.noOfFamily.push({
      age: patient['age'], firstName: patient['firstName'], lastName: patient['lastName'], phone: patient['phone']
      , dial_code: patient['dial_code'], profilePictureUrl: patient['profilePictureUrl'], email: patient['email']
    });


  }



}
