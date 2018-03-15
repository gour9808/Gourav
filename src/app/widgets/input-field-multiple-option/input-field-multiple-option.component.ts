import { Component,OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-input-field-multiple-option',
  templateUrl: './input-field-multiple-option.component.html',
  styleUrls: ['./input-field-multiple-option.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldMultipleOptionComponent implements OnInit {  
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
