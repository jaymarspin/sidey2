import { Directive, Input, ElementRef ,Component,Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DomController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  lat: any;
  long: any;


constructor(public router: Router, public geo: Geolocation,private domCtrl: DomController,private renderer: Renderer2){}
  

  ngOnInit(){
    this.geo.getCurrentPosition().then(pos =>{
      this.lat = pos.coords.latitude
      this.long = pos.coords.longitude
      console.log(this.lat+" - "+this.long)
    }).catch( err => console.log(err))
    
  }
  events(){
    this.router.navigate(['home/events']);
  }
  listing(){
    this.router.navigate(['home']);
  }
}
