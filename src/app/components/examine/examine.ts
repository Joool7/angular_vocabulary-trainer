import { Component, computed, inject, OnInit, output, signal } from '@angular/core';
import { WordPairService } from '../../services/word-pair-service';
import { WordPair } from '../../services/word-pair.model';
import { FormsModule, NgForm } from '@angular/forms';
import { InputComponent } from '../shared/input-component/input-component';
import { ButtonComponent } from '../shared/button-component/button-component';

interface QuestionAnswer {
  question: string;
  correctAnswer: string;
  answer: string;
}

@Component({
  selector: 'app-examine',
  imports: [FormsModule, InputComponent, ButtonComponent],
  templateUrl: './examine.html',
  styleUrl: './examine.scss',
})
export class ExamineComponent implements OnInit {
  private readonly _wordPairService = inject(WordPairService);
  private _numberAnswered = 0;
  private _remainingQuestions: WordPair[] = [];

  examinationRunningEmitted = output<boolean>();

  examinationStartDate = signal<number | null>(null);
  numberOfQuestions = signal(0);
  numberOfCorrectAnswers = signal(0);

  duration = signal('');

  listOfWrongAnswers = signal<QuestionAnswer[]>([]);

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

  ngOnInit(): void {
    this.numberOfQuestions.set(this._wordPairService.wordList().length);
  }

  startExamination(): void {
    this.examinationRunningEmitted.emit(true);
    this.examinationStartDate.set(Date.now());
    this._remainingQuestions = this._wordPairService.wordList().slice();
    this.numberOfCorrectAnswers.set(0);
    this._numberAnswered = 0;
    this.duration.set('');
    this._selectNextWordPair();
    this.listOfWrongAnswers.set([]);
    this.userAnswer.set('');
  }

  checkAnswer(form: NgForm): void {
    const selectedWordPair = this.selectedWordPair();
    if (form.invalid || !selectedWordPair) return;

    const correctAnswered = this.userAnswer().toLowerCase() === this.correctAnswer();
    if (correctAnswered) {
      this.numberOfCorrectAnswers.update((value) => value + 1);
    } else {
      this.listOfWrongAnswers.update((list) => [
        ...list,
        {
          question: this.question().toLowerCase(),
          correctAnswer: this.correctAnswer().toLowerCase(),
          answer: this.userAnswer().toLowerCase(),
        },
      ]);
    }
    this._numberAnswered++;
    form.resetForm();

    if (this._numberAnswered < this.numberOfQuestions()) {
      this.selectNext();
    } else {
      const examinationStart = this.examinationStartDate();
      if (!examinationStart) return;
      this.examinationRunningEmitted.emit(false);
      this.duration.set(this._millisToReadableTime(Date.now() - examinationStart));
    }
  }

  selectNext(): void {
    this._selectNextWordPair();
    this.userAnswer.set('');
  }

  private _selectNextWordPair(): void {
    this.selectedLanguage.set(Math.random() < 0.5);
    this.selectedWordPair.set(this._getRandomElementOfList(this._remainingQuestions));

    this._remainingQuestions = this._remainingQuestions.filter(
      (wordPair) => wordPair !== this.selectedWordPair()
    );
  }

  private _getRandomElementOfList(list: WordPair[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  private _millisToReadableTime(millis: number): string {
    const totalSeconds = Math.floor(millis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  }
}
