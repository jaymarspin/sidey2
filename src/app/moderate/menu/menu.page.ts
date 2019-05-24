import { Component, OnInit,Input } from '@angular/core';
import {ModalController } from '@ionic/angular'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {GlobalService} from '../../global/global.service'
import { Base64 } from '@ionic-native/base64/ngx';
import {PostService} from '../../post/post.service'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  imgsrc:any
  imgsrctmp:any
  base64:any
  ress:any
  @Input('id') id
  constructor(private post: PostService,private base:Base64,private global:GlobalService,private webview:WebView,private imagePicker:ImagePicker,private modalCtrl:ModalController) {
    this.imgsrc = new Array()
    this.imgsrctmp = new Array()
    this.base64 = new Array()


   }

  ngOnInit() {
  }
  remove(i:any){
    this.imgsrctmp.splice(i, 1)
    this.imgsrc.splice(i, 1)
    this.base64.splice(i, 1)
  }
  addMenu(){
    
    let data = {
      id: this.id,
      imgs: this.base64
    }
    this.post.postData(data,"add_menu.php").subscribe((Response) =>{
      console.log(Response)
    })
  }
  pickImage(){
    const options = {
    // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    maximumImagesCount: 10,
    
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
      if(results.length > 0){
        this.global.presentLoading("Please Wait").then(() =>{
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
            this.global.loading.dismiss()
          })
      }
      
        
      },(err)=>{
        console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
      })
      
 
    }

  goback(){
    this.modalCtrl.dismiss()
  }

}
