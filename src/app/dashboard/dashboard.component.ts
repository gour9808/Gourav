import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cache } from '../service/storage.provider';
import { UserService } from '../service/user.service';
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
  @Cache({ pool: 'User' }) userInfo: any;

  constructor(private router: Router, private user: UserService) {
  }

  ngOnInit() {
    this.getVisits();
    this.getFamily();
  }

  onSelect(event) {
    console.log(event);
  }


  getVisits() {
    this.user.getVisits(this.userInfo.id).subscribe(res => {
      console.log("Visits are", res);
      this.visitCount = res.count;
      this.lastVisit = res.visits[0].createTime;
      this.noOfTests = [];
      this.accordians = [];
      _.map(res.visits, (visit) => { this.allAccordian(visit) });
      this.loadingRequest = false;
      console.log("name is", this.noOfTests);
      let weight = _.findLast(this.noOfTests, ['name', 'WEIGHT']);
      this.weightValue = _.findLast(weight['result'], ['name', 'Weight']);
    })
  }


  allAccordian(visit) {
    this.noOfTests = [];
    this.accordians.push({ createTime: visit['createTime'], tests: visit['tests'], centerName: visit['centerName'] });
    _.map(visit['tests'], (test, index) => this.getTest(test));
  }

  getFamily() {
    this.user.getFamily(this.userInfo.phone).subscribe(res => {
      this.family = res.count

    })
  }


  getTest(test) {

    if (test.name === "DENGUE") {
      this.noOfTests.push({
        name: test.name, image: '../../assets/DENGUE.png', result: [
          { name: "Result", value: test.rdtResult, unit: '' },
        ]
      });

    }

    else if (test.name === "MALARIA") {
      this.noOfTests.push({
        name: test.name, image: '../../assets/MALARIA.png', result: [
          { name: "Result", value: test.rdtResult, unit: '' },
        ]
      });

    }

    else if (test.name === "URINE") {
      this.noOfTests.push({
        name: test.name, image: '../../assets/URINE.png', result: [
          { name: " RDT Glucose", value: test.rdtResultGlucose, unit: '' },
          { name: "RDT Protein", value: test.rdtResultProtein, unit: '' },
        ]
      });

    }

    else if (test.name === "TEMPERATURE") {
      this.noOfTests.push({
        name: test.name, image: '../../assets/TEMPERATURE.png', result: [
          { name: "Temerature", value: test.result, unit: test.unit },
        ]
      });

    }

    else if (test.name === "HEMOGLOBIN") {
      this.noOfTests.push({
        name: test.name, image: '../../assets/HEMOGLOBIN.png', result: [
          { name: "Hemoglobin", value: test.result, unit: test.unit },
        ]
      });

    }


    else if (test.name === "WEIGHT") {
      this.noOfTests.push({
        name: test.name, image: '../../assets/WEIGHT.png', result: [
          { name: "Weight", value: test.result, unit: test.unit },
        ]
      });

    }
    else if (test.name === "BLOOD_GROUPING") {
      this.noOfTests.push({
        name: test.name, image: '../../assets/BLOOD_GROUPING.png', result: [
          { name: "Blood Groop", value: test.bloodGroupResult, unit: test.unit },
        ]
      });

    }

  }
}
