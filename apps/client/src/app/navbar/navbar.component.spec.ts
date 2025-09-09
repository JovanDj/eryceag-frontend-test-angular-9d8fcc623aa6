import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { ViewModeService } from '../view-mode.service';
import { PlanetsService } from '../planets/planets.service';
import { provideHttpClient } from '@angular/common/http';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;

  let gridButton: HTMLElement;
  let tableButton: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideHttpClient(), PlanetsService, ViewModeService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    fixture.autoDetectChanges();

    gridButton = fixture.debugElement.query(
      By.css('#grid-button')
    ).nativeElement;

    tableButton = fixture.debugElement.query(
      By.css('#table-button')
    ).nativeElement;
  });

  it('should activate grid view on grid button click', () => {
    gridButton.click();

    expect(gridButton.classList).toContain('text-bg-secondary');
    expect(tableButton.classList).not.toContain('text-bg-secondary');
  });

  it('should activate table view on table button click', () => {
    tableButton.click();

    expect(tableButton.classList).toContain('text-bg-secondary');
    expect(gridButton.classList).not.toContain('text-bg-secondary');
  });
});
