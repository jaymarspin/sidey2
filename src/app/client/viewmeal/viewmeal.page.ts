import { Component, OnInit, Input } from '@angular/core';
import {PostService} from '../../post/post.service'
import {GlobalService } from '../../global/global.service'
import {ReviewsPage} from '../reviews/reviews.page'
import {MakereviewPage} from '../makereview/makereview.page'

@Component({
  selector: 'app-viewmeal',
  templateUrl: './viewmeal.page.html',
  styleUrls: ['./viewmeal.page.scss'],
})
export class ViewmealPage implements OnInit {
  @Input('id') id:any
  @Input('name') name:any
  @Input('price') price:any
  @Input('img') img:any
  @Input('cat') cat:any
  imgsrc:any

  constructor(private post:PostService,private global: GlobalService) {
    

   }
   ionViewWillLeave() {
    this.global.leave()
   }
   ionDidViewEnter(){
     
   }

  ngOnInit() {
    
    this.imgsrc = this.post.server+this.img
  }
  viewreviews(id){
    let data = {

    }
    this.global.presentModal(ReviewsPage,data,"");
  }

  makereviews(id,name,price){
    let data = {
      id: id,
      img: this.imgsrc,
      name: name,
      price: price,
      cat: this.cat
    }
    this.global.presentModal(MakereviewPage,data,"");
  }

}
