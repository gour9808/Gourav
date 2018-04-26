import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    '(document:click)': 'closePopout($event)',
  }
})
export class ToolbarComponent implements OnInit {
  
  @Input() title: String;
  @Output() toggleSidenav = new EventEmitter<any>();
  @ViewChild('popOutButton') elementView: ElementRef;
  showPopout: boolean = false;
  userInfo: any = {};
  showFleet:boolean = false;
  showProfile:boolean = false;

  constructor(private router: Router , private userservice : UserService) { }

  ngOnInit() {
    console.log("Init Toolbar");
    this.getUserInfo();
  }

  checkIfOrgExists() {
    return (localStorage.getItem("orgId") != null && localStorage.getItem("orgId") != undefined);
  }

  getUserInfo() {
    this.userservice.getUserInfo().subscribe(info => {
      this.userInfo = info;
      console.log("User info is", this.userInfo);
    });
  }  

  toggle() {
    this.toggleSidenav.emit();
  }

  togglePopout() {
    this.showPopout = !this.showPopout;
  }
  
  /**
   * This is used to hide the popout when clicking anywhere else on the screen.
   * @param event The click event
   */
  closePopout(event) {
    if (!this.elementView.nativeElement.contains(event.target)) //check if the clicked target is out icon
    this.showPopout = false;
  }

  logout() {
    this.router.navigate(['/auth'], { replaceUrl: true });
  }
}
