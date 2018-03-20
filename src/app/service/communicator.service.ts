import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class Communicator {
    //private caseNumber: any;

    // Observable string sources
  private vehicleList = new Subject<any>();  
  private serviceList = new Subject<any>();
  private dList = new Subject<any>();
  

  // Observable string streams
  vehicleList$ = this.vehicleList.asObservable();
  serviceList$ = this.serviceList.asObservable();
  dList$ = this.dList.asObservable();
    // Service message commands
  publishData(data: any) {
    this.vehicleList.next(data);
  }

  resetData(){
    this.vehicleList.next();
  }

  resetDealer(){
    this.dList.next();
  }

  addService(data:any){
    this.serviceList.next(data);
  }

  removeService(data:any){
    this.serviceList.next(data);
  }

}