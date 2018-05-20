import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any[];
  selectedCar: any;
  loading : boolean = true;
  displayDialog: boolean;

  sortOptions: any[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  constructor(private router: Router, private product: ProductsService) {
  }

  ngOnInit() {
    this.sortOptions = [
      {label: 'Newest First', value: '!year'},
      {label: 'Oldest First', value: 'year'},
      {label: 'Brand', value: 'brand'}
  ];

    this.getAllProducts();

  }

  getAllProducts() {
    this.loading = true;
    this.product.getProducts().subscribe(res => {
      console.log(res);
      this.loading = false;

      this.products = res;

    })
  }

  goTo()
  {
    alert("HI ")
  }

  selectProduct(event) {
    console.log("car is",event);
    
    this.selectedCar = event;
    this.displayDialog = true;
    event.preventDefault();
}

onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

onDialogHide() {
    this.selectedCar = null;
}
}

