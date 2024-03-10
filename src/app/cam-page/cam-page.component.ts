import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
import * as faceDetection from '@tensorflow-models/face-detection';

@Component({
  selector: 'app-cam-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cam-page.component.html',
  styleUrl: './cam-page.component.css',
})
export class CamPageComponent {
  constructor(private router: Router) {}

  showVideo: boolean = false;
  videoRef: any;
  stream: MediaStream | null = null;

  modelConfig: any;
  detector: any;
  model: any;
  isLoading: boolean = false;

  canvas: any;
  ctx: any;
  isDetecting: boolean = false;
  intervalId: any;

  errorMessage: string | null = null;

  switchImage() {
    this.router.navigate(['/image']);
  }

  async ngOnInit() {
    await this.createModel();
  }

  async startCamera() {
    this.isLoading = true;
    await this.initCam();
    this.isLoading = false;
    this.showVideo = true;
  }

  async initCam() {
    try {
      this.videoRef = document.getElementById('video');
      this.videoRef.style.transform = 'scaleX(-1)';

      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.stream = stream;
          this.videoRef.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error accessing webcam:', err);
          this.errorMessage =
            'Webcam access error. Check connection and permissions. Stop and Retry.';
        });
    } catch (error) {
      console.error('Error in initCam:', error);
      this.errorMessage =
        'Something went wrong while initializing the webcam. Please stop and retry.';
    }
  }

  async createModel() {
    this.model = await faceDetection.SupportedModels.MediaPipeFaceDetector;

    this.modelConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
    };

    this.detector = await faceDetection.createDetector(
      this.model,
      this.modelConfig
    );
  }

  toggleDetection() {
    console.log(this.isDetecting);
    if (this.isDetecting) {
      // Start detection
      this.intervalId = setInterval(() => {
        this.predictedFaces();
      }, 100);
    } else {
      // Stop detection
      clearInterval(this.intervalId);
    }
  }

  async predictedFaces() {
    if (!this.detector) {
      console.error('Detector is not initialized');
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw the flipped video frame
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(
      this.videoRef,
      -this.canvas.width,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.restore();

    const predictedFaces = await this.detector.estimateFaces(this.videoRef, {
      flipHorizontal: true,
    });

    // Draw bounding boxes and keypoints
    //https://github.com/tensorflow/tfjs-models/tree/master/face-detection
    predictedFaces.forEach(
      (pred: {
        box: { xMin: any; yMin: any; width: any; height: any };
        keypoints: any[];
      }) => {
        // Draw the main face box
        this.ctx.beginPath();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#49ae16';
        this.ctx.rect(
          pred.box.xMin,
          pred.box.yMin,
          pred.box.width,
          pred.box.height
        );
        this.ctx.stroke();

        // Draw landmarks
        this.ctx.fillStyle = 'red';
        pred.keypoints.forEach((keypoint) => {
          this.ctx.fillRect(keypoint.x, keypoint.y, 5, 5);
        });
      }
    );
  }

  stopCamera() {
    window.location.reload();

    //   this.isDetecting = false;
    //   this.toggleDetection;
    //   this.showVideo = false;
    //   if (this.stream) {
    //     this.stream.getTracks().forEach((track) => track.stop());
    //     this.stream = null;
    //     if (this.videoRef) {
    //       this.videoRef.srcObject = null;
    //     }
    //   }
  }
}
