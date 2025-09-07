import { Component, inject } from '@angular/core';
import { ViewModeService } from '../view-mode.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly #viewModeService = inject(ViewModeService);

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
