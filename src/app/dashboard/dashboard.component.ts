import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ProductsService } from '../services/products.service';
import { FeatureService } from '../services/feature.service';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any;
  selectedCar: any;
  loading: boolean = true;
  displayDialog: boolean;
  brand: any[];
  features: any[];
  selectedBrands: any[];
  loadingRequest = true;
  selectedFeatures: any[];
  sortOptions: any[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  constructor(private router: Router, private product: ProductsService, private feature: FeatureService, private brands: BrandService) {
  }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'year' },
      { label: 'Brand', value: 'brand' }
    ];

    this.getBrands();
    this.getFeature();
    this.getAllProducts();

  }

  getAllProducts() {
    this.loadingRequest = true;
    this.product.getProducts().subscribe(res => {
      console.log(res);
      this.products = res;
      this.loadingRequest = false;

    })
  }

  selectedBrand(brand, event) {
    console.log("event is", event);
    if (event) {
      this.loadingRequest = true;
      this.brands.getBrandById(brand.id).subscribe(res => {
        console.log("get data after check", res);
        this.products = res;
        this.loadingRequest = false;
      })
    }
    else{
      this.getAllProducts();
    }
    console.log("brand is", brand);

  }

  selectedFeature(feature, event) {
    console.log("event is", event);
    console.log("feature is", feature);
  }


  selectProduct(event) {
    console.log("car is", event);

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

  getBrands() {
    this.brands.getBrands().subscribe(res => {
      console.log("brands are", res);
      this.brand = res;

    })
  }

  getFeature() {
    this.feature.getFeatures().subscribe(res => {
      console.log("features are", res);
      this.feature = res;

    })
  }

}

