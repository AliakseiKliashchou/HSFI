import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fao',
  templateUrl: './fao.component.html',
  styleUrls: ['./fao.component.css']
})
export class FaoComponent implements OnInit {

  constructor( private http: HttpClient) { }

  ngOnInit() {
  }
  
  submit(name, office, phone, email, password){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    }; 
    console.log(name, office, phone, email, password);
    let user = {
      role: 'fao',
      name: name,
      office: office,
      phone: phone,
      email: email,
      password: password
    };
    this.http.post('http://localhost:3000/faoReg', user, httpOptions).subscribe((data: any) => {
      console.log(data);
    });

  }

}
