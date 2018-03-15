import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-field-text',
  templateUrl: './input-field-text.component.html',
  styleUrls: ['./input-field-text.component.scss']
})
export class InputFieldTextComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: any;
   @Input() error:any;
  @Input() errorMessage:any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  
  onInputChanged() {
    this.modelChange.emit(this.model);
  }
}
