import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-input-field-autocomplete-address',
  templateUrl: './input-field-autocomplete-address.component.html',
  styleUrls: ['./input-field-autocomplete-address.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldAutocompleteAddressComponent implements OnInit {

  autocomplete: google.maps.places.AutocompleteService;
  results: any;
  @Input() label: any;
  @Input() placeholder: any;
  @Input() model: any;
  @Input() error:any;
  @Input() errorMessage:any;
  @Output() pickedAddress: EventEmitter<any> = new EventEmitter<any>();
  constructor( private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(()=>{
      this.autocomplete = new google.maps.places.AutocompleteService();
    })
  }

  search(event) {
    console.log('Searching for ', event.query);
    this.autocomplete.getPlacePredictions({input:event.query},res=>{
      console.log('Places search',res);
      this.results = res;
    })
  }

  selected(event){
    console.log('Selected Address',event);
    this.pickedAddress.emit(event);
  }


}
