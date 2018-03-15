import { Component, OnInit, Input } from '@angular/core';
import { Placeholder } from './placeholder.model';

@Component({
  selector: 'app-placeholders',
  templateUrl: './placeholders.component.html',
  styleUrls: ['./placeholders.component.scss']
})
export class PlaceholdersComponent implements OnInit {
  lines = [1,2,3,4,5];
  divider = [1,2,3];
  hours_placeholder = Array(7).fill('');
  images = Array(5).fill(
      { source: 'assets/logo.png', alt: 'Description for Image 1', title: 'Title 1' });      

  @Input() profile:boolean;
  @Input() table:boolean;
  @Input() image:boolean;

  //check 
  @Input() icon:boolean;
  @Input() dash:boolean;
  @Input() iconStyle:any;
  constructor() { }

  ngOnInit() {
  }

}
