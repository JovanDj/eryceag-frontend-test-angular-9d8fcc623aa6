import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ViewMode = 'table' | 'grid';

@Injectable({ providedIn: 'root' })
export class ViewModeService {
  readonly #store$ = new BehaviorSubject<ViewMode>('table');
  readonly #state$ = this.#store$.asObservable();

  setViewMode(mode: ViewMode) {
    this.#store$.next(mode);
  }

  viewMode() {
    return this.#state$;
  }
}
