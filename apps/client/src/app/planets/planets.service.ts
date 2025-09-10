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

export type SortDirection = 'asc' | 'desc';

@Injectable({ providedIn: 'root' })
export class PlanetsService {
  readonly #http = inject(HttpClient);

  readonly #store = new BehaviorSubject<Planet[]>([]);
  readonly #state$ = this.#store.asObservable();

  readonly #searchTerm = new BehaviorSubject<string>('');

  readonly #sortStore = new BehaviorSubject<SortDirection>('desc');
  readonly #sort = this.#sortStore.asObservable();

  readonly #filteredPlanets$ = this.#state$.pipe(
    combineLatestWith(this.#searchTerm, this.#sortStore),
    map(([planets, term, sort]) => {
      const trimmed = term.trim().toLowerCase();

      const filtered = trimmed
        ? planets.filter((planet) => {
            return planet.planetName.toLowerCase().includes(trimmed);
          })
        : planets;

      return filtered.sort((a, b) => {
        if (sort === 'asc') {
          return a.planetRadiusKM - b.planetRadiusKM;
        }

        if (sort === 'desc') {
          return b.planetRadiusKM - a.planetRadiusKM;
        }

        return a.id - b.id;
      });
    })
  );

  planets() {
    return this.#filteredPlanets$;
  }

  sortDirection() {
    return this.#sort;
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

  toggleRadiusDirection() {
    this.#sortStore.next(this.#sortStore.getValue() === 'asc' ? 'desc' : 'asc');
  }

  addPlanet(formData: FormData) {
    return this.#http.post<unknown>('/api/planets', formData).pipe(
      map((res) => {
        const planet = planetSchema.parse(res);

        this.#store.next([
          ...this.#store.getValue(),
          {
            ...planet,
          },
        ]);

        return planet;
      }),
      catchError((err) => {
        if (err instanceof ZodError) {
          return throwError(() => new Error('Invalid planet data received.'));
        }

        return throwError(() => err);
      })
    );
  }

  fetchPlanet(id: Planet['id']) {
    return this.#http.get<unknown>(`/api/planets/${id}`).pipe(
      map((res) => {
        return planetSchema.parse(res);
      })
    );
  }
}
