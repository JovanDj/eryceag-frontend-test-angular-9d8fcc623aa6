import {
  BehaviorSubject,
  catchError,
  combineLatestWith,
  map,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { z, ZodError } from 'zod';

import { Planet, planetSchema } from './planet.schema';

@Injectable({ providedIn: 'root' })
export class PlanetsService {
  readonly #http = inject(HttpClient);

  readonly #store = new BehaviorSubject<Planet[]>([]);
  readonly #state$ = this.#store.asObservable();

  readonly #searchTerm = new BehaviorSubject<string>('');

  readonly #filteredPlanets$ = this.#state$.pipe(
    combineLatestWith(this.#searchTerm),
    map(([planets, term]) => {
      const trimmed = term.trim().toLowerCase();

      if (!trimmed) {
        return planets;
      }

      return planets.filter((planet) => {
        return planet.planetName.toLowerCase().includes(trimmed);
      });
    })
  );

  planets() {
    return this.#filteredPlanets$;
  }

  fetchPlanets() {
    return this.#http.get<unknown>('/api/planets').pipe(
      map((planets) => {
        this.#store.next(z.array(planetSchema).parse(planets));
      }),
      catchError((err) => {
        if (err instanceof ZodError) {
          return throwError(() => new Error('Invalid planet data received.'));
        }

        return throwError(() => err);
      })
    );
  }

  setSearchTerm(term: string) {
    this.#searchTerm.next(term);
  }
}
