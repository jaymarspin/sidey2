import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
username;
password;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  signin(){
    
    this.router.navigate(['home']);
    
  }

}
