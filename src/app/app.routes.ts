import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CamPageComponent } from './cam-page/cam-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cam',
    component: CamPageComponent,
  },
];
