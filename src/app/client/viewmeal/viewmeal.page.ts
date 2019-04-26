import { Component, OnInit, Input } from '@angular/core';
import {PostService} from '../../post/post.service'
import {GlobalService } from '../../global/global.service'
import {ReviewsPage} from '../reviews/reviews.page'


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
  imgsrc:any

  constructor(private post:PostService,private global: GlobalService) {
    

   }
   ionViewWillLeave() {
    this.global.leave()
   }
   

  ngOnInit() {
    this.imgsrc = this.post.server+this.img
  }
  viewreviews(id){
    let data = {

    }
    this.global.presentModal(ReviewsPage,data,"");
  }

}
