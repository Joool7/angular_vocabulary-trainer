import { Component, computed, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { WordPair } from '../../../services/word-pair.model';
import { ButtonComponent } from '../../shared/button-component/button-component';
import { InputComponent } from '../../shared/input-component/input-component';
import { PercentPipe } from '@angular/common';
import { ProgressComponent } from '../../shared/progress-component/progress-component';

interface QuestionAnswer {
  question: string;
  correctAnswer: string;
  answer: string;
}

@Component({
  selector: 'app-examination',
  imports: [ButtonComponent, InputComponent, PercentPipe, ProgressComponent],
  templateUrl: './examination-component.html',
  styleUrl: './examination-component.scss',
})
export class ExaminationComponent implements OnInit, OnDestroy {
  wordList = input.required<WordPair[]>();
  timeLimit = input<number>();
  examinationRunningEmitted = output<boolean | null>();

  private _remainingQuestions: WordPair[] = [];
  private _interval: number = 0;

  numberAnswered = signal(0);
  examinationStartDate = signal<number | null>(null);
  numberOfQuestions = signal(0);
  numberOfCorrectAnswers = signal(0);
  currentTimeCounter = signal(0);
  duration = signal('');
  listOfWrongAnswers = signal<QuestionAnswer[]>([]);
  selectedLanguage = signal(false);
  selectedWordPair = signal<WordPair | null>(null);
  userAnswer = signal('');

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
  progressInPercent = computed(() => {
    const timeLimit = this.timeLimit();
    if (!timeLimit) return 100;
    return (this.currentTimeCounter() / (timeLimit * 60 * 1000)) * 100;
  });
  formValid = computed(() => this.userAnswer().trim());

  ngOnInit(): void {
    this.startExamination();
  }

  startExamination(): void {
    this.numberOfQuestions.set(this.wordList().length);
    this.examinationRunningEmitted.emit(true);
    this.examinationStartDate.set(Date.now());
    this._remainingQuestions = this.wordList().slice();
    this.numberOfCorrectAnswers.set(0);
    this.numberAnswered.set(0);
    this.duration.set('');
    this._selectNextWordPair();
    this.listOfWrongAnswers.set([]);

    if (this.timeLimit() && this.timeLimit()! > 0) {
      this._startProgressbar();
    }
  }

  cancelExamination(): void {
    this.examinationRunningEmitted.emit(null);
  }

  checkAnswer(): void {
    const selectedWordPair = this.selectedWordPair();
    if (!this.formValid() || !selectedWordPair) return;

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
    this.numberAnswered.update((value) => value + 1);
    this._resetForm();

    if (this.numberAnswered() < this.numberOfQuestions()) {
      this.selectNext();
    } else {
      this._finishTest();
    }
  }

  selectNext(): void {
    this._selectNextWordPair();
    this._resetForm();
  }

  ngOnDestroy(): void {
    this._clearInterval();
  }

  private _finishTest(): void {
    const examinationStart = this.examinationStartDate();
    if (!examinationStart) return;
    this.examinationRunningEmitted.emit(false);
    this.duration.set(this._millisToReadableTime(Date.now() - examinationStart));
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

  private _startProgressbar(): void {
    this.currentTimeCounter.set(0);
    this._interval = window.setInterval(() => {
      this.currentTimeCounter.update((value) => value + 250);
      if (this.currentTimeCounter() >= this.timeLimit()! * 60 * 1000) {
        this._finishTest();
        this._clearInterval();
      }
    }, 250);
  }

  private _clearInterval(): void {
    if (this._interval) window.clearInterval(this._interval);
  }

  private _resetForm(): void {
    this.userAnswer.set('');
  }
}
