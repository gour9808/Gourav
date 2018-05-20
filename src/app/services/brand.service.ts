import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './constants';
import { ReturnStatement } from '@angular/compiler';
@Injectable()
export class BrandService {

  constructor(private http: HttpClient) {
  }

  getBrands(): Observable<any> {
    return this.http.get(Constants.GET_BRANDS)
  }

  getBrandById(id) {
    return this.http.get(Constants.GET_PRODUCTS_BY_ID(id))
  }
}
