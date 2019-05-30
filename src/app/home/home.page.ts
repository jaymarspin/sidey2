import { Component} from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import * as $ from "jquery";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  lat: any;
  lng: any;
  duration:any = 300
mes = "1233"

constructor(private storage: Storage,private geo:Geolocation,private navCtrl: NavController,private platform: Platform,public router: Router,private statusBar: StatusBar,private androidFullScreen: AndroidFullScreen){
  this.geo.getCurrentPosition().then(pos =>{
    this.lat = pos.coords.latitude
    this.lng = pos.coords.longitude
 
  }).catch( err => {
    alert("To find the nearest restaurants you must allow this app to access location")
    this.router.navigate(['home']);

  })
  
}
  

  ngOnInit(){
    this.androidFullScreen.isImmersiveModeSupported()
    .then(() => {
      this.androidFullScreen.showSystemUI()
    })
    
    this.statusBar.overlaysWebView(true);

// set status bar to white
    this.statusBar.backgroundColorByHexString('#ba8c16');
  }
  events(){
    $(".tabs, .first").fadeOut(0)
    $(".events").fadeIn(200)
  }
  listing(){
    
    $(".tabs").fadeOut(0)
    $(".listing").fadeIn(this.duration)
  }

  ionViewDidEnter(){
    $(".tabs").fadeOut(0)
    $(".listing").fadeIn(this.duration)
    
    // this.navCtrl.back()
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   alert("yeah")
    // });
  }
  ionViewWillLeave() {
    // this.androidFullScreen.isImmersiveModeSupported()
    // .then(() => this.androidFullScreen.showSystemUI())
    // .catch(err => console.log(err)); 
 
    
   }
   
}
