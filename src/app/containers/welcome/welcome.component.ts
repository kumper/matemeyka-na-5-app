import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './welcome.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  readonly #gameService = inject(GameService);

  readonly nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  });

  readonly submitted = signal(false);

  submit(): void {
    this.submitted.set(true);
    if (this.nameControl.invalid) return;
    this.#gameService.startGame(this.nameControl.value.trim());
  }
}

