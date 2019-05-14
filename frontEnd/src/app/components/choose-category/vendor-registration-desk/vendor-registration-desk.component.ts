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
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




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

  //Init uploader
  public uploader:FileUploader = new FileUploader({url: `http://localhost:3000/uploadVendorPhoto?logoName=${localStorage.getItem('userName')}`, itemAlias: 'avatar'});
  public uploader2:FileUploader = new FileUploader({url: `http://localhost:3000/uploadVendorLicence?logoName=${localStorage.getItem('userName')}`, itemAlias: 'licence'});

  constructor(private http: HttpClient, private el: ElementRef) {   }
 

  ngOnInit() {  
  //UPLOAD PHOTO AND LICENCE SCAN   
  this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);  
      alert('Image was successfully uploaded');
      this.vendor.photo = `http://localhost:3000/${this.vendor.name}-photo.jpg`;  
    };
  this.uploader2.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader2.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);  
      alert('Licence scan was successfully uploaded');   
      this.vendor.licenceScan = `http://localhost:3000/${this.vendor.name}-licence.jpg`; 
    };
    //---------------------------
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    //REQUEST FOR FETCHING OPERATOR`S NAME FIELD
    this.http.post('http://localhost:3000/getOperator', {email: localStorage.getItem('userName')}, httpOptions).subscribe((data: any) => {
        this.vendor.operatorName = data.user.email;
        console.log(this.vendor);  
    });
  }


  //--------Empty vendor object------
  vendor = {
    flag: localStorage.getItem('userName'),
    operatorName : '',
    registrationDate: '',
    photo: '',
    licenceScan: '',
    country: '',
    name: '',
    licenceNumber: '',
    phone: '',
    email: '',
    businessLocation: [[],[],[]],
    businessSchedule: [[],[],[]],
    ingredientSource: [],
    foodGroup: '',
  };
  

  scheduleArray = [""]; 
  locationArray = [""];
  ingredientArray = [""];
  
  //-------------ADD AND FILL INPUTS FIELDS-------------//
                                                        //
  //Location                                            //
  addLocation(){                                        //
    this.locationArray.push('nextString');              //
  }                                                     //
  businessLocationCity(city, i){                        //
    this.vendor.businessLocation[0][i] = city;          //
  }                                                     //      
  businessLocationStreet(street, i){                    //
    this.vendor.businessLocation[1][i] = street;        //
  }                                                     //
  businessLocationNum(num, i){                          //  
    this.vendor.businessLocation[2][i] = num;           //
  }                                                     //
  //Schedule                                            //
  addSchedule(){                                        //
    this.scheduleArray.push('nextString');              //
  }                                                     //
  businessScheduleDay(day, i){                          //
    this.vendor.businessSchedule[0][i] = day;           //
  }                                                     //
  businessScheduleFrom(from, i){                        //
    this.vendor.businessSchedule[1][i] = from;          //
  }                                                     //
  businessScheduleTo(to, i){                            //
    this.vendor.businessSchedule[2][i] = to;            //
  }                                                     //
  //Ingredient                                          //  
  addIngredient(){                                      //
    this.ingredientArray.push('nextString');            //
  }                                                     //
  ingredientValue(item, i){                             //
    this.vendor.ingredientSource[i] = item;             //
  }                                                     //
//------------------------------------------------------//
 
//===========SEND ALL DATA TO SERVER===============================================================================
submit(date, operatorName, country, name, licenceNumber, phone, email, foodGroup){
  this.vendor.registrationDate = date;
  this.vendor.operatorName = operatorName;
  this.vendor.country = country;
  this.vendor.name = name;
  this.vendor.licenceNumber = licenceNumber;
  this.vendor.phone = phone;
  this.vendor.email = email;
  this.vendor.foodGroup = foodGroup;
  console.log(this.vendor);

  const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };
  
  this.http.post('http://localhost:3000/vendorRegistration', this.vendor, httpOptions).subscribe((data: any) => {      
      console.log(data); 
      alert('The data was successfully submitted'); 
  });

};
  
}
