import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-field-number',
  templateUrl: './input-field-number.component.html',
  styleUrls: ['../input-field-text/input-field-text.component.scss']
})
export class InputFieldNumberComponent implements OnInit {

  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: number;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onInputChanged() {
    // var stripped = this.model.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    // this.model = stripped;
    this.modelChange.emit(this.model);
  }

}
