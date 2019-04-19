import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import {NavController, ModalController} from '@ionic/angular'
import leaflet from 'leaflet'
import { AlertController } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { LoadingController } from '@ionic/angular';
 
@Component({
  selector: 'app-modalmap',
  templateUrl: './modalmap.page.html',
  styleUrls: ['./modalmap.page.scss'],
})




export class ModalmapPage {
  lat: any;
  long: any;
  @ViewChild('map') mapContainer: ElementRef
  

  private isloading:boolean = false;
  public loading: any;
  map:any = null
  constructor(public navController: NavController,public geo: Geolocation,public alertController: AlertController,public modalCtrl: ModalController,private loadingCtrl: LoadingController){}
  @Input('lat') r_lat: any
  @Input('long') r_long:any



  private async presentLoading(message): Promise<any> {
    this.loading = await this.loadingCtrl.create({
      message: message
    });
    return await this.loading.present().then(()=> this.isloading = true);
  }


  ionViewDidEnter(){
    
    this.loadmap();
    
    
  }

 
  // async presentAlertConfirm() {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm!',
  //     message: 'Message <strong>text</strong>!!!',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Okay',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }




 

  loadmap(){
    
    var customIcon = leaflet.icon({
      iconUrl: 'https://img.icons8.com/dusk/64/000000/marker.png',
      iconSize: [48, 50]
      });



     this.lat = 6.123961;
      this.long = 125.168949;
    
    
    this.map = leaflet.map('map').setView([this.lat, this.long], 13);
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Restaurant Mapping'
    }).addTo(this.map);




    var marker: any

    var that = this
    
    this.map.locate({
      setView: false


      
    }).on('locationfound', e =>{
      var radius = e.accuracy / 2;
        this.map.addControl(new customControl());
        marker = leaflet.marker(e.latlng,{icon: customIcon,draggable: true,autoPan: true});
        marker.addTo(this.map).bindPopup("You're Current Location").openPopup() 
       
        // marker.on("dragend",function(e){
         
        // })
      
    })
    
    // this.map.on('click', e =>{
    //   var marker = new leaflet.marker(e.latlng,{
    //   icon: customIcon,    
    //   draggable: true,
    //   autoPan: true
    // }).addTo(this.map);

    //     marker.on('dragend', function (e) {
            
    //       });
    //     })



        this.onMapReady(this.map)
        var checkButton = document.createElement("ion-button")
        checkButton.innerHTML = "<ion-icon name='checkmark-circle-outline'></ion-icon>"
        var att2 = document.createAttribute("color"); 
        att2.value = "success"
        checkButton.setAttributeNode(att2)
        var cancelButton = document.createElement("ion-button")
        cancelButton.innerHTML = "<ion-icon name='close-circle-outline'></ion-icon>"
        var att = document.createAttribute("color");       // Create a "class" attribute
        att.value = "danger"; 


        var self = this
        checkButton.onclick = function(e){
            
          var latter = marker.getLatLng()
            self.modalCtrl.dismiss(latter)
        }
        cancelButton.onclick = function(e){
         
            self.modalCtrl.dismiss()
        }







      var customControl:any =  leaflet.Control.extend({
      options: {
        position: 'bottomright'
      },
      onAdd: function (map) {
        var container = leaflet.DomUtil.create('div', );
        cancelButton.setAttributeNode(att)
        checkButton.style.height = "black";
        container.appendChild(checkButton)
        container.appendChild(cancelButton)
        container.style.width = '30px';
        container.style.marginRight = '40px';
        return container;
      }
    });

  } 
  
 




  onMapReady(map: leaflet.Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 150);
 }



}
