import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-image-page',
  standalone: true,
  imports: [],
  templateUrl: './image-page.component.html',
  styleUrl: '../cam-page/cam-page.component.css',
})
export class ImagePageComponent {
  constructor(private router: Router) {}
  switchWebcam() {
    this.router.navigate(['/webcam']);
  }
}
