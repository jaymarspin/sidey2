import { Component, OnInit, ViewChild  } from '@angular/core';
import {PostService} from '../post/post.service'
import { ActivatedRoute, Router } from '@angular/router';
import {MenuController,IonInfiniteScroll, IonVirtualScroll,ModalController  } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {GlobalService } from '../global/global.service'
import { ModalmapPage } from '../modalmap/modalmap.page'

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  lat:any
  lng:any
  list:any
  constructor(private post: PostService,private activateRoute: ActivatedRoute,private menuCtrl: MenuController,private geo: Geolocation,private global: GlobalService,private router: Router) {
    this.menuCtrl.enable(true)
    this.geo.getCurrentPosition().then(pos =>{
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude

       this.firstLoad(this.lat,this.lng,1)
    }).catch( err => console.log(err))
   }

  //  loadData(event) {
  //   setTimeout(() => {
      
  //     let body = {
  //       lat: this.lat,
  //       lng: this.lng,
  //       page: 2
  //     }

  //     this.post.postData(body,"listing.php").subscribe((res) =>{
  //       for(var i =0;i < res.length;i++){
  //         this.list.push({
  //           "name": res[i].name,
  //           "resto_contact": res[i].name,
  //           "d": res[i].d,
  //           "food": res[i].food
  //         }
  //         );
  //       }
  //   })



  //     event.target.complete();
      

  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
      
  //   }, 0);
  // }

  viewMap(lat:any,lng:any){
    let data = {
      lat: lat,
      long: lng,
      role: "client"
    }
    this.global.presentModal(ModalmapPage,data,"viewmap")
  }

  goToResto(id:any,title:any,address:any){
    this.router.navigate(["moderateresto",id,title,address]);
    
  }
  

  firstLoad(x:any,y:any,pager:any):any{
    let body = {
      lat: x,
      lng: y,
      page: pager
    }
    var arr:any
    this.post.postData(body,"listing.php").subscribe((res) =>{
        // console.log(res)
        this.list = res
    })
    
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
    

  }

  ionViewDidEnter(){
    
    
    
    
  }


}
