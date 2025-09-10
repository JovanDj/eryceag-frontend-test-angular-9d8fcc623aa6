import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./planets/planets.component').then((m) => m.PlanetsComponent),
  },
  {
    path: 'planets/:id',
    loadComponent: () =>
      import('./planets/planet-detail/planet-detail.component').then(
        (m) => m.PlanetDetailComponent
      ),
  },
];
