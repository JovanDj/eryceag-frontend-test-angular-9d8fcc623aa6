import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ViewModeService } from '../view-mode.service';
import { PlanetsService } from '../planets/planets.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, NgIf, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly #viewModeService = inject(ViewModeService);
  readonly #planetsService = inject(PlanetsService);
  readonly #fb = inject(NonNullableFormBuilder);

  protected readonly term = this.#fb.control('');

  constructor() {
    this.term.valueChanges
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged(),
        debounceTime(300),
        tap((term) => {
          this.#planetsService.setSearchTerm(term);
        })
      )
      .subscribe();
  }

  protected viewMode() {
    return this.#viewModeService.viewMode();
  }

  protected setTableView() {
    this.#viewModeService.setViewMode('table');
  }

  protected setGridView() {
    this.#viewModeService.setViewMode('grid');
  }
}
