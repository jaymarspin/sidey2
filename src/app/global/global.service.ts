import { Injectable } from '@angular/core';
import { ModalController,LoadingController, ToastController } from '@ionic/angular'
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading:any
  modalvar:any
  constructor(private storage: Storage,private alertController: AlertController,public loadingController:LoadingController,public toastController:ToastController,public modal: ModalController,private nativePageTransitions: NativePageTransitions) { }

  async presentAlert(message:any) {
    const alert = await this.alertController.create({
      header: 'Information',
      subHeader: 'We are happy to have you on board!',
      message: message,
      buttons: ['ok']
    });

    await alert.present();
  }
  getStorageLocation():any{
    const lat = this.storage.get('lat');
    const lng = this.storage.get('lng');
    let data = {
      lat: lng,
      lng: lng
    }
    return data
  }
  async presentModal(component:any,data:any,css:any) {
       this.modalvar = await this.modal.create({
      component: component,
      cssClass: css,
       componentProps: data
    });
    
    await this.modalvar.present();
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      
    duration: 3000
    });
    toast.present();
  }
  public async presentLoading(message): Promise<any> {
    this.loading = await this.loadingController.create({
      message: message
    });
    return await this.loading.present();
  }

  leave(){
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 250,
      slowdownfactor: 0,
      slidePixels: 25,
      iosdelay: 0,
      androiddelay: 0,
      fixedPixelsTop: 0,
     
     }
  
  
  this.nativePageTransitions.slide(options)
 
  
  }
  enter(){
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 250,
      slowdownfactor: 0,
      slidePixels: 0,
      iosdelay: 0,
      androiddelay: 0,
      fixedPixelsTop: 0,
      
     }
  
     return this.nativePageTransitions.slide(options)
  }
  numbercheck(rate:any){
    var x = parseInt(rate)
    if(isNaN(x)){
      return false;
    }else return true
     
    
  }
}
