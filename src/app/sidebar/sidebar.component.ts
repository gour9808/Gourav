import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { FeatureService } from '../services/feature.service';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() menu: Array<Object>;
  version = environment.version;
  brand :any[];
  features: any[];
  selectedBrands : any[];
  selectedFeatures : any[];
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(private feature: FeatureService, private brands: BrandService) { }

  ngOnInit() {
    console.log("Init Sidebar");
    console.log(this.menu);
    this.getBrands();
    this.getFeature();

  }

  getBrands() {
    this.brands.getBrands().subscribe(res => {
      console.log("brands are",res);
      this.brand = res;

    })
  }

  selected(event) {
    console.log(event);
    
    this.modelChange.emit(this.model);
  }

  getFeature() {
    this.feature.getFeatures().subscribe(res => {
      console.log("features are",res);
      this.feature = res;

    })
  }

}
