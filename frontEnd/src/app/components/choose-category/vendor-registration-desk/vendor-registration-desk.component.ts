import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { APIserviceService } from 'src/app/services/apiservice.service';
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

  isShowProgressBar = false;

  date = new FormControl(moment());

  //Init uploader
  public uploader:FileUploader = new FileUploader({url: `http://localhost:3000/uploadVendorPhoto?logoName=${localStorage.getItem('userName')}`, itemAlias: 'avatar'});
  public uploader2:FileUploader = new FileUploader({url: `http://localhost:3000/uploadVendorLicence?logoName=${localStorage.getItem('userName')}`, itemAlias: 'licence'});

  constructor(private http: HttpClient, private el: ElementRef, private _snackBar: MatSnackBar, private HTTP: APIserviceService) {   } 

  ngOnInit() {  
  //UPLOAD PHOTO AND LICENCE SCAN   
  this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.isShowProgressBar = true;      
      this._snackBar.open('Image was successfully loaded','', {
        duration: 2000,
      });
      this.vendor.photo = `http://localhost:3000/${this.vendor.name}-photo.jpg`;  
      this.isShowProgressBar = false;
    };
  this.uploader2.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader2.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.isShowProgressBar = true;        
      this._snackBar.open('Image was successfully loaded','', {
        duration: 2000,
      });  
      this.vendor.licenceScan = `http://localhost:3000/${this.vendor.name}-licence.jpg`; 
      this.isShowProgressBar = false;
    };
    //---------------------------
    
    //REQUEST FOR FETCHING OPERATOR`S NAME FIELD 
    this.HTTP.getOperator(localStorage.getItem('userName')).subscribe((data: any) => {
        this.vendor.operatorName = data.user.email;
        console.log(this.vendor);  
    });
    this.HTTP.getAdminData().subscribe((data: any) => {
      for(let i = 0; i < data[0].foodGroups.length; i++){
        this.foodGroupsFromDb[i] = data[0].foodGroups[i];
      }
      for(let i = 0; i < data[0].countries.length; i++){
        this.countriesFromDb[i] = data[0].countries[i];        
      }
    });
  }

  //************************VALIDATION*********************************** */
  isShowSubmitBtn = true;
  userInput = {
    name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),    
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),   
    country: new FormControl('', [Validators.required]),
    licenceNumber: new FormControl('', [Validators.required]),
    cityLocation: new FormControl('', [Validators.required]),
    streetLocation: new FormControl('', [Validators.required]),
    numLocation: new FormControl('', [Validators.required]),
    daySchedule: new FormControl('', [Validators.required]),
    ingredient: new FormControl('', [Validators.required]),
    foodGroup: new FormControl('', [Validators.required]),
  }
  getErrorFoodGroup(){
    return this.userInput.foodGroup.hasError('required') ? 'You must enter a value' : '';
  }
  getErrorIngredient(){
    return this.userInput.ingredient.hasError('required') ? 'You must enter a value' : '';
  }
  getErrorDaySchedule(){
    return this.userInput.daySchedule.hasError('required') ? 'You must enter a value' : '';
  }
  getErrorNumLocation(){
    return this.userInput.numLocation.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorStreetLocation(){
    return this.userInput.streetLocation.hasError('required') ? 'You must enter a value' : '';
  }
  getErrorMessageCountry(){
    return this.userInput.country.hasError('required') ? 'You must enter a value' : '';
  }
 
  getErrorCityLocation(){
    return this.userInput.cityLocation.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorLicenceBumber(){
    return this.userInput.licenceNumber.hasError('required') ? 'You must enter a value' : '';
  }
  
  getErrorMessageName(){
    return this.userInput.name.hasError('required') ? 'You must enter a value' :
      this.userInput.name.hasError('pattern') ? 'The name field should not contains numbers' :
          '';
  }
  
  getErrorMessagePhone(){
    return this.userInput.phone.hasError('required') ? 'You must enter a value' :
    this.userInput.phone.hasError('pattern') ? 'Wrong phone number format' :
        '';
  }
  getErrorMessageEmail(){
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
    this.userInput.email.hasError('pattern') ? 'Not a valid email' :
        '';
  }
  checkIt(){
    console.log('check');
  }
  checkForm(){
    if(!this.userInput.email.invalid && 
      !this.userInput.name.invalid &&      
      !this.userInput.phone.invalid &&
      !this.userInput.country.invalid &&
      !this.userInput.licenceNumber.invalid &&
      !this.userInput.cityLocation.invalid &&
      !this.userInput.streetLocation.invalid &&
      !this.userInput.numLocation.invalid &&
      !this.userInput.daySchedule.invalid &&
      !this.userInput.ingredient.invalid &&
      !this.userInput.foodGroup.invalid
      ){
        this.isShowSubmitBtn = false;
    }else this.isShowSubmitBtn = true;
  }

  //********************************************************************* */

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
    latitude: 0,
    longitude: 0,
  };
  

  scheduleArray = [""]; 
  locationArray = [""];
  ingredientArray = [""];
  
  foodGroupsFromDb = [];
  countriesFromDb = [];

  buisnessLocationDelBtn = false;
  buisnessScheduleDelBtn = false;
  //-------------ADD AND FILL INPUTS FIELDS-------------//
                                                        //
  //Location                                            //
  addLocation(){                                        //
    this.locationArray.push('nextString');              //
    if(this.locationArray.length > 1){                  //
      this.buisnessLocationDelBtn = true;               //
    }else this.buisnessLocationDelBtn = false;          //
  }                                                     //
  delLocation(){                                        //
    this.locationArray.splice(1, 1);                    //
    if(this.locationArray.length > 1){                  //
      this.buisnessLocationDelBtn = true;               //
    }else this.buisnessLocationDelBtn = false;          //
  }                                                     //
  businessLocationCity(city, i){                        //
    //this.vendor.businessLocation[0][i] = city;        //
    this.vendor.businessLocation[0][i] = city.address_components[0].long_name;
    this.vendor.latitude = city.geometry.location.lat();//
    this.vendor.longitude = city.geometry.location.lng();//    
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
    if(this.scheduleArray.length > 1){                  //
      this.buisnessScheduleDelBtn = true;               //
    }else this.buisnessScheduleDelBtn = false;          //
  }                                                     //
  delSchedule(){                                        //
    this.scheduleArray.splice(1, 1);                    //
    if(this.scheduleArray.length > 1){                  //
      this.buisnessScheduleDelBtn = true;               //
    }else this.buisnessScheduleDelBtn = false;          //
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
  this.isShowProgressBar = true;
  this.vendor.registrationDate = date;
  this.vendor.operatorName = operatorName; 
  this.vendor.country = country;  
  this.vendor.name = name;
  this.vendor.licenceNumber = licenceNumber;
  this.vendor.phone = phone;
  this.vendor.email = email;
  this.vendor.foodGroup = foodGroup;  
  this.HTTP.vendorRegistration(this.vendor).subscribe((data: any) => {         
      this._snackBar.open('The vendor was successfully registered','', {
        duration: 2000,
      });
      this.isShowProgressBar = false;
  }); 
 
};
  
}
