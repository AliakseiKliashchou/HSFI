import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  toppings = new FormControl();
  toppingList: string[] = ['Vendor registration', 'Scratch card desk', 'Hotline', 'Inspection'];

  submit(country, name, organization, email, password, task){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    
    console.log(country, name, organization, email, password, task);
    const user = {
      role: 'operator',
      country: country,
      name: name,
      organization: organization,
      email: email,
      password: password,
      task: task,
    };
    this.http.post('http://localhost:3000/operatorReg', user, httpOptions).subscribe((data: any) => {
      console.log(data);
      alert('New ' + data.name + ' was registered!');
    });
  }

  
  

}
