import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//import { Router } from '@angular/router';
import{UserService} from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model={
    email:'',
    password:''
  }

  constructor(public userservice:UserService) { }

  ngOnInit(): void {
  }
  logindata(f:NgForm)
  {
    console.log(f.value);
    this.userservice.login(f.value).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);

    })
  }

}
