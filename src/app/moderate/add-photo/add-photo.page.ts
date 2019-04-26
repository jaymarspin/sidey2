import { Component, OnInit,Input } from '@angular/core';
import {ModalController,ToastController,LoadingController} from '@ionic/angular'
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs/observable'
import { HttpClient } from '@angular/common/http'
import {PostService} from '../../post/post.service'
@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage implements OnInit {
  imgsrc:string
  base64:any
  loading:any
  @Input('id') id
  constructor(private post: PostService,private loadingController:LoadingController,private modalCtrl: ModalController,private imagePicker: ImagePicker,private webview:WebView,private file:File,private camera:Camera,private http:HttpClient,private toastController:ToastController) {

    this.imgsrc = "assets/icon/eating.png"
   }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss()
  }

  private async presentLoading(message): Promise<any> {
    this.loading = await this.loadingController.create({
      message: message
    });
    return await this.loading.present();
  }
  pickImage(){
    let options = {
      title: "Select picture",
      message: 'Select min 1',
      outType: 0,
      maximumImagesCount: 1,
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
          this.base64 = b64str;
          this.loading.dismiss()
        }).catch(err => {
          
          console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
        })
        
        }
        
      }
      
    }, (err) => {
      console.log('readAsDataURL failed: (' + err.code + ")" + err.message);
      
    });
  }
  takeAPic(){
    const options: CameraOptions = {
      quality: 100,
      
      saveToPhotoAlbum: true,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI
      }
      this.camera.getPicture(options).then((imageData) => {
        
        let filename = imageData.substring(imageData.lastIndexOf('/')+1);
        let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
        
             this.file.readAsDataURL(path, filename).then(res=> {
              this.imgsrc = res
              this.base64 = res
           
             });
    }).catch((err)=>{alert(err)})
    
    
  }
  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000
    });
    toast.present();
  }

  addFood(){
    let url = this.post.server+"add_photo.php"
     if(this.imgsrc != "assets/icon/eating.png"){
      let postdata = new FormData();
      this.base64 = 'data:image/jpeg;base64,' + this.base64;
      postdata.append('file',this.base64);
      postdata.append('id',this.id);
      let data:Observable<any> = this.http.post(url,postdata)
      data.subscribe((res) =>{
       if(res[0].message == "success"){
        this.modalCtrl.dismiss()
        this.presentToast("success");
       }else this.presentToast("Error Occured");
    })
    }else{
      this.presentToast("Choose a photo first");
    }
    

    
  }
}
