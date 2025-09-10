import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe, DecimalPipe],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetDetailComponent {
  readonly #planetsService = inject(PlanetsService);
  readonly #route = inject(ActivatedRoute);

  protected readonly planet$ = this.#route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.#planetsService.fetchPlanet(id))
  );
}
