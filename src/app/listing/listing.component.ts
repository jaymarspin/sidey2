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
  mealsList:any
  beverages:any
  desserts:any
  
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
        
        console.log(res)
        res = res.json()
        this.list = res
        this.mealsList = new Array(this.list.length);
        this.beverages = new Array(this.list.length);
        this.desserts = new Array(this.list.length);
      
    })
  }catch(e){
    this.global.presentToast(e)
  }
  }


  category(category,i,index,count){
    let pass:any = false
    
    let body = {
      role: category,
      id: i
      
    }
    let tmplist = new Array()
    
    if(count > 0){
      switch(category){
        case "meal":
        if(this.list[index].fetch_food == true){
       
            this.list[index].food = this.mealsList[index]
       
        }else pass = true;
          break;
        case "beverages":
        if(this.list[index].fetch_beverages == true){
         
            this.list[index].food = this.beverages[index]
          
        }else pass = true;
          break;
        case "desserts":
        if(this.list[index].fetch_desert == true){
          
            this.list[index].food = this.desserts[index]
         
        }else pass = true;
        
        
          break;
      }
      if(pass == true){
        this.post.postData(body,"get_food.php").subscribe((Response) => {
          let data = Response.json();
      
          for(var i = 0;i < data.length; i++){
             tmplist.push(data[i]);
            } 
            
        },(err) => {
          this.global.presentToast(err)
         },()=>{
          
          switch(category){
            case "meal":
            this.mealsList[index] = tmplist
            
            this.list[index].fetch_food = true
           
            
         
              this.list[index].food = this.mealsList[index]
         
            
              break;
            case "beverages":
            this.beverages[index] = tmplist
            this.list[index].fetch_beverages = true
            
            
              this.list[index].food = this.beverages[index]
        
            
              break;
            case "desserts":
            
            this.desserts[index] = tmplist
            
            this.list[index].fetch_desert = true
           
              this.list[index].food = this.desserts[index]
     
            
              break;
          }
     
          
         
         }) 
      }
      
     
       }
   
  }
  

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
    
    
  }
  viewmeal(id,name,price,img,i,cat){
    let data = {
      id: id,
      name: name,
      price: price,
      img: img,
      cat: cat
    }


    this.global.presentModal(ViewmealPage,data,"")
  }
  

  


}
