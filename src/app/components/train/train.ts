import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { WordPairService } from '../../services/word-pair-service';
import { WordPair } from '../../services/word-pair.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../shared/button-component/button-component';
import { InputComponent } from '../shared/input-component/input-component';
import { IconComponent } from '../shared/icon-component/icon-component';

@Component({
  selector: 'app-train',
  imports: [FormsModule, ButtonComponent, InputComponent, IconComponent],
  templateUrl: './train.html',
  styleUrl: './train.scss',
})
export class TrainComponent implements OnInit {
  private readonly _wordPairService = inject(WordPairService);

  priorizedList = computed(() => {
    const list = this._wordPairService.wordList();
    const correctList = list.filter((wordPair) => wordPair.isAnsweredCorrectly ?? false);
    const newOrIncorrectList = list.filter((wordPair) => !wordPair.isAnsweredCorrectly);
    return [...correctList, ...newOrIncorrectList, ...newOrIncorrectList];
  });

  selectedLanguage = signal(false);
  selectedWordPair = signal<WordPair | null>(null);
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
  userAnswer = signal('');

  state = signal<'waitForAnswer' | 'correct' | 'wrong'>('waitForAnswer');

  ngOnInit(): void {
    this._selectNextWordPair();
  }

  checkAnswer(form: NgForm) {
    const selectedWordPair = this.selectedWordPair();
    if (form.invalid || !selectedWordPair) return;

    const correctAnswered = this.userAnswer().toLowerCase() === this.correctAnswer();
    if (correctAnswered) {
      this.state.set('correct');
    } else {
      this.state.set('wrong');
    }
    this._wordPairService.update({ ...selectedWordPair, isAnsweredCorrectly: correctAnswered });

    form.resetForm();
  }

  selectNext(): void {
    this.state.set('waitForAnswer');
    this.userAnswer.set('');
    this._selectNextWordPair();
  }

  private _selectNextWordPair(): void {
    this.selectedLanguage.set(Math.random() < 0.5);
    this.selectedWordPair.set(this._getRandomElementOfList(this.priorizedList()));
  }

  private _getRandomElementOfList(list: WordPair[]) {
    return list[Math.floor(Math.random() * list.length)];
  }
}
