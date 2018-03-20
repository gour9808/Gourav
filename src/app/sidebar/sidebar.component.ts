import { Component, OnInit, Input, Output } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Cache } from '../service/storage.provider';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Cache({ pool: 'User' }) userInfo: any;
  @Input() menu: Array<Object>;
  version = environment.version;

  constructor() { }

  ngOnInit() {
    console.log("Init Sidebar");
    console.log("side bar user info", this.userInfo);
    console.log(this.menu);

  }


}
