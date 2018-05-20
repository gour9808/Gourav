import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Constants } from './constants';


@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
   return this.http.get(Constants.GET_PRODUCTS)
  }

}
