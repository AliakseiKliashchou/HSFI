import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-inspection-desk',
  templateUrl: './inspection-desk.component.html',
  styleUrls: ['./inspection-desk.component.css']
})
export class InspectionDeskComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private http: HttpClient, private modalService: BsModalService) { }

  ngOnInit() {
  } 

  toggle = false;
  vendor: {[k: string]: any} = {};
  vendorsArray = [];
  
  isShowNameBtn = false;
  isShowLicenceBtn = false;
  isShowPhoneBtn = false;
  isShowEmailBtn = false;
  isShowCountryBtn = false;
  isShowFoodgroupBtn = false;
  isShowOssBtn = false;
  isShowChangesBtn = false;

  nameBtn = '&#9998';
  licenceBtn = '&#9998';
  phoneBtn = '&#9998';
  emailBtn = '&#9998';
  countryBtn = '&#9998';
  foodGroupBtn = '&#9998';
  ossBtn = '&#9998';

  nameDisable = true;
  licenceDisable = true;
  phoneDisable = true;
  emailDisable = true;
  countryDisable = true;
  foodGroupDisable = true;
  ossDisable = true;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  toggler(){
    this.toggle = !this.toggle;   
  }
//------------------FORM REQUEST TO SERVER----------------------------
  showVendor( country, city, openClosed, foodGroup, oss, yes, no, stars){
  //---------------sober all data in request object-------------   
    if(country){                            //
      this.vendor.country = country;        //
    }                                       //
    if(city){                               //
      this.vendor.city = city;              //
    }                                       // 
    if(openClosed){                         //
      this.vendor.openClosed = openClosed;  //
    }                                       //
    if(foodGroup){                          //
      this.vendor.foodGroup = foodGroup;    //
    }                                       //
    if(oss){                                //
      this.vendor.oss = oss;                //
    }                                       //
    if(yes.checked){                        //
      this.vendor.wasFlag = yes.value;      //
    }else if(no.checked){                   //
      this.vendor.wasFlag = no.value;       //
    }                                       //
    if(stars){                              //
      this.vendor.stars = stars;            //
    }                                       //
    //--------------------------------------//
    console.log(this.vendor);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/viewVendor', this.vendor, httpOptions).subscribe((data: any) => {
      for(let i = 0; i < data.length; i++){
        this.vendorsArray.push(data[i]);
      }
      console.log(this.vendorsArray);
  });

  }

  //---------------VIEW VENDOR PROFILE AND CHANGE INFO---------------
  changeName(name, i){
    this.nameDisable = !this.nameDisable;
    this.nameBtn = 'Ok';
    this.isShowChangesBtn = true;
    if(this.nameDisable){
      //console.log(name);
      this.nameBtn = '&#9998';
      this.vendorsArray[i].name = name;
      console.log(this.vendorsArray[i]);
    }
    
  }

  changeLicenceNumber(licenceNumber, i){
    this.licenceDisable = !this.licenceDisable;
    this.licenceBtn = 'Ok';
    this.isShowChangesBtn = true;
    if(this.licenceDisable){
      //console.log(name);
      this.licenceBtn = '&#9998';
      this.vendorsArray[i].licenceNumber = licenceNumber;
      console.log(this.vendorsArray[i]);
    }
  }

  changePhone(phone, i){
    this.phoneDisable = !this.phoneDisable;
    this.phoneBtn = 'Ok';
    this.isShowChangesBtn = true;
    if(this.phoneDisable){
      this.phoneBtn = '&#9998';
      this.vendorsArray[i].phone = phone;
      console.log(this.vendorsArray[i]);
    }
  }
  
  changeEmail(email, i){
    this.emailDisable = !this.emailDisable;
    this.emailBtn = 'Ok';
    this.isShowChangesBtn = true;
    if(this.emailDisable){
      this.emailBtn = '&#9998';
      this.vendorsArray[i].email = email;
      console.log(this.vendorsArray[i]);
    }
  }

  changeCountry(country, i){
    this.countryDisable = !this.countryDisable;
    this.countryBtn = 'Ok';
    this.isShowChangesBtn = true;
    if(this.countryDisable){
      this.countryBtn = '&#9998';
      this.vendorsArray[i].country = country;
      console.log(this.vendorsArray[i]);
    }
  }

  changeFoodgroup(foodGroup, i){
    this.foodGroupDisable = !this.foodGroupDisable;
    this.foodGroupBtn = 'Ok';
    this.isShowChangesBtn = true;
    if(this.foodGroupDisable){
      this.foodGroupBtn = '&#9998';
      this.vendorsArray[i].foodGroup = foodGroup;
      console.log(this.vendorsArray[i]);
    }
  }

  changeOss(oss, i){
    this.ossDisable = !this.ossDisable;
    this.ossBtn = 'Ok';
    this.isShowChangesBtn = true;
    if(this.ossDisable){
      this.ossBtn = '&#9998';
      this.vendorsArray[i].oss = oss;
      console.log(this.vendorsArray[i]);
    }
  }

  saveChanges(i){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/changeVendorProfile', this.vendorsArray[i], httpOptions).subscribe((data: any) => {
      console.log(this.vendorsArray[i]);
      alert('Changes was successfully saved');
  });

  }

}
