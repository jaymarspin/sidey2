import { Component, OnInit, ViewChild,Input  } from '@angular/core';
import {PostService} from '../post/post.service'
import { Router } from '@angular/router';
import {MenuController,IonInfiniteScroll, IonVirtualScroll,ModalController,NavController  } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {GlobalService } from '../global/global.service'
 import {CategoryPage} from '../moderate/category/category.page'
 import { ModalmapPage } from '../modalmap/modalmap.page'
 import {ViewmealPage} from '../client/viewmeal/viewmeal.page'

 import * as $ from "jquery";
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  
  list:any
  rate:any
  cat:any
  length:any
  @Input() lat:any
  @Input() lng:any
  pass:any = false
  constructor(private navCtrl:NavController ,private modalCtrl:ModalController,private post: PostService,private menuCtrl: MenuController,private geo: Geolocation,private global: GlobalService,private router: Router) {
    this.rate = 4.5
    this.menuCtrl.enable(true)
    
    this.cat = new Array()
    
         

          
            
        
   }
   async category() {
    
    let data = {
      
    }
    if(this.pass == true && this.cat.length > 0){
      data = {
        selected: this.cat
      }
    }
    const modal = await this.modalCtrl.create({
      component: CategoryPage,
       componentProps: data
    });
    modal.onDidDismiss() 
      .then((data) => {
        const x = data['data'];
        if(x != null)this.cat = x.selected
           
    }).then(() =>{
      this.pass = true
      if(this.cat.length > 0){
        this.length = this.cat.length
        this.firstLoad(this.lat,this.lng,1,this.cat)
      }else{
        this.length = null
      }
    }); 
  
    await modal.present();
  }
  
  
  viewMap(lat:any,lng:any){
    let data = {
      lat: lat,
      long: lng,
      role: "client"
    }
    
   this.global.presentModal(ModalmapPage,data,"")
  }

  goToResto(id:any,title:any,address:any,distance:any,lat:any,lng:any){
  
    this.router.navigate(["moderateresto",id,title,address,'client',distance,lat,lng]);
    
  }
 

  firstLoad(x:any,y:any,pager:any,cat):any{
    let body = {
      lat: x,
      lng: y,
      category: cat,
      page: pager
    }
   
    try{
    this.post.postData(body,"listing.php").subscribe((res:any) =>{
         
        res = res.json()
        this.list = res
        
      
    })
  }catch(e){
    this.global.presentToast(e)
  }
  }



  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
   
    this.firstLoad(this.lat,this.lng,1,this.cat)
    
  }
  viewmeal(id,name,price,img,i,cat){
    
    let data = {
      id: id,
      name: name,
      price: price,
      img: img,

    }
 
    this.global.presentModal(ViewmealPage,data,"")
   
  }
  ionViewDidEnter(){
     
  }
  

  


}
