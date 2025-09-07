import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { z, ZodError } from 'zod';

import { planetSchema } from './planet.schema';

@Injectable({ providedIn: 'root' })
export class PlanetsService {
  readonly #http = inject(HttpClient);

  getPlanets() {
    return this.#http.get<unknown>('/api/planets').pipe(
      map((data) => {
        return z.array(planetSchema).parse(data);
      }),
      catchError((err) => {
        if (err instanceof ZodError) {
          return throwError(() => new Error('Invalid planet data received.'));
        }

        return throwError(() => err);
      })
    );
  }
}
