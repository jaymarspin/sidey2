import { Component, OnInit } from '@angular/core';
import {PostService} from '../post/post.service'
import { ModalController,ToastController } from '@ionic/angular'
import { ModalmapPage } from '../modalmap/modalmap.page'
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.page.html',
  styleUrls: ['./place-add.page.scss'],

})
export class PlaceAddPage implements OnInit {

  restaurant: any;
  address: any;
  contact: any;
  constructor(public post: PostService,public modal: ModalController, public nativeCoder: NativeGeocoder,private toastController: ToastController,private router: Router,public loadingController: LoadingController) { }
  lat: any;
  long: any;
  latlng: any
  administrative: any
  private loading: any;

  private async presentLoading(message): Promise<any> {
    this.loading = await this.loadingController.create({
      message: message
    });
    return await this.loading.present();
  }
  ngOnInit() {
    
        
  }
  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000
    });
    toast.present();
  }
  
  placeadd(){
    let body = {
      restaurant: this.restaurant,
      address: this.address,
      contact: this.contact,
      lat: this.lat,
      lng: this.long
    } 
     
     
    this.post.postData(body,'add_resto.php').subscribe((Response)=>{
      this.presentLoading("uploading... please wait").then((data) =>{
        if(Response.message == "success"){
          this.loading.dismiss().then(() =>{
            this.router.navigate(['moderateresto']);
          });
          
          
        }else{
          this.loading.dismiss().then(() =>{
            this.presentToast('Error Occured. Try Again Later');
          });
          
        }  
      })
      
           
    })
  }
  goback(){
    this.router.navigate(['home']);
  }
  async presentModal() {
    const modal = await this.modal.create({
      component: ModalmapPage,
       componentProps: { 
         latt: this.lat,
         longg: this.long
       }
    });
    modal.onDidDismiss() 
      .then((data) => {

        const pos = data['data']; 
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
      };
        this.lat = pos.lat
        this.long = pos.lng
      this.nativeCoder.reverseGeocode(pos.lat, pos.lng, options)
      .then((result) => this.administrative = "Within "+result[0].locality)
      .catch((error: any) => alert(error));
    });
    await modal.present();
  }


}
