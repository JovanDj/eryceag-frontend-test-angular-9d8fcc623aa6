import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./planets/planets.component').then((m) => m.PlanetsComponent),
  },
];
