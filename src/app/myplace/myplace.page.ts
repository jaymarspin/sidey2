import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import {PostService} from '../post/post.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-myplace',
  templateUrl: './myplace.page.html',
  styleUrls: ['./myplace.page.scss'],
})
export class MyplacePage implements OnInit {
  user_id:any = 1
  lat:any
  lng:any
  constructor(private geo: Geolocation,private post: PostService,private http: HttpClient, private router: Router) {

    this.geo.getCurrentPosition().then(pos =>{

      
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude
      
      this.firstLoad()
      
       
    }).catch( err => {
      alert("To find the nearest restaurants you must allow this app to access location")
      this.router.navigate(['home']);

    })
   }
  result = []
  role:any
  goToResto(id:any,title:any,address:any,d:any,lat:any,lng:any){
    this.router.navigate(["moderateresto",id,title,address,'admin',d,lat,lng]);
    
  }
  ngOnInit() {

    
    
  }
  firstLoad(){
    let url = this.post.server+"my_places.php"
    let postdata = new FormData();
    this.role = "admin"

    postdata.append('id',this.user_id);
    postdata.append('lat',this.lat);
    postdata.append('lng',this.lng);

    let data:Observable<any> = this.http.post(url,postdata)
    data.subscribe((res) =>{
       for(var i = 0;i < res.length;i++){
        this.result[i] = res[i];
       }
    })
  }
  goback(){
    this.router.navigate(['home']);
  }


}
