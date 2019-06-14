import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIserviceService } from 'src/app/services/apiservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-npc-profile',
  templateUrl: './npc-profile.component.html',
  styleUrls: ['./npc-profile.component.css']
})
export class NpcProfileComponent implements OnInit {

  constructor(private http: HttpClient, private HTTP: APIserviceService, private _snackBar: MatSnackBar,) { }

  ngOnInit() {
    const userEmail = { email : localStorage.getItem('userName')};   
    this.HTTP.viewProfile(localStorage.getItem('userName')).subscribe((data: any) => {      
      this.user.name = data.user.name;
      this.user.email = data.user.email;
      this.user.country = data.user.country;
      this.user.phone = data.user.phone;  
      this.user.organization = data.user.organization;   
    });
  }

  //-----------NEW USER---------------
  user = {
    name: '',
    email: '',
    country: '',
    phone: '', 
    password: '',
    organization: '',
  };
  //----------------------------------  

  //disables--------------  //
  disableName     = true;   //
  disableEmail    = true;   //
  disableCountry  = true;   //
  disablePhone    = true;   // 
  disablePasswordFields = false;    
  //------------------------//

  //ngIf----------------------- //
  confirmNameBtn      = false;  //
  confirmEmailBtn     = false;  //
  confirmCountryBtn   = false;  //
  confirmPhoneBtn     = false;  //  
  saveChangesBtn      = false;  // 
  changePasswordBtn   = false;  //
  //----------------------------//

 

  //********************************************FUNCTIONS**************************************** */

  //---------NAME-----------------//
  changeName(){                   //
    this.confirmNameBtn = true;   //
    this.disableName    = false;  //
    this.saveChangesBtn = true;   //
  }                               //
  confirmNameChanges(newName){    //
    this.confirmNameBtn = false;  //
    this.disableName    = true;   //    
    this.user.name = newName;     //
  }                               //
  //------------------------------//

  //---------EMAIL----------------//
  changeEmail(){                  //
    this.confirmEmailBtn  = true; //
    this.disableEmail     = false;//
    this.saveChangesBtn   = true; //
  }                               //
  confirmEmailChanges(newEmail){  //
    this.confirmEmailBtn  = false;//
    this.disableEmail     = true; //    
    this.user.email = newEmail;   //
  }                               //
  //------------------------------//

  //----------COUNTRY---------------//
  changeCountry(){                  //
    this.disableCountry     = false;//
    this.confirmCountryBtn  = true; //
    this.saveChangesBtn     = true; //
  }                                 //
  confirmCountryChanges(newCountry){//
    this.disableCountry     = true; //
    this.confirmCountryBtn  = false;//   
    this.user.country = newCountry; //
  }                                 //    
  //------------------------------- //

  //--------PHONE----------------//
  changePhone(){                 //
    this.disablePhone    = false;//
    this.confirmPhoneBtn = true; //
    this.saveChangesBtn  = true; //
  }                              //
  confirmPhoneChanges(newPhone){ //
    this.disablePhone    = true; //
    this.confirmPhoneBtn = false;//   
    this.user.phone = newPhone;  //
  }                              //   
  //-----------------------------//

  //--------PASSWORD------------------//

  acceptNewPassword(password_1, password_2){    
    this.disablePasswordFields = true;          
      if((password_1 == password_2) && (password_1 == '')){        
        delete this.user.password;        
      }
     else if((password_1 == password_2) && (password_1 !== '')){  
      this.user.password = password_1;        
    }
  }

  changePassword(){
    this.changePasswordBtn = true;
    this.saveChangesBtn  = true;    
  }
  //----------------------------------//    

  saveChanges(){
    if(this.user.password == ''){
      delete this.user.password;
    }        
    
    this.HTTP.changeProfile(this.user).subscribe((data: any) => {
        if(data){
          this._snackBar.open('Data was successfully changed','', {
            duration: 2000,
          }); 
        }
    });

  }

}
