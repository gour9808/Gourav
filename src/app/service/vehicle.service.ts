import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Constants } from './constants';

@Injectable()
export class VehicleService {

  constructor(private auth: AuthService, private http: Http) { }


  loggedIn(): boolean {
    return this.auth.isAuthenticated();
  }
  createVehicle(body) {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      return this.http.post(Constants.GET_POST_URL(), body, { headers: headers })
        .map(res => res.json());
    } else {
      console.log("Error. Not logged in");
    }
  }


  getVehicleList() {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      return this.http.get(Constants.GET_VEHICLE_LIST(), { headers: headers })
        .map(res => res.json());
    } else {
      console.log("Error. Not logged in");
    }
  }

  getVehicleInfo(vehicleId){
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      return this.http.get(Constants.GET_VEHICLE_INFO(vehicleId), { headers: headers })
        .map(res => res.json());
    } else {
      console.log("Error. Not logged in");
    }
  }

  updatevehicleDetails(body,id) {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      return this.http.put(Constants.UPDATE_VEHICLE_DETAILS(id), body, { headers: headers })
        .map(res => res.json());
    } else {
      console.log("Error. Not logged in");
    }
  }

  getPartsForVehicle(make,model,variant?,countryCode?){
    if(this.auth.isAuthenticated()){
            let params: URLSearchParams = new URLSearchParams();
      make ? params.set('make', make) : null;
      model ? params.set('model', model) : null;
      variant ? params.set('variant', variant) : null;
      countryCode ? params.set('countryCode', countryCode) : null;

      let requestOptions = new RequestOptions();
      requestOptions.params = params;
      
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      requestOptions.headers = headers;
      return this.http.get(Constants.GET_PART_FOR_VEHICLE(),requestOptions)
        .map(res=>res.json());
    }else{
      console.log("Error. Not Logged in");
    }
  }

  searchVehicle(make?, model?, variant?, countryCode?) {
    if (this.auth.isAuthenticated()) {

      let params: URLSearchParams = new URLSearchParams();
      make ? params.set('make', make) : null;
      model ? params.set('model', model) : null;
      variant ? params.set('variant', variant) : null;
      countryCode ? params.set('countryCode', countryCode) : null;

      let requestOptions = new RequestOptions();
      requestOptions.params = params;
      
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      requestOptions.headers = headers;
      return this.http.get(Constants.SEARCH_VEHICLE(),requestOptions)
        .map(res => res.json());
    } else {
      console.log("Error. Not logged in");
    }
  }

  deleteVehicle(vehicleDetailsId) {
    if (this.auth.isAuthenticated()) {
      var headers = new Headers();
      headers.append('access_token', `${this.auth.getSession().token}`);
      headers.append('Content-Type', 'application/json');
      return this.http.delete(Constants.DELETE_VEHICLE(vehicleDetailsId), { headers: headers })
        .map(res => res.json());
    } else {
      console.log("Error. Not logged in");
    }
  }


}
