import { Component, OnInit, Input } from '@angular/core';
import {GlobalService } from '../../global/global.service'
import {ModalController, Events,LoadingController} from '@ionic/angular'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import {PostService} from '../../post/post.service'
@Component({
  selector: 'app-makereview',
  templateUrl: './makereview.page.html',
  styleUrls: ['./makereview.page.scss'],
})
export class MakereviewPage implements OnInit {
  @Input('id') id:any
  @Input('name') name:any
  @Input('price') price:any
  @Input('img') img:any
  review:any
  rate:any
  loading:any
  imgsrc:any
  base64:any
  constructor(private post:PostService,private file:File,private loadingController:LoadingController,private webview:WebView,private imagePicker: ImagePicker,private modalCtrl:ModalController,public events: Events,private global: GlobalService) { 
    

  }

  ionViewDidEnter(){
    
    
    this.rate = 5
    
  }

  private async presentLoading(message): Promise<any> {
    this.loading = await this.loadingController.create({
      message: message
    });
    return await this.loading.present();
  }

    pickImage(){
      const options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 5,
      
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
    
      
      // quality of resized image, defaults to 100
      quality: 100,
  
      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
   
  };
      
  
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          var ext = this.webview.convertFileSrc(results[i]).substring(this.webview.convertFileSrc(results[i]).lastIndexOf(".")+1)
          
          if(ext == "jpeg" || ext == "JPEG"){
             alert("png or jpeg is invalid please choose other image!")
          }else if(ext == "jpg" || ext == "JPG" || ext == "png" || ext == "PNG"){
            this.presentLoading("Please Wait")
            this.imgsrc = this.webview.convertFileSrc(results[i]);
            var imagePath = results[i].substr(0, results[i].lastIndexOf('/') + 1);
            var imageName = results[i].substr(results[i].lastIndexOf('/') + 1);
            this.file.readAsDataURL(imagePath, imageName).then((b64str) => {
            this.base64[i] = b64str;
            
          }).catch(err => {
            console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
          })
          
          }
          
        }
        this.loading.dismiss()
        
      }, (err) => {
        console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
      });
    }
  
  addReview(){
    if(this.review == "" || this.review == null){
      alert("Dont Leave a Field Empty")
    }else{
      let data = {
        review: this.review,
        id: this.id,
        user_id: 1

      }
      this.post.postData(data,"food_review.php").subscribe((Response) =>{
        let res = Response.json();
        console.log(res[0].id)
      })

    }
  }


  
  ngOnInit() {
    
  }
  ionViewWillLeave() {
    this.global.leave()
   }
  goback(){
    this.modalCtrl.dismiss()
  }
  onRateChange(event){
  
  }
}
