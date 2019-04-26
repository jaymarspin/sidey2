import { Component} from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  lat: any;
  long: any;


constructor(public router: Router){

  
}
  

  ngOnInit(){
    
    
  }
  events(){
    this.router.navigate(['home/events']);
  }
  listing(){
    this.router.navigate(['home']);
  }
}
