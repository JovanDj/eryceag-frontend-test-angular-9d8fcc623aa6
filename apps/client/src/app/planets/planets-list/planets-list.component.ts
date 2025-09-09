import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Planet } from '../planet.schema';
import { SortDirection } from '../planets.service';

@Component({
  selector: 'app-planets-list',
  standalone: true,
  templateUrl: './planets-list.component.html',
  styleUrl: './planets-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsListComponent {
  @Input({ required: true })
  planets: Planet[] = [];

  @Input({ required: true })
  sortDirection: SortDirection = 'desc';

  @Output()
  toggleSortRadius = new EventEmitter<void>();

  protected onToggleRadiusClick() {
    this.toggleSortRadius.emit();
  }
}
