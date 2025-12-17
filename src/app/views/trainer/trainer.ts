import { WordList } from './../../components/word-list/word-list';
import { WordPairService } from './../../services/word-pair';
import { Component, computed, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-trainer',
  imports: [WordList],
  templateUrl: './trainer.html',
  styleUrl: './trainer.scss',
})
export class Trainer {
  private readonly _wordPairService = inject(WordPairService);

  wordList = computed(() =>
    this._wordPairService.wordList().sort((a, b) => a.language1.localeCompare(b.language1))
  );

  importDefault(): void {
    this._wordPairService.import();
  }

  resetList(): void {
    this._wordPairService.reset();
  }
}
