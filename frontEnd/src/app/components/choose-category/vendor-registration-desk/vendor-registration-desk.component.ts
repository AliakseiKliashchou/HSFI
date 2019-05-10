import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const logoName = localStorage.getItem('userName');
const URL = `http://localhost:3000/uploadVendorPhoto?logoName=${logoName}`;



@Component({
  selector: 'app-vendor-registration-desk',
  templateUrl: './vendor-registration-desk.component.html',
  styleUrls: ['./vendor-registration-desk.component.css'],
  providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class VendorRegistrationDeskComponent implements OnInit {

  date = new FormControl(moment());

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'avatar'});

  constructor(private http: HttpClient, private el: ElementRef) {   }
 

  ngOnInit() {
    console.log(this.date.value._d);
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);  
      alert('Image was successfully uploaded');    
    };
    //---------------------------
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/getOperator', {email: localStorage.getItem('userName')}, httpOptions).subscribe((data: any) => {
        this.vendor.operatorName = data.user.name;
        console.log(this.vendor);  
    });
  }
  
  vendor = {
    operatorName : '',
    registrationDate: this.date.value._d,
    country: '',
    name: '',
    licenceNumber: '',
    phone: '',
    email: '',
    businessLocation: [[],[]],
    buisnessSchedule: [],
    ingredientSource: [],
    foodGroup: '',
  }
  src=`http://localhost:3000/${logoName}.jpg`;
  scheduleArray = [""]; 
  locationArray = [""];
  ingredientArray = [""];
  
  //-------------ADD AND FILL SOME FIELDS---------
  addSchedule(){
    this.scheduleArray.push('nextString');
  }
  //Location
  addLocation(){
    this.locationArray.push('nextString');
  }
  businessLocationCity(city, i){
    this.vendor.businessLocation[i][0] = city;
  }
  businessLocationStreet(street, i){
    this.vendor.businessLocation[i][1] = street;
  }
  businessLocationNum(num, i){
    this.vendor.businessLocation[i][2] = num;
  }

  //Ingredient
  addIngredient(){
    this.ingredientArray.push('nextString');    
  }
  ingredientValue(item, i){
    console.log(item);
    console.log(i);
    this.vendor.ingredientSource[i] = item;
  }
//---------------------------------------
 
submit(){
  console.log(this.vendor.businessLocation);
}  
  
}
