import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsListComponent } from './planets-list.component';
import { provideHttpClient } from '@angular/common/http';
import { PlanetsService } from '../planets.service';

describe('PlanetsListComponent', () => {
  let component: PlanetsListComponent;
  let fixture: ComponentFixture<PlanetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetsListComponent],
      providers: [provideHttpClient(), PlanetsService],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetsListComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
