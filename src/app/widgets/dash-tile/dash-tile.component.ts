import { Component, OnInit, Input, AfterViewInit, ViewChild, AfterContentChecked, trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'app-dash-tile',
  templateUrl: './dash-tile.component.html',
  styleUrls: ['./dash-tile.component.scss'],
  animations: [
    trigger('dash', [
      transition(':enter', animate('100ms ease-in')),
      transition(':leave', animate('100ms ease-out')),  
    ])
  ]
})
export class DashTileComponent implements OnInit {

  @Input() icon: any;
  @Input() sub: any;
  @Input() subtitle: any;
  @Input() title: string;
  @Input() runCounter: any;
  @Input() background : any;
  @Input() hovercolor : any;
  n = 0;
  @ViewChild('dash') dash;
  constructor() {
  }

  ngOnInit() {
  }
 
  public callBack(counter) {
    var interval = setInterval(() => {
      if (this.n < counter) { this.n++; }
      else
        clearInterval(interval);
    },100);
  }
}