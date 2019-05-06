import { Component, OnInit, Input  } from '@angular/core';
import {ModalController, Events} from '@ionic/angular'
import {GlobalService } from '../../global/global.service'
import {PostService} from '../../post/post.service'
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  rate:any
  @Input('id') id:any
  @Input('name') name:any
  @Input('price') price:any
  @Input('img') img:any
  @Input('img') cat:any
  list:any
  samplepic:any = "https://www.advocate.com/sites/advocate.com/files/2018/01/31/im-fine-750x_1.jpg"
  constructor(private post: PostService,private modalCtrl:ModalController,public events: Events,private global: GlobalService) { 
    this.list = new Array();
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.rate = (4.5)
    let body = {
      id: this.id,
      cat: this.cat
    }
    this.post.postData(body,"get_review.php").subscribe((Response) => {
      console.log(Response)
      let res = Response.json()
      this.list = res
      
    },(err) => {
      this.global.presentToast(err)
    },() =>{
      
    })
    
  }
  ionViewWillLeave() {
    this.global.leave()
   }
  goback(){
    this.modalCtrl.dismiss()
  }
  onRateChange(event){
    alert(event)
  }
}
