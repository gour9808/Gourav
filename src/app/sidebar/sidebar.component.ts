import { Component, OnInit, Input, Output } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() menu: Array<Object>;
  version = environment.version;

  constructor() { }

  ngOnInit() {
    console.log("Init Sidebar");
    console.log(this.menu);

  }


}
