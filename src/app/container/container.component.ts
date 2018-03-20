import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { Cache } from '../service/storage.provider';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  showSidenav: boolean = true;
  @Cache({ pool: 'User' }) userInfo: any;

  show: string;
  menuItems = [{
    name: "Dashboard",
    icon: "fa-dashboard",
    path: "/home/customer",
    active: true
  },

  {
    name: "Trends",
    icon: "fa-line-chart",
    path: "/home/test",
    active: true
  },
  {
    name: "Family",
    icon: "fa-users",
    path: "/home/family",
    active: true,

  },
  ];

  constructor(private router: Router, private currentRoute: ActivatedRoute) {
    this.show = "Welcome" + " " + this.userInfo.firstName
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    console.log("Init Container");
  }

  toggle() {
    this.showSidenav = !this.showSidenav;
  }

}
