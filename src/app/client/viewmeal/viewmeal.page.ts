import { Component, OnInit } from '@angular/core';
import {PostService} from '../../post/post.service'
import {GlobalService } from '../../global/global.service'
import {ReviewsPage} from '../reviews/reviews.page'
import {MakereviewPage} from '../makereview/makereview.page'
 
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-viewmeal',
  templateUrl: './viewmeal.page.html',
  styleUrls: ['./viewmeal.page.scss'],
})
export class ViewmealPage implements OnInit {
 
  id:any
  name:any
  price:any
  img:any
 

  constructor(private activateRoute:ActivatedRoute,private post:PostService,private global: GlobalService,private router: Router) {
    //'viewmeal/:id/:name/:price/:img'
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    this.name = this.activateRoute.snapshot.paramMap.get("name")
    this.price = this.activateRoute.snapshot.paramMap.get("price")
    this.img = this.activateRoute.snapshot.paramMap.get("img")
   }
   ionViewWillLeave() {
    this.global.leave()
   }
   ionDidViewEnter(){
     
   }

  ngOnInit() {
    
    this.img = this.post.server+this.img
  }
  viewreviews(id){
    let data = {
      id: this.id,
      img: this.img,
      name: this.name,
      price: this.price,
    
    }
    this.global.presentModal(ReviewsPage,data,"");
  }

  makereviews(id,name,price){
    let data = {
      id: id,
      img: this.img,
      name: name,
      price: price,
      
    }
    this.global.presentModal(MakereviewPage,data,"");
  }
  goback(){
    
  }

}
