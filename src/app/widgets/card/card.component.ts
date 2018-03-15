import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title;
  @Input() showExpansion;
  @Input() expanded:boolean;
  @Input() showBack:boolean;
  @Output() onBackPressed = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  back(){
    this.onBackPressed.emit();
  }

}
