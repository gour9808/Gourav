import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation, QueryList, ViewChildren } from '@angular/core';
import * as cbv from '../../models/vendor';
import { ImageService } from '../../service/image.service';
import { DealerService } from '../../service/dealer.service';
import { Utils } from '../../utils/utils';
import * as _ from 'lodash';
import * as FileAPI from 'fileapi';
import { Checkbox } from "primeng/primeng";
import { element } from 'protractor';
//import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageComponent implements OnInit {
  checkBoxes: Checkbox[];
  showBar: any[] = new Array<any>();
  checkArray: boolean[] = [];
  images: any[];
  uploadImgages: any[];
  dialog;
  editImage: any;
  vendor: cbv.Vendor.VendorDetail = new cbv.Vendor.VendorDetail();
  public logoPreviewUrl: any;
  public imagePreviewUrl: any;
  public binary_string: any;
  public image: any;
  public msg: any;
  display: boolean = false;
  logoName: any;
  imageName: any;
  hover: any;
  loading: boolean = false;
  disableButton: boolean = false;
  checked: boolean = false;
  constructor(private imageService: ImageService, private dealerService: DealerService) {
    this.images = Array(5).fill(
      { source: 'assets/logo.png', alt: 'Description for Image 1', title: 'Title 1' });      
  }

  ngOnInit() {
    if(localStorage.getItem('vendorId'))
      this.getDealerProfile();
  }

  getDealerProfile() {   
      this.dealerService.getDealerDetails(localStorage.getItem('vendorId')).subscribe(res => {
      this.vendor = res;
      this.vendor = _.merge(new cbv.Vendor.VendorDetail(), res);
      console.log('DETAILS', this.vendor);
      this.clearChecks(this.vendor.logoUrl ? this.vendor.photoUrlGallery.indexOf(this.vendor.logoUrl) : 0);
    });
  }

  fetchDealer() {
    this.dealerService.fetchDealer(localStorage.getItem('vendorId')).subscribe(res => {
      this.vendor = res;
      this.vendor = _.merge(new cbv.Vendor.VendorDetail(), res);
      // this.toastyService.success({
      //     title: "Success",
      //     msg: "Uploaded images for "+this.vendor.name,
      //     showClose: false,
      //     timeout: 3000,
      //     theme: 'default'
      //   });
    })
  }

  updateDealerImage() {
    this.dealerService.updateDealer(this.vendor.id, this.vendor).subscribe(res => {
      console.log('updated successfully', res);
      this.fetchDealer(); //fetch latest dealer info after updating images. 
    }, err => {
      console.log("updateProfile", err);
    })
  }

  deleteImage(i) {
    this.vendor.photoUrlGallery.splice(i, 1);
    this.updateDealerImage();
  }

  deleteUploadedLogo(img) {
    this.vendor.logoUrl = '';
  }

  showDialog() {
    this.display = true;
  }

  addImageToGallery(event) {
    this.vendor.photoUrlGallery = this.vendor.photoUrlGallery.concat(event);
    console.log(this.vendor.photoUrlGallery);
    //this.updateDealerImage();
  }

  setLogo(index, event) {
    console.log(index);
    if (event) {
      this.vendor.logoUrl = this.vendor.photoUrlGallery[index];
    } else {
      this.vendor.logoUrl = '';
    }
    this.vendor.photoUrlGallery.splice(0, 0, this.vendor.photoUrlGallery.splice(index, 1)[0]);
    this.clearChecks(this.vendor.logoUrl ? this.vendor.photoUrlGallery.indexOf(this.vendor.logoUrl) : 0);
    console.log(this.vendor);
    this.updateDealerImage();
  }

  private clearChecks(index) {
    this.checkArray = new Array(this.vendor.photoUrlGallery.length).fill(false);
    this.checkArray[index] = true;
    console.log(this.checkArray);
  }
}
