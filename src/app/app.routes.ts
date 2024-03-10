import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CamPageComponent } from './cam-page/cam-page.component';
import { ImagePageComponent } from './image-page/image-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'webcam',
    component: CamPageComponent,
  },
  {
    path: 'image',
    component: ImagePageComponent,
  },
];
