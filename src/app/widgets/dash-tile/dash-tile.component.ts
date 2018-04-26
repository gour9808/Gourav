import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dash-tile',
  templateUrl: './dash-tile.component.html',
  styleUrls: ['./dash-tile.component.scss']
})
export class DashTileComponent implements OnInit {
  
  @Input() icon: any;
  @Input() counter: string;
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
