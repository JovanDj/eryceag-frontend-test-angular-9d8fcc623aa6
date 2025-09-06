import { Component, inject } from '@angular/core';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-planets-list',
  standalone: true,
  templateUrl: './planets-list.component.html',
  styleUrl: './planets-list.component.scss',
})
export class PlanetsListComponent {
  readonly #planetsService = inject(PlanetsService);

  protected readonly planets$ = this.#planetsService.getPlanets();
}
