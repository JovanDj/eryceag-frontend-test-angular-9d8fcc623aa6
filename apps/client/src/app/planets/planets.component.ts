import { Component, inject } from '@angular/core';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsService } from './planets.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [PlanetsListComponent, NgIf, AsyncPipe],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
})
export class PlanetsComponent {
  readonly #planetsService = inject(PlanetsService);

  protected readonly planets$ = this.#planetsService.getPlanets();
}
