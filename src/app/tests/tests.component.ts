import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../service/user.service';
import { Cache } from '../service/storage.provider';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  @Cache({ pool: 'User' }) userInfo: any;
  visitCount: any[];
  lastVisit: any;
  accordians: any[] = [];
  noOfTests: any[] = [];
  tableData: any[] = [];
  chartDisplay: boolean = false;
  tableDisplay: boolean = false;
  display: boolean = false;
  chartData: any[] = [
    { name: '', series: [] }
  ];
  areaData: any[] = [];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Value';

  colorScheme = {
    domain: ['#C7B42C', '#AAAAAA', '#AF7AC5']
  };
  data: any;
  data1: any;
  selectedCar: any;
  loadingRequest = true;
  displayDialog: boolean;

  dateWiseTest: any[] = [];
  dengueData = [];


  constructor( private user: UserService) {
  }

  ngOnInit() {
    
    this.getVisits();
  }

  getVisits() {
    this.user.getVisits(this.userInfo.id).subscribe(res => {
      console.log("Visits are", res);
      this.visitCount = res.count;
      this.lastVisit = res.visits[0].createTime;
      _.map(res.visits, (visit) => { this.allCards(visit) });
      this.setDataChart();
     
    })
  }

  allCards(visit) {
    _.map(visit['tests'], (test, index) => this.dateWiseTest.push(
      { createTime: visit['createTime'], name: test['name'], result: this.checkForResult(test), duration: test['testDuration'] }
      
    ));
      this.loadingRequest = false;
  }

  setDataChart() {
    console.log("all tests data", this.dateWiseTest);
    this.chartData = _(this.dateWiseTest).groupBy('name')
      .map((objs, key) => ({
        'name': key,
        'series': this.dataForSeries(objs),
      }))
      .value();
    _.map(this.chartData, (data, index) => this.areaData.push([{ name: data.name, series: data.series }]));
    console.log("areaData", this.noOfTests, this.areaData, this.tableData);
  }

  dataForSeries(objs) {
    this.noOfTests = [];
    this.tableData = [];
    _.map(objs, (item) => this.checkForChart(item));
    return this.tableData;
  }

  checkForChart(item) {
    if ((item.name == "HEMOGLOBIN") || (item.name == "TEMPERATURE")  || (item.name == "WEIGHT")) {
      this.tableData.push({
        name: moment(item.createTime).format('DD/MM/YYYY'),
        value: item.result[0].value
      });
    }
    else {
      this.tableData.push({
        name: moment(item.createTime).format('DD/MM/YYYY : HH:MM: SS'),
        value: item.result == null ? 0 : item.result
      });
    }
    return this.tableData;
  }

  checkForResult(test) {
    let array = [];
    if (test['name'] == "DENGUE") {
      array = [{ name: 'Result', value: test['rdtResult'] }];
      return array;
    } else if (test['name'] == "URINE") {
      array = [{ name: 'Glucose', value: test['rdtResultGlucose'] }, { name: "Protein", value: test['rdtResultProtein'] }];
      return array;
    } else if (test['name'] == "HEMOGLOBIN") {
      array = [{ name: 'result', value: test['result'] }];
      return array;
    } else if (test['name'] == "TEMPERATURE") {
      array = [{ name: 'result', value: test['result'] }];
      return array;
    }
    else if (test['name'] == "WEIGHT") {
      array = [{ name: 'result', value: test['result'] }];
      return array;
    }
    else if (test['name'] == "BLOOD_GROUPING") {
      array = [{ name: 'result', value: test['bloodGroupResult'] }];
      return array;
    }
    else {
      return array = [{ name: 'Result', value: test['rdtResult'] }];
    }
  }

  selectData(e) {
    console.log(e);
  }

}
