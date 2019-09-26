import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Injectable } from '@angular/core';
import { Foto } from './foto';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  //The “data” property represents the base64 image data of a captured photo.
  //data: any;

  public fotos: Foto[] = [];

  constructor(private camera: Camera, private storage: Storage) { }

  takePic() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    // no tipo de midia, trocar para "all media" depois

    this.camera.getPicture(options).then(

      (imageData) => {
        //adiciona nova foto à galeria;
        this.fotos.unshift({
          data: 'data:image/jpeg;base64,' + imageData
        });
        //salva as fotos
        this.storage.set('fotos', this.fotos);
      },(error) => {
        console.log("Erro: " + error);
      });
  }

  carregarFotos(){
    this.storage.get('fotos').then(
      (fotos) => {
        this.fotos = fotos || [];
      });
  }
}
