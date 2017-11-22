import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  trials: object;
  patientRecordId: string;
  processButton = false;
  stopTherapyButton = false;
  imagePath: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientRecordId = params['_id'];
      this.http.get('http://localhost:8000/patientRecord/' + this.patientRecordId).subscribe(data => {
        this.trials = data['trials'];
      });
    });
  }

  onUploadFinished(response) {
    this.processButton = true;
    this.imagePath = response.serverResponse['_body'];
  }

  onRemoved() {
    this.processButton = false;
  }

  blueLight() {
    this.http.get('http://localhost:8000/blueLight').subscribe(data1 => {
    });
  }

  stopTherapy() {
    this.stopTherapyButton = false;
    this.http.get('http://localhost:8000/stopTherapy').subscribe(data1 => {
    });
  }

  processImage() {
    this.stopTherapyButton = true;
    this.http.get('http://localhost:8000/processImage?imagePath=' + this.imagePath).subscribe(data1 => {
      this.http.get('http://localhost:8000/calculateWavelength?redValue=' + data1['redValue']).subscribe(data1 => {
        this.route.params.subscribe(params => {
          console.log(params['_id']);
          this.http.get('http://localhost:8000/patient/' + params['_id']).subscribe(data2 => {
            this.http.get('http://localhost:8000/patientRecord/' + data2['patientRecord'][0]).subscribe(data3 => {
              console.log(data3);
            });
          });
        });
      });
    });

    // this.http.get('http://localhost:8000/patientRecord/' + this.patientRecordId).subscribe(data1 => {
    //   console.log(data1['trials'] != null);
    //   if (data1['trials'] != null) {
    //     this.http.get('http://localhost:8000/patient/redValue').subscribe(data2 => {
    //       console.log(data2);
    //       if (data1['trials'].trialNumber == 1) {
    //         this.http.put('http://localhost:8000/patientRecord/' + this.patientRecordId, { trials: [{ trialNumber: 2, redValue: data2['value'], redReduced: data2['value'] - data2['previous'], wavelength: 610 }] }).subscribe(data3 => {
    //           this.http.put('http://localhost:8000/patient/redValue', { previous: data2['value'] }).subscribe(data4 => {
    //           });
    //         });
    //       }
    //       else {
    //         this.http.put('http://localhost:8000/patientRecord/' + this.patientRecordId, { trials: [{ trialNumber: 3, redValue: data2['value'], redReduced: data2['value'] - data2['previous'], wavelength: 610 }] }).subscribe(data3 => {
    //           this.http.put('http://localhost:8000/patient/redValue', { previous: data2['value'] }).subscribe(data4 => {
    //           });
    //         });
    //       }
    //     });
    //   }
    //   else {
    //     this.http.get('http://localhost:8000/patient/redValue').subscribe(data2 => {
    //       this.http.put('http://localhost:8000/patientRecord/' + this.patientRecordId, { trials: [{ trialNumber: 1, redValue: data2['value'], redReduced: 0, wavelength: 610 }] }).subscribe(data3 => {
    //         this.http.put('http://localhost:8000/patient/redValue', { previous: data2['value'] }).subscribe(data4 => {
    //         });
    //       });
    //     });
    //   }
    // });

    this.processButton = false;
  }
}
