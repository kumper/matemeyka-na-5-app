import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-result-page',
  imports: [CardComponent],
  templateUrl: './result-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultPageComponent {
  readonly #router = inject(Router);
  protected readonly game = inject(GameService);

  readonly correctCount = computed(
    () => this.game.history().filter((h) => h.correct).length
  );

  readonly maxReachedLevel = computed(() =>
    this.game.history().reduce((max, h) => Math.max(max, h.question.difficulty), 1)
  );

  readonly resultEmoji = computed(() => {
    const score = this.game.score();
    if (score >= 20) return '🏆';
    if (score >= 15) return '🥇';
    if (score >= 10) return '🥈';
    if (score >= 5)  return '🥉';
    return '💪';
  });

  readonly resultMessage = computed(() => {
    const score = this.game.score();
    if (score >= 20) return 'Niesamowity wynik! Jesteś mistrzem!';
    if (score >= 15) return 'Świetna robota! Naprawdę nieźle!';
    if (score >= 10) return 'Dobry wynik! Ćwicz dalej!';
    if (score >= 5)  return 'Niezły start! Spróbuj jeszcze raz!';
    return 'Nie poddawaj się! Następnym razem będzie lepiej!';
  });

  playAgain(): void {
    this.#router.navigate(['/']);
  }
}

