import { Component, inject } from '@angular/core';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsService } from './planets.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { combineLatestWith, map } from 'rxjs';
import { ViewModeService } from '../view-mode.service';
import { PlanetsGridComponent } from './planets-grid/planets-grid.component';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [PlanetsListComponent, PlanetsGridComponent, NgIf, AsyncPipe],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
})
export class PlanetsComponent {
  readonly #planetsService = inject(PlanetsService);
  readonly #viewModeService = inject(ViewModeService);

  protected readonly vm$ = this.#planetsService.getPlanets().pipe(
    combineLatestWith(this.#viewModeService.viewMode()),
    map(([planets, viewMode]) => ({ planets, viewMode }))
  );
}
