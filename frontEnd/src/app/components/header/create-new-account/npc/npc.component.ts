import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {

  constructor( private http: HttpClient) { }

  ngOnInit() {
  }

  submit(country, name, organization, mailing, phone, email, password){

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    }; 
    console.log(country, name, organization, mailing, phone, email, password);
    let user = {
      country: country,
      name: name,
      organization: organization,
      mailing: mailing,
      phone: phone,
      email: email,
      password: password,
      role: 'npc'
    };
    this.http.post('http://localhost:3000/npcReg', user, httpOptions).subscribe((data: any) => {
      console.log(data);
      alert('New ' + data.name + ' was registered!');

  });
  };

};
