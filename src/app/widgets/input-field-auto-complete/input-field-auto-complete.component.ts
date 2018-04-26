import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as cbv from '../../models/VehicleDetail';
import * as _ from 'lodash';

@Component({
  selector: 'app-input-field-auto-complete',
  templateUrl: './input-field-auto-complete.component.html',
  styleUrls: ['./input-field-auto-complete.component.scss']
})
export class InputFieldAutoCompleteComponent implements OnInit, OnChanges {
  @Output() selected: any = new EventEmitter<any>();
  @Output() search: any = new EventEmitter<any>();
  /**
   * True: The component will filter by itself. @filterProperty and @completeArray must be provided.
   * False: The component will send the search query in @search. You should send the result set in @filteredArray
   */
  @Input() shouldQuery: boolean;
    @Input() model: any[];

  @Input() filteredArray: any;
  @Input() completeArray: any;
  @Input() filterProperty: any;
  @Output() modelChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  results: any = [];
  constructor() { }

  ngOnInit() {
    console.log("Initalize");
  }

  ngOnChanges(changes: SimpleChanges) {
    this.results = this.filteredArray;
  }

  onPartSelected(event) {
    console.log("Part selected is", event);
    this.selected.next(event);
  }

  onInputChanged() {
    this.modelChange.emit(this.model);
  }

  searchParts(event) {
    console.log("Searching for ", event.query);
    console.log(this.filteredArray);
    if (this.shouldQuery) {
      this.filterResults(event.query);
    } else {
      this.search.next(event.query);
    }
  }

  filterResults(event) {
    this.results = _.filter(this.completeArray, item => {
      return item[this.filterProperty].indexOf(event) !== -1;
    });
  }

  //https://ngdev.space/angular-2-input-property-changes-detection-3ccbf7e366d2

}
