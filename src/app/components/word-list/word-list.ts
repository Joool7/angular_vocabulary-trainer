import { WordPairService } from './../../services/word-pair';
import { Component, inject, input } from '@angular/core';
import { WordPair } from './word.model';
import { Entry } from './entry/entry/entry';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-word-list',
  imports: [Entry, FormsModule],
  templateUrl: './word-list.html',
  styleUrl: './word-list.scss',
})
export class WordList {
  private readonly _wordPairService = inject(WordPairService);

  wordList = input.required<WordPair[]>();

  newWordPair: WordPair = {
    language1: '',
    language2: '',
  };

  saveEntry(form: NgForm) {
    if (form.invalid) return;

    this._wordPairService.add(this.newWordPair);
    form.resetForm();
  }
}
