import { Injectable } from '@angular/core';
import { ModalController,LoadingController, ToastController } from '@ionic/angular'
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loading:any
  modals:any
  constructor(public loadingController:LoadingController,public toastController:ToastController,public modal: ModalController,private nativePageTransitions: NativePageTransitions) { }


  async presentModal(component:any,data:any,css:any) {
     this.modals = await this.modal.create({
      component: component,
      cssClass: css,
       componentProps: data
    });
    
    await this.modals.present();
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
      duration: 350,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
     }
  
  
  return this.nativePageTransitions.slide(options)
     
  
  }
  enter(){
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 350,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
     }
     return this.nativePageTransitions.slide(options)
  }
}
