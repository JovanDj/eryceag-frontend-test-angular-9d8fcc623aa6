import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanetsService } from '../planets.service';
import { ConfirmationService } from '../../shared/confirmation.service';

@Component({
  selector: 'app-planet-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './planet-form.component.html',
  styleUrl: './planet-form.component.scss',
})
export class PlanetFormComponent {
  readonly #fb = inject(NonNullableFormBuilder);
  readonly #planetsService = inject(PlanetsService);
  readonly #active = inject(NgbActiveModal);
  readonly #confirmation = inject(ConfirmationService);

  protected preview: string | undefined = undefined;
  protected selectedFile: File | undefined = undefined;

  protected readonly form = this.#fb.group({
    name: ['', [Validators.required]],
    description: [''],
    color: [''],
    radiusKM: [0, [Validators.min(0)]],
    distSun: [0, [Validators.min(0)]],
    distEarth: [0, Validators.min(0)],
  });

  protected async onSubmit() {
    if (this.form.invalid || !this.selectedFile) {
      return;
    }

    const confirmed = await this.#confirmation.confirm(
      'CREATE',
      this.form.value.name ?? 'planet'
    );

    if (!confirmed) {
      return;
    }

    const formData = new FormData();

    formData.append('planetName', this.form.value.name ?? '');
    formData.append('planetColor', this.form.value.color ?? '');
    formData.append('description', this.form.value.description ?? '');

    formData.append(
      'planetRadiusKM',
      this.form.value.radiusKM?.toString() ?? ''
    );

    formData.append(
      'distInMillionsKM[fromSun]',
      this.form.value.distSun?.toString() ?? ''
    );
    formData.append(
      'distInMillionsKM[fromEarth]',
      this.form.value.distEarth?.toString() ?? ''
    );

    formData.append('file', this.selectedFile);

    this.#planetsService.addPlanet(formData).subscribe(() => {
      this.#active.close();
    });
  }

  protected onFileChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const input = event.target;

      if (!input.files || input.files.length === 0) {
        return;
      }

      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.preview = reader.result?.toString());
      reader.readAsDataURL(this.selectedFile);
    }
  }

  protected onCancelClick() {
    this.form.reset();
    this.#active.dismiss();
  }
}
