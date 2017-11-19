import { Component } from '@angular/core';

import { WebCamComponent } from 'ack-angular-webcam';
import { Http, Request } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  webcam: WebCamComponent//will be populated by <ack-webcam [(ref)]="webcam">
  base64

  constructor(public http: Http) { }

  genBase64() {
    this.webcam.getBase64()
      .then(base => this.base64 = base)
      .catch(e => console.error(e))
  }

  //get HTML5 FormData object and pretend to post to server
  genPostData() {
    this.webcam.captureAsFormData({ fileName: 'image.jpg' })
      .then(formData => this.postFormData(formData))
      .catch(e => console.error(e))
  }

  //a pretend process that would post the webcam photo taken
  postFormData(formData) {
    const config = {
      method: "post",
      url: "http://localhost:8000/patientRecord/addImage",
      body: formData
    }

    const request = new Request(config)

    return this.http.request(request)
  }

  onCamError(err) { }

  onCamSuccess() { }
}