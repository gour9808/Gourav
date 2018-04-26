import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { Constants } from '../service/constants';
import { vehicles } from '../app.globals';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleComponent implements OnInit {
  vehicles: any = [{
    "make": "faucibus orci",
    "model": "justo etiam",
    "country": "BR",
    "variant": "consequat nulla"
  }, {
    "make": "aliquet pulvinar",
    "model": "elit",
    "country": "ID",
    "variant": "et"
  }, {
    "make": "eleifend",
    "model": "condimentum curabitur",
    "country": "CZ",
    "variant": "sed"
  }, {
    "make": "in imperdiet",
    "model": "dui proin",
    "country": "CN",
    "variant": "ut erat"
  }, {
    "make": "sit amet",
    "model": "scelerisque",
    "country": "CN",
    "variant": "nunc"
  }, {
    "make": "duis consequat",
    "model": "mi",
    "country": "ID",
    "variant": "leo odio"
  }, {
    "make": "lacus purus",
    "model": "lobortis ligula",
    "country": "LK",
    "variant": "convallis"
  }, {
    "make": "turpis donec",
    "model": "erat",
    "country": "ID",
    "variant": "felis"
  }, {
    "make": "enim sit",
    "model": "et",
    "country": "IE",
    "variant": "odio donec"
  }, {
    "make": "in",
    "model": "massa id",
    "country": "CZ",
    "variant": "molestie lorem"
  }, {
    "make": "integer ac",
    "model": "justo",
    "country": "ID",
    "variant": "eros"
  }, {
    "make": "orci",
    "model": "mauris",
    "country": "MY",
    "variant": "cubilia curae"
  }, {
    "make": "quam nec",
    "model": "vel",
    "country": "CZ",
    "variant": "dignissim vestibulum"
  }, {
    "make": "natoque penatibus",
    "model": "tellus in",
    "country": "PH",
    "variant": "in"
  }, {
    "make": "nulla",
    "model": "est",
    "country": "NP",
    "variant": "mattis"
  }, {
    "make": "nullam sit",
    "model": "vivamus",
    "country": "BQ",
    "variant": "tincidunt"
  }, {
    "make": "nulla",
    "model": "ac lobortis",
    "country": "RU",
    "variant": "fusce posuere"
  }, {
    "make": "lacus",
    "model": "enim in",
    "country": "PL",
    "variant": "vestibulum ante"
  }, {
    "make": "velit donec",
    "model": "fusce congue",
    "country": "PL",
    "variant": "quam nec"
  }, {
    "make": "semper interdum",
    "model": "ligula in",
    "country": "FR",
    "variant": "lacus at"
  }, {
    "make": "luctus",
    "model": "tellus",
    "country": "ID",
    "variant": "vulputate nonummy"
  }, {
    "make": "sit amet",
    "model": "nam",
    "country": "MX",
    "variant": "sed vel"
  }, {
    "make": "vel pede",
    "model": "orci mauris",
    "country": "ID",
    "variant": "felis"
  }, {
    "make": "morbi",
    "model": "ut erat",
    "country": "CN",
    "variant": "leo rhoncus"
  }, {
    "make": "pharetra magna",
    "model": "in",
    "country": "ID",
    "variant": "mi"
  }, {
    "make": "nonummy maecenas",
    "model": "vivamus metus",
    "country": "AZ",
    "variant": "vestibulum"
  }, {
    "make": "duis",
    "model": "sit amet",
    "country": "ID",
    "variant": "nulla"
  }, {
    "make": "amet cursus",
    "model": "dictumst",
    "country": "CN",
    "variant": "justo"
  }, {
    "make": "orci",
    "model": "cras pellentesque",
    "country": "CN",
    "variant": "libero"
  }, {
    "make": "elementum",
    "model": "vestibulum",
    "country": "AR",
    "variant": "praesent"
  }, {
    "make": "in congue",
    "model": "sit",
    "country": "PE",
    "variant": "purus"
  }, {
    "make": "molestie sed",
    "model": "parturient montes",
    "country": "GR",
    "variant": "donec odio"
  }, {
    "make": "id ornare",
    "model": "elit proin",
    "country": "AR",
    "variant": "suspendisse"
  }, {
    "make": "posuere nonummy",
    "model": "vulputate",
    "country": "ID",
    "variant": "eget vulputate"
  }, {
    "make": "ut",
    "model": "donec vitae",
    "country": "CA",
    "variant": "mauris vulputate"
  }, {
    "make": "vestibulum",
    "model": "eget tincidunt",
    "country": "DO",
    "variant": "volutpat eleifend"
  }, {
    "make": "volutpat",
    "model": "magnis dis",
    "country": "JP",
    "variant": "vivamus"
  }, {
    "make": "cubilia curae",
    "model": "mi pede",
    "country": "BR",
    "variant": "donec"
  }, {
    "make": "dui vel",
    "model": "in est",
    "country": "RU",
    "variant": "vestibulum"
  }, {
    "make": "nam",
    "model": "erat",
    "country": "RU",
    "variant": "donec quis"
  }, {
    "make": "sapien",
    "model": "convallis",
    "country": "PL",
    "variant": "felis"
  }, {
    "make": "natoque penatibus",
    "model": "platea dictumst",
    "country": "UG",
    "variant": "turpis enim"
  }, {
    "make": "sapien",
    "model": "vitae nisi",
    "country": "FR",
    "variant": "dui"
  }, {
    "make": "nam",
    "model": "vestibulum sit",
    "country": "CN",
    "variant": "suscipit a"
  }, {
    "make": "orci luctus",
    "model": "diam",
    "country": "BR",
    "variant": "consequat ut"
  }, {
    "make": "aliquam",
    "model": "odio curabitur",
    "country": "AF",
    "variant": "et ultrices"
  }, {
    "make": "id nulla",
    "model": "orci",
    "country": "CN",
    "variant": "cras non"
  }, {
    "make": "aenean lectus",
    "model": "commodo",
    "country": "BR",
    "variant": "justo sollicitudin"
  }, {
    "make": "nullam",
    "model": "lectus in",
    "country": "SE",
    "variant": "nisi"
  }, {
    "make": "eget",
    "model": "odio",
    "country": "US",
    "variant": "pulvinar lobortis"
  }]
  constructor() {

  }
  ngOnInit() {
    console.log("Init Vehicle Component");
  }


}
