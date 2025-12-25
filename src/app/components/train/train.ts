import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { WordPairService } from '../../services/word-pair-service';
import { WordPair } from '../../services/word-pair.model';
import { ButtonComponent } from '../shared/button-component/button-component';
import { InputComponent } from '../shared/input-component/input-component';
import { IconComponent } from '../shared/icon-component/icon-component';

@Component({
  selector: 'app-train',
  imports: [ButtonComponent, InputComponent, IconComponent],
  templateUrl: './train.html',
  styleUrl: './train.scss',
})
export class TrainComponent implements OnInit {
  private readonly _wordPairService = inject(WordPairService);

  selectedLanguage = signal(false);
  selectedWordPair = signal<WordPair | null>(null);
  userAnswer = signal('');
  state = signal<'waitForAnswer' | 'correct' | 'wrong'>('waitForAnswer');

  priorizedList = computed(() => {
    const list = this._wordPairService.wordList();
    const correctList = list.filter((wordPair) => wordPair.isAnsweredCorrectly ?? false);
    const newOrIncorrectList = list.filter((wordPair) => !wordPair.isAnsweredCorrectly);
    return [...correctList, ...newOrIncorrectList, ...newOrIncorrectList];
  });
  question = computed(
    () =>
      (this.selectedLanguage()
        ? this.selectedWordPair()?.language1
        : this.selectedWordPair()?.language2) ?? ''
  );
  correctAnswer = computed(
    () =>
      (this.selectedLanguage()
        ? this.selectedWordPair()?.language2
        : this.selectedWordPair()?.language1) ?? ''
  );
  formValid = computed(() => this.userAnswer().trim());

  ngOnInit(): void {
    this._selectNextWordPair();
  }

  checkAnswer() {
    const selectedWordPair = this.selectedWordPair();
    if (!this.formValid() || !selectedWordPair) return;

    const correctAnswered = this.userAnswer().toLowerCase() === this.correctAnswer();
    if (correctAnswered) {
      this.state.set('correct');
    } else {
      this.state.set('wrong');
    }
    this._wordPairService.update({ ...selectedWordPair, isAnsweredCorrectly: correctAnswered });

    this._resetForm();
  }

  selectNext(): void {
    this.state.set('waitForAnswer');
    this._resetForm();
    this._selectNextWordPair();
  }

  private _selectNextWordPair(): void {
    this.selectedLanguage.set(Math.random() < 0.5);
    this.selectedWordPair.set(this._getRandomElementOfList(this.priorizedList()));
  }

  private _getRandomElementOfList(list: WordPair[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  private _resetForm(): void {
    this.userAnswer.set('');
  }
}
