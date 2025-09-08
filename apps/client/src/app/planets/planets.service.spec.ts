import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { PlanetsService } from './planets.service';
import { Planet } from './planet.schema';
import { catchError, firstValueFrom, throwError } from 'rxjs';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PlanetsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('returns a list of planets when requested', async () => {
    const planets: Planet[] = [
      {
        id: 1,
        planetName: 'Earth',
        planetColor: 'Blue',
        planetRadiusKM: 6371,
        distInMillionsKM: {
          fromSun: 149.6,
          fromEarth: 0,
        },
        description:
          'Earth is the third planet from the Sun and the only astronomical object known to harbor life.',
        imageUrl: 'https://example.com/earth.jpg',
        imageName: 'earth.jpg',
      },
    ];

    const promise = firstValueFrom(service.getPlanets());

    const req = http.expectOne('/api/planets');
    expect(req.request.method).toBe('GET');
    req.flush(planets);

    const result = await promise;

    expect(result.length).toBe(1);
    expect(result[0].planetName).toBe('Earth');
  });

  it('returns an error if planets response is invalid', async () => {
    const invalidResponse = [{ foo: 'bar' }];

    const resultPromise = firstValueFrom(
      service.getPlanets().pipe(
        catchError((err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe('Invalid planet data received.');
          return throwError(() => err);
        })
      )
    );

    const req = http.expectOne('/api/planets');
    expect(req.request.method).toBe('GET');
    req.flush(invalidResponse);

    return expectAsync(resultPromise).toBeRejected();
  });
});
