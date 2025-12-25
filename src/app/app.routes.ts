import { Routes } from '@angular/router';
import { TrainerComponent } from './views/trainer/trainer';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TrainerComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
