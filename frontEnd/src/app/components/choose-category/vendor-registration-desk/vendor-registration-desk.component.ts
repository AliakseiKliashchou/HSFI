import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';


const URL = 'http://localhost:3000/loadImg';


@Component({
  selector: 'app-vendor-registration-desk',
  templateUrl: './vendor-registration-desk.component.html',
  styleUrls: ['./vendor-registration-desk.component.css']
})
export class VendorRegistrationDeskComponent implements OnInit {
 
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'avatar'});

  constructor(private http: HttpClient, private el: ElementRef) {   }
 

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  scheduleArray = [""]; 
  locationArray = [""];
  ingredientArray = [""];
  
  addSchedule(){
    this.scheduleArray.push('nextString');
  }
  addLocation(){
    this.locationArray.push('nextString');
  }
  addIngredient(){
    this.ingredientArray.push('nextString');
  }
//---------------------------------------
  
  
  
}
