import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  tabItems = [ {
    name: 'PROFILE',
    path: 'profile',
    icon: 'mdi-account'
  },
  {
    name: 'Business Hours',
    path: 'hours',
    icon: 'mdi-clock'
  },
  {
    name: 'Add Photos',
    path: 'images',
    icon: 'mdi-folder-multiple-image'
  }, {
    name: 'SALES_&_SERVICE',
    path: 'sales',
    icon: 'mdi-car-wash'
  }]
  constructor() { }

  ngOnInit() {
  }

}
