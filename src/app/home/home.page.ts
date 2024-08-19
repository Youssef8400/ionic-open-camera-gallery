import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  photo: SafeResourceUrl | undefined;  // Property to hold the photo URL

  constructor(private sanitizer: DomSanitizer) {}

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      if (image && image.dataUrl) {
        this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.dataUrl);
      } else {
        console.error('No image data returned');
      }
    } catch (error) {
      console.error('Error taking picture', error);
    }
  }
}
