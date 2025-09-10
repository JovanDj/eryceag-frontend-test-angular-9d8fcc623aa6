import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { PlanetsComponent } from './planets.component';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsService } from './planets.service';
import { ViewModeService } from '../shared/view-mode.service';

import { Planet } from './planet.schema';

describe('PlanetsComponent', () => {
  let fixture: ComponentFixture<PlanetsComponent>;
  let http: HttpTestingController;
  let viewModeService: ViewModeService;

  const planets: Planet[] = [
    {
      id: 1,
      planetName: 'Earth',
      planetColor: 'Blue',
      planetRadiusKM: 6371,
      distInMillionsKM: { fromSun: 150, fromEarth: 0 },
      description: 'The third planet from the sun.',
      imageName: 'earth.jpg',
      imageUrl: 'https://example.com/earth.jpg',
    },
    {
      id: 2,
      planetName: 'Mars',
      planetColor: 'Red',
      planetRadiusKM: 3389,
      distInMillionsKM: { fromSun: 228, fromEarth: 78 },
      description: 'The red planet.',
      imageName: 'mars.jpg',
      imageUrl: 'https://example.com/mars.jpg',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetsComponent, PlanetsListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PlanetsService,
        ViewModeService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetsComponent);
    http = TestBed.inject(HttpTestingController);
    viewModeService = TestBed.inject(ViewModeService);

    fixture.autoDetectChanges();
  });

  afterEach(() => {
    http.verify();
  });

  it('should render planets table when view mode is set to "table"', () => {
    viewModeService.setViewMode('table');

    const req = http.expectOne('/api/planets');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('#planets-table'));
    expect(table).toBeTruthy();
  });

  it('should render planets grid when view mode is set to "grid"', () => {
    viewModeService.setViewMode('grid');

    const req = http.expectOne('/api/planets');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    fixture.detectChanges();

    const grid = fixture.debugElement.query(By.css('#planets-grid'));
    expect(grid).toBeTruthy();
  });

  it('should toggle sort direction and update the arrow icon on click', () => {
    viewModeService.setViewMode('table');

    const req = http.expectOne('/api/planets');
    req.flush(planets);
    fixture.detectChanges();

    const getPlanetNames = () => {
      return fixture.debugElement
        .queryAll(By.css("[data-testid='planet-name']"))
        .map((debug) => debug.nativeElement.textContent.trim());
    };

    const getArrow = () => {
      return fixture.debugElement.query(By.css("[data-testid='arrow-down']"))
        .nativeElement;
    };

    expect(getPlanetNames()[0]).toBe('Earth');
    expect(getArrow().classList).toContain('bi-caret-down-fill');

    const header = fixture.debugElement.query(
      By.css("[data-testid='toggle-radius']")
    );
    header.nativeElement.click();
    fixture.detectChanges();

    const arrowUp = fixture.debugElement.query(
      By.css("[data-testid='arrow-up']")
    );
    expect(arrowUp).toBeTruthy();
    expect(arrowUp.nativeElement.classList).toContain('bi-caret-up-fill');
    expect(getPlanetNames()[0]).toBe('Mars');

    header.nativeElement.click();
    fixture.detectChanges();

    const arrowDown = fixture.debugElement.query(
      By.css("[data-testid='arrow-down']")
    );
    expect(arrowDown).toBeTruthy();
    expect(arrowDown.nativeElement.classList).toContain('bi-caret-down-fill');
    expect(getPlanetNames()[0]).toBe('Earth');
  });
});
