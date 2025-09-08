import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsComponent } from './planets.component';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsService } from './planets.service';
import { provideHttpClient } from '@angular/common/http';
import { ViewModeService } from '../view-mode.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('PlanetsComponent', () => {
  let fixture: ComponentFixture<PlanetsComponent>;
  let http: HttpTestingController;
  let viewModeService: ViewModeService;

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
});
