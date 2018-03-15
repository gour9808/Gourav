import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-field-options',
  templateUrl: './input-field-options.component.html',
  styleUrls: ['./input-field-options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldOptionsComponent implements OnInit, OnChanges {
  @Input() list: any;
  @Input() label: any;
  @Input() placeH: any;
  @Input() value: any;
  @Input() reset: any;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reset']) {
      this.value = null;
    }
  }
  onSelected() {
    console.log(this.value);
    this.selected.emit(this.value);
  }

}
