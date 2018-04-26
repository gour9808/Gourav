import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  showSidenav: boolean = true;
  menuItems = [ {
    name: "Vehicle Management",
    icon: "directions_car",
    path: "/home/vehicle",
    active: true
    }, {
    name: "Dealer Management",
    icon: "people",
    path: "/home/dealer",
    active: true
  }];
  

  tabItems = [{
    name: 'Add New Vehicle',
    path: "/home/vehicle/new"
  },{
    name: 'Vehicles List',
    path: "/home/vehicle/list"
  },{
    name: 'Vehicles Search',
    path: "/home/vehicle/search"
  },
  {
    name: 'Clone Template',
    path: "/home/vehicle/clone"
  }
]
  userInfo: any;
  
  constructor( private router : Router,private currentRoute: ActivatedRoute) { }

  ngOnInit() {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }  
    this.checkQuery();
    console.log("Init Container");
  }

  checkQuery(){
   if (_.startsWith(this.router.url, '/home/vehicle')) {
       this.tabItems = [{
          name: 'Add New Vehicle',
          path: "/home/vehicle/new"
        },{
          name: 'Vehicles List',
          path: "/home/vehicle/list"
        },{
          name: 'Vehicles Search',
          path: "/home/vehicle/search"
        }] 
    }
    else{
      this.tabItems = [{
          name: 'Add New Dealer',
          path: "/home/dealer/profile"
        },
         {
          name: 'Dealer List',
          path: "/home/dealer/list"
        }
        // {
        //   name: 'Dealer Search',
        //   path: "/home/dealer/search"
        // }
        ]       
    }
  }

  toggle() {
    this.showSidenav = !this.showSidenav;
  }

}
