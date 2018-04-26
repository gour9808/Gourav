import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../service/dealer.service';
import * as consts from '../../models/DropValues';
import { Router } from '@angular/router';
import { Communicator } from '../../service/communicator.service';
import { Utils } from '../../utils/utils';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.scss']
})
export class DealerListComponent implements OnInit {

  countries = consts.countries;
  brands = consts.brands;
  reset: any;
  email: any;
  name: any;
  errorMessage: string = "";

  search = {
    make: "", countrycode: " "
  }

  dList = [];
  showDialog: boolean;

  constructor(private dealerService: DealerService, private router: Router, private communicator: Communicator, private toasterService: ToasterService) { }

  ngOnInit() {
    this.search.countrycode = "in";
  }

  selectType(make) {
    this.search.make = make;
  }

  valEmail() {
    if (this.email) {
      return Utils.validateEmail(this.email);
    }
    else {
      return true;
    }
  }

  nameChange(e) {
    this.errorMessage = "";
    this.name = e;
  }

  dealerListbasedonMake() {
    this.showDialog = (true);
    this.dList = [];
    this.dealerService.dealerList(this.search.make, this.search.countrycode).subscribe(res => {
      this.showDialog = (false);
      console.log('list', res);
      this.dList = res;
    }, err => {
      this.showDialog = (false);
      this.toasterService.pop('error', 'Error', 'Dealer Not Found');
    })
  }

  dealerListbasedonEmail() {
    this.showDialog = (true);
    this.dList = [];
    var dealer = [];
    this.dealerService.dealerByEmail(this.email).subscribe(res => {
      this.showDialog = false;
      dealer.push(res);
      this.dList = dealer;
      console.log('dlist', this.dList);
    }, err => {
      this.showDialog = (false);
      // this.errorMessage = 'Dealer Not Found';
      this.toasterService.pop('error', 'Error', 'Dealer Not Found');
    })
  }

  dealerListbasedonName() {
    this.errorMessage = "";
    this.showDialog = (true);
    this.dList = [];
    var dealer = [];
    this.dealerService.searchDealer(this.name).subscribe(res => {
      this.showDialog = false;
      dealer.push(res);
      this.dList = dealer;
    }, err => {
      this.showDialog = (false);
      this.errorMessage = 'Dealer Not Found'
      this.toasterService.pop('error', 'Error', 'Dealer Not Found');
    })

  }

  resetSearch() {
    this.search = {
      make: " ", countrycode: null
    }
    window.location.reload();
  }

  dealerEdit(data) {
    if (localStorage.getItem('vendor')) {
      localStorage.removeItem('vendor');
      localStorage.removeItem('vendorId');
    }
    localStorage.setItem('vendorId', data.id);
    this.router.navigate(['/home/dealer/profile']);
  }

  cloneDealer(data) {
    
    if (localStorage.getItem('vendor')) {
      localStorage.removeItem('vendor');
      localStorage.removeItem('vendorId');
    }
    localStorage.setItem('vendorId', data.id);
    console.log("data is ", data);
    this.router.navigate(['/home/dealer/clone'])
  }


  goForSearch() {
    return this.search.make && this.search.countrycode;
  }

  goForEmailSearch() {
    return this.email;
  }

  goForNameSearch() {
    return this.name;
  }

}
