import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DealerService } from '../../service/dealer.service';
import { ImageService } from '../../service/image.service';
import { Utils } from '../../utils/utils';
import * as cbv from '../../models/vendor';
import * as FileAPI from 'fileapi';
import * as _ from 'lodash';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  uploading: boolean;
  images: any[] = new Array();

  imageMetas: any[] = new Array();
  imageList: any[] = new Array();
  uploadedImages: any[] = new Array<any>();
  imagePreviewUrl: any;
  uploaded: boolean;
  counter = 0;
  uploadFail: boolean;

  @Input() showDialog: any;
  @Output() showDialogChange: any = new EventEmitter<any>();
  @Output() uploadPath: any = new EventEmitter<any>();
  @Output() uploadedURLs: EventEmitter<any> = new EventEmitter<any>();
  hover: any;
  dealerImage: any;

  image: cbv.Vendor.Image = new cbv.Vendor.Image();
  constructor(private sanitizer: DomSanitizer, private imageService: ImageService, private dealerService: DealerService) { }

  ngOnInit() {
    this.uploaded = false;
  }

  /**
   * Color the drop zone when dragging file
   * @param event 
   */
  fileOver(event) {
    this.hover = event;
  }

  /**
   * On files dropped
   * @param event 
   */
  onFilesChange(event) {
    this.images = Array.from(event);
    this.images = Utils.returnImages(this.images);
    this.images.length > 5 ? this.images.length = 5 : null;
    console.log(this.images);
    this.populateMeta();
  }

  /**
   * On files selected from file explorer
   * @param event 
   */
  onFilesSelected(event) {
    this.images = Array.from(event.target.files);
    this.images = Utils.returnImages(this.images);
    this.images.length > 5 ? this.images.length = 5 : null;
    console.log(this.images);
    this.populateMeta();
  }

  getImageForFile(file) {
    return this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
  }

  /**
   * Reinitalize everything on hide, because dialog hide does not call onDestroy event
   */
  hide() {
    this.showDialog = false;
    this.uploading = false;
    this.images.length = 0;
    this.imageMetas.length = 0;
    this.showDialogChange.emit(this.showDialog);
  }

  done() {
    this.uploadedURLs.emit(this.uploadedImages);
    this.hide();
  }


  populateMeta() {
    this.images.forEach(image => {
      this.imageMetas.push({ name: image.name, size: image.size, status: false, object: image });
    });
    this.imageMetas = [...this.imageMetas];
    console.log(this.imageMetas);
  }

  startUpload(event) {
    this.uploading = true;
  }

  deleteImage(img) {
    console.log('Delete', img);
    _.remove(this.imageMetas, function (imgR) {
      return imgR.name === img.name;
    });
    this.imageMetas = [...this.imageMetas]; //hack to update the list 
    _.remove(this.images, function (imgR) {
      return imgR.name === img.name;
    })
    this.images = [...this.images]; //hack to update the list
    console.log(this.images);
  }

  deleteFromImageList(img) {
    _.remove(this.imageList, function (imgR) {
      return imgR === img;
    })
  }

  uploadImages() {
    this.uploading = true;
    console.log('Uploaded', this.imageMetas);
    this.imageMetas.forEach((img, index) => {
      console.log(index);
      FileAPI['readAsDataURL'](img.object, (event) => {
        if (event.type === 'load') {
          var image = this.stripMetaFromDataURL(event.result, Utils.getExtension(img.name));
          this.upload({ filename: img.name, imagetype: "VENDOR", objectid: localStorage.getItem('vendorId'), content: image }, index);
        } else if (event.type === 'error') {
          throw new Error(`Couldn't read file '${img.name}'`);
        }
      });
    })
  }

  upload(data, index) {
    this.imageService.dealerImageUpload(data).subscribe(res => {      
      this.imageMetas[index].status = true;
      this.uploadedImages.push(res.pictureURL);
    },
      err => {
        this.uploadFail = true;
        console.log("error", err);
      });
  }

  getUploadStatus() {
    if (this.imageMetas.length > 0)
      return this.imageMetas.every(this.statusTrue);
    return false;
  }

  private statusTrue(img) {
    return img.status ? img.status : false;
  }

  getBinaryString(file) {
    FileAPI['readAsDataURL'](file, (event) => {
      if (event.type === 'load') {
        return event.result;
      } else if (event.type === 'error') {
        throw new Error(`Couldn't read file '${file.name}'`);
      }
    });
  }

  stripMetaFromDataURL(data, ext) {
    var base64;
    switch (ext) {
      case 'jpeg':
        base64 = data.replace('data:image/jpeg;base64,', '');
        break;
      case 'jpg':
        base64 = data.replace('data:image/jpeg;base64,', '');
        break;
      case 'png':
        base64 = data.replace('data:image/png;base64,', '');
        break;
      case 'gif':
        base64 = data.replace('data:image/gif;base64,', '');
        break;
    }
    return base64;
  }
}