import { Component, OnInit, Input,ErrorHandler } from '@angular/core';
import {GlobalService } from '../../global/global.service'
import {ModalController, Events} from '@ionic/angular'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import {PostService} from '../../post/post.service'
import { Base64 } from '@ionic-native/base64/ngx';
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
  @Input('img') cat:any

  review:any
  rate:any
  loading:any
  imgsrc:any
  imgsrctmp:any
  base64:any
  ress:any
  constructor(private base: Base64,private post:PostService,private file:File,private webview:WebView,private imagePicker: ImagePicker,private modalCtrl:ModalController,public events: Events,private global: GlobalService) { 
    this.imgsrc = new Array()
    this.imgsrctmp = new Array()
    this.base64 = new Array()
  
    
  
  }
  handleError(error: any): void {
    alert(error)
  }

  ionViewDidEnter(){
    this.rate = 5
    
    
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

 
    
   
    //here 
  
  
      this.imagePicker.getPictures(options).then((results) => {
        
        let tmp = results.length + this.imgsrc.length
        if(tmp > 5){
          this.global.presentToast("Only 5 images allowed");
        }else{
          
          for (var i = 0; i < results.length; i++) {
            this.imgsrctmp.push(results[i])
            this.imgsrc.push(this.webview.convertFileSrc(results[i]))
           // var ext = this.webview.convertFileSrc(results[i]).substring(this.webview.convertFileSrc(results[i]).lastIndexOf(".")+1)
           this.base.encodeFile(this.imgsrctmp[i]).then((base64File: string) => {
            
            this.base64.push(base64File)
            
          }, (err) => {
            console.log(err);
          })
           
         }
        }
        // this.loading.dismiss()
        
      }, (err) => {
        alert('readAsDataURL failed: (' + err.code + ")" + err.message);
      })
    }

    remove(i:any){
      this.imgsrctmp.splice(i, 1)
      this.imgsrc.splice(i, 1)
      this.base64.splice(i, 1)
    }
  
  addReview(){
    if(this.review == "" || this.review == null){
      alert("Dont Leave a Field Empty")
    }else{
        this.global.presentLoading("Submitting").then(() =>{
        if(this.base64.length == 0){
          this.base64.push("none");
        }
        let data = {
          review: this.review,
          rate: this.rate,
          id: this.id,
          user_id: 1,
          imgs: this.base64,
          cat: this.cat
        }
        
        this.post.postData(data,"food_review.php").subscribe((Response) =>{
          
          let res = Response.json();
          this.ress = res
          if(this.ress.message = "success"){
            this.modalCtrl.dismiss()
            this.global.presentToast("Success you've earn 50 points")
          }else{
            this.global.presentToast("Error Occured")
          }
       },(err)=>{
          this.global.loading.dismiss();
          
          this.global.presentToast(err)
          },() =>{
            this.global.loading.dismiss();
            
          })
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
    this.rate = event;
  }
}
