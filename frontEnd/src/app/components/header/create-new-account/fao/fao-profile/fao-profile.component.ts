import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fao-profile',
  templateUrl: './fao-profile.component.html',
  styleUrls: ['./fao-profile.component.css']
})
export class FaoProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const userEmail = { email : localStorage.getItem('userName')};    
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/changeProfile', userEmail, httpOptions).subscribe((data: any) => {
      console.log(data.user.name);
      this.user.name = data.user.name;
      this.user.email = data.user.email;
      this.user.country = data.user.country;
      this.user.phone = data.user.phone;
      this.user.password = data.user.password;
    });
  }

   //-----------NEW USER---------------
   user = {
    name: '',
    email: '',
    country: '',
    phone: '',
    password: '',
  };
  //----------------------------------
  

  //disables--------------  //
  disableName     = true;   //
  disableEmail    = true;   //
  disableCountry  = true;   //
  disablePhone    = true;   //
  disablePassword = true;   //
  //------------------------//

  //ngIf----------------------- //
  confirmNameBtn      = false;  //
  confirmEmailBtn     = false;  //
  confirmCountryBtn   = false;  //
  confirmPhoneBtn     = false;  //
  confirmPasswordBtn  = false;  //
  saveChangesBtn      = false;  //
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
    console.log(newName);         //
    this.user.name = newName;  //
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
    console.log(newEmail);        //
    this.user.email = newEmail;//
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
    console.log(newCountry);        //
    this.user.country = newCountry;//
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
    console.log(newPhone);       //
    this.user.phone = newPhone;//
  }                              //   
  //-----------------------------//

  //--------PASSWORD------------------//
  changePassword(){                   //
    this.disablePassword = false;     //
    this.confirmPasswordBtn  = true;  //
    this.saveChangesBtn  = true;      //
  }                                   //
  confirmPasswordChanges(newPassword){//
    this.disablePassword = true;      //
    this.confirmPasswordBtn  = false; //
    console.log(newPassword);         //
    this.user.password = newPassword;//
  }                                   //
  //----------------------------------//     

  saveChanges(){
    console.log(this.user);
  }

}
