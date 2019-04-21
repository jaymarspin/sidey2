import { Component, OnInit } from '@angular/core';
import {PostService} from '../post/post.service'
import { ActivatedRoute } from '@angular/router';
import {MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  lat:any
  lng:any
  constructor(private post: PostService,private activateRoute: ActivatedRoute,private menuCtrl: MenuController,private geo: Geolocation) {
    this.menuCtrl.enable(true)
    this.geo.getCurrentPosition().then(pos =>{
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude
      console.log(this.lat+"-"+this.lng)
      let body = {
        lat: this.lat,
        lng: this.lng
      }
      this.post.postData(body,"listing.php").subscribe((res) =>{
          console.log(res)
      })
    }).catch( err => console.log(err))
   }

  ngOnInit() {
    

  }

  ionViewDidEnter(){
    
    
    
    
  }


}
