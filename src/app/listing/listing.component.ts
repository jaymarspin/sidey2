import { Component, OnInit, ViewChild  } from '@angular/core';
import {PostService} from '../post/post.service'
import { ActivatedRoute, Router } from '@angular/router';
import {MenuController,IonInfiniteScroll, IonVirtualScroll,ModalController  } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {GlobalService } from '../global/global.service'
import { ModalmapPage } from '../modalmap/modalmap.page'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {ViewmealPage} from '../client/viewmeal/viewmeal.page'

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
  tlist:any
  
  constructor(private androidPermissions: AndroidPermissions,private post: PostService,private activateRoute: ActivatedRoute,private menuCtrl: MenuController,private geo: Geolocation,private global: GlobalService,private router: Router) {
    this.menuCtrl.enable(true)
    
    
    
 
          this.geo.getCurrentPosition().then(pos =>{

      
            this.lat = pos.coords.latitude
            this.lng = pos.coords.longitude
        
            
             this.firstLoad(this.lat,this.lng,1)
          }).catch( err => {
            alert("To find the nearest restaurants you must allow this app to access location")
            this.router.navigate(['home']);
      
          })
            
        
  
    
    
    
    
    
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
    this.global.presentModal(ModalmapPage,data,"")
  }

  goToResto(id:any,title:any,address:any){
    this.router.navigate(["moderateresto",id,title,address,'client']);
    
  }
 

  firstLoad(x:any,y:any,pager:any):any{
    let body = {
      lat: x,
      lng: y,
      page: pager
    }
    var arr:any
    try{
    this.post.postData(body,"listing.php").subscribe((res:any) =>{
        // console.log(res)
        res = res.json()
        this.list = res
        this.tlist = Object.assign({}, res);
        this.tlist =JSON.parse(JSON.stringify(res))

      
        
    })
  }catch(e){
    this.global.presentToast(e)
  }
  }


  category(category,i,index){
    let pass:any = false
    let body = {
      role: category,
      id: i
      
    }
    let tmp:any
    
    switch(category){
      
      case "meal":
      
      if(this.tlist[index].fetch_food == false){
        pass = true
      }else{
        this.list[index].food.splice(0)
        tmp = [0,parseInt(this.tlist[index].meal_count) - 1]

        
          for(var z = 0;z < this.tlist[index].food.length;z++){
            
            if(z < tmp[1] + 1){
              
              this.list[index].food.push(this.tlist[index].food[z])
            }
          }
      }
        break;
      case "beverages":
      if(this.tlist[index].fetch_beverages == false){
        pass = true
      }else{
        

        this.list[index].food.splice(0)
        
        tmp = [parseInt(this.tlist[index].meal_count) - 1,(parseInt(this.tlist[index].meal_count) - 1)+parseInt(this.tlist[index].beverages_count)]
        
          for(var z = 0;z < this.tlist[index].food.length;z++){
            
            if(z > tmp[0]){
              
              this.list[index].food.push(this.tlist[index].food[z])
            }
          }
      }
        break;
     }
     
    if(pass == true){
      this.post.postData(body,"get_food.php").subscribe((Response) => {
        let data = Response.json();
    
        for(var i = 0;i < data.length; i++){
            this.tlist[index].food.push(data[i]);
          } 
          
         
       },(err) => {
        this.global.presentToast(err)
       },()=>{
        this.list[index].food.splice(0)
         switch(category){
          case "meal":
          
          this.tlist[index].fetch_food = true;
          
            break;
          case "beverages":
          
          
          
          for(var z = 0;z < this.tlist[index].food.length;z++){
            if(z > parseInt(this.tlist[index].meal_count) - 1){
              
              this.list[index].food.push(this.tlist[index].food[z])
            }
            
            
          }
          this.tlist[index].fetch_beverages = true;
            break;
         }
       
       }) 
    }
   
   
  }
  

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
    
    
  }
  viewmeal(id,name,price,img,i){
    let data = {
      id: id,
      name: name,
      price: price,
      img: img
    }

    
    this.global.presentModal(ViewmealPage,data,"")
  }
  

  


}
