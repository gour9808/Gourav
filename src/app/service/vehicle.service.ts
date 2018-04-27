import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Constants } from './constants';

@Injectable()
export class VehicleService {

  constructor( private http: Http) { }


  createVehicle(body) {
  
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(Constants.GET_POST_URL(), body, { headers: headers })
        
    
  }


  getVehicleList() {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get(Constants.GET_VEHICLE_LIST(), { headers: headers })
     
   
  }

  getVehicleInfo(vehicleId){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get(Constants.GET_VEHICLE_INFO(vehicleId), { headers: headers })
       
  }



}
