import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {
  
  constructor() { }

  get isEmpty():boolean{
    return localStorage.getItem("clone") === null || localStorage.getItem("clone") === undefined;
  }

  get getClone():any{
    return JSON.parse(localStorage.getItem("clone"));
  }

  clearClone(){
    localStorage.removeItem("clone");
  }

  setClone(data){
    localStorage.setItem("clone",JSON.stringify(data));
  }
}
