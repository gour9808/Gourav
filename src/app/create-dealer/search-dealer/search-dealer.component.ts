import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../service/dealer.service';
import * as consts from '../../models/DropValues';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-dealer',
  templateUrl: './search-dealer.component.html',
  styleUrls: ['./search-dealer.component.scss']
})
export class SearchDealerComponent implements OnInit {

  countries = consts.countries;
  load : boolean = false;

   search = {
    name : "", country: ""
  }

  dealerList : any[] = []
  
  constructor(private dealer : DealerService, private router : Router ) { }

  ngOnInit() {
  }

  resetSearch() {
    this.search = {
      name: "", country: null
    }
  }
  
  searchDealer() {
    this.load = true;
    this.dealer.searchDealerfromES(this.search.name,this.search.country).subscribe(res => {
      console.log("Dealer Search", res);
      this.dealerList = res;
      this.load = false;
    })
  }

  

  dealerEdit(data){
    if(localStorage.getItem('vendor')){
      localStorage.removeItem('vendor');
      localStorage.removeItem('vendorId');
    }
    localStorage.setItem('vendorId',data.id);
    this.router.navigate(['/home/dealer/profile']);
  }

   goForSearch() {
    return this.search.name || this.search.country;
  }

}
