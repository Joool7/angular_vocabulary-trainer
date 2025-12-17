import { WordPairService } from './../../../../services/word-pair';
import { Component, inject, input, signal } from '@angular/core';
import { WordPair } from '../../word.model';

@Component({
  selector: 'app-entry',
  imports: [],
  templateUrl: './entry.html',
  styleUrl: './entry.scss',
})
export class Entry {
  private readonly _wordPairService = inject(WordPairService);

  wordPair = input.required<WordPair>();
  editActive = signal(false);

  edit(): void {}

  delete(): void {
    this._wordPairService.delete(this.wordPair());
  }
}
