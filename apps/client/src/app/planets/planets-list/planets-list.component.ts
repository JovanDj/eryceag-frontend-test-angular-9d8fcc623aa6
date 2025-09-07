import { Component, inject } from '@angular/core';
import { PlanetsService } from '../planets.service';
import {
  AsyncPipe,
  DecimalPipe,
  NgFor,
  NgIf,
  SlicePipe,
} from '@angular/common';

@Component({
  selector: 'app-planets-list',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, NgIf, NgFor, SlicePipe],
  templateUrl: './planets-list.component.html',
  styleUrl: './planets-list.component.scss',
})
export class PlanetsListComponent {
  readonly #planetsService = inject(PlanetsService);

  protected readonly planets$ = this.#planetsService.getPlanets();
}
