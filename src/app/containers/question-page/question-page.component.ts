import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CardComponent } from '../../components/card/card.component';
import { QuestionDisplayComponent } from '../../components/question-display/question-display.component';

@Component({
  selector: 'app-question-page',
  imports: [CardComponent, QuestionDisplayComponent, UpperCasePipe],
  templateUrl: './question-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionPageComponent {
  readonly #router = inject(Router);
  protected readonly game = inject(GameService);

  readonly selectedAnswerId = signal<string | null>(null);
  readonly answered = signal(false);

  select(answerId: string): void {
    if (this.answered()) return;
    this.selectedAnswerId.set(answerId);
    this.answered.set(true);
  }

  confirm(): void {
    const selected = this.selectedAnswerId();
    if (!selected) return;
    this.game.submitAnswer(selected);
    this.selectedAnswerId.set(null);
    this.answered.set(false);
  }

  protected get isGameActive(): boolean {
    return this.game.currentQuestion() !== null;
  }
}


