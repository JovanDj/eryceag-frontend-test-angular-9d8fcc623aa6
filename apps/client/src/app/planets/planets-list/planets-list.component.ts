import { Component, Input } from '@angular/core';
import { Planet } from '../planet.schema';

@Component({
  selector: 'app-planets-list',
  standalone: true,
  templateUrl: './planets-list.component.html',
  styleUrl: './planets-list.component.scss',
})
export class PlanetsListComponent {
  @Input({ required: true })
  planets: Planet[] = [];
}
