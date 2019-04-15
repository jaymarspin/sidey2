import { Component, OnInit } from '@angular/core';
import {PostService} from '../post/post.service'
import { ModalController,ToastController,NavController } from '@ionic/angular'
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
  constructor(public post: PostService,public modal: ModalController,public navCtrl: NavController, public nativeCoder: NativeGeocoder,private toastController: ToastController,private router: Router,public loadingController: LoadingController) { }
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
      lng: this.long,
      string_address: this.administrative
    } 
     
     try{
      this.post.postData(body,'add_resto.php').subscribe((Response)=>{
        console.log(Response)
        this.presentLoading("uploading... please wait").then(() =>{
          if(Response[0].message == "success"){
            this.loading.dismiss().then(() =>{
              this.router.navigate(["moderateresto",Response[0].id,Response[0].title,Response[0].string_address]);
              
            });
              }else{
            this.loading.dismiss().then(() =>{
              this.presentToast('Error Occured! Try again later');
            });
            
          }  
        })
        
              
      })
     }catch(e){
      this.presentToast('Server Error! Try again later');
     }
    
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
      .then((result) => this.administrative = result[0].locality+", "+result[0].subLocality)
      .catch((error: any) => {
        this.administrative = "General Santos City"
        alert(error)
      });
    });
    await modal.present();
  }


}
