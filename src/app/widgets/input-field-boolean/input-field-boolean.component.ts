import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-field-boolean',
  templateUrl: './input-field-boolean.component.html',
  styleUrls: ['./input-field-boolean.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldBooleanComponent implements OnInit {
  list: any;
  @Input() value: any;
  @Input() label: any;
  @Output() selected: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
    this.list = [
      { label: "No", value: false },
      { label: "Yes", value: true },
    ];
  }

  ngOnInit() {
  }

  onSelected() {
    this.selected.emit(this.value);
  }

}
