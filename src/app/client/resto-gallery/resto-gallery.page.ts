import { Component, OnInit, Input } from '@angular/core';
import {ModalController } from '@ionic/angular'
import {PostService} from '../../post/post.service'
import {GlobalService } from '../../global/global.service'
@Component({
  selector: 'app-resto-gallery',
  templateUrl: './resto-gallery.page.html',
  styleUrls: ['./resto-gallery.page.scss'],
})
export class RestoGalleryPage implements OnInit {
  @Input('role') role:any
  @Input('id') id:any
  customers:any
  restaurant:any
  all:any
  imgholder:any
  constructor(private global: GlobalService,private post: PostService,private modalCtrl:ModalController) {
    this.customers = new Array()
    this.restaurant = new Array()
    this.all = new Array()
    this.imgholder = new Array()
   }

  ngOnInit() {
  }

ionViewDidEnter(){
    
  this.getPhotos()
    
  }
  customersImage(){
    this.imgholder = this.all.customers
  }
  restaurantImage(){
    this.imgholder = this.all.restaurant
  }
  allImage(){

  }
getPhotos(){
   
  let data = {
    role: this.role,
    id: this.id
  }
  
  this.post.postData(data,"get_album.php").subscribe((Response) =>{
    let res = Response.json()
    this.all = res[0]
  },(e)=>{

  },()=>{

  })
  
}
  goback(){
    this.modalCtrl.dismiss()
  }
  ionViewWillLeave(){
    this.global.leave()
   }

}
