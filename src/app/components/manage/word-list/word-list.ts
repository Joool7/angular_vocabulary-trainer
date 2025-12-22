import { Component, input, output } from '@angular/core';
import { WordPair } from '../../../services/word-pair.model';
import { EntryComponent } from './entry/entry/entry';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from "../../shared/button-component/button-component";

@Component({
  selector: 'app-word-list',
  imports: [EntryComponent, FormsModule, ButtonComponent],
  templateUrl: './word-list.html',
  styleUrl: './word-list.scss',
})
export class WordListComponent {
  wordList = input.required<WordPair[]>();
  deleteEmitter = output<string>();
  newEmitter = output<WordPair>();
  updateEmitter = output<WordPair>();

  newWordPair: WordPair = {
    id: '',
    language1: '',
    language2: '',
  };

  newEntry(form: NgForm) {
    if (form.invalid) return;

    this.newEmitter.emit(this.newWordPair);
    form.resetForm();
  }

  updateEntry(wordPair: WordPair) {
    this.updateEmitter.emit(wordPair);
  }

  deleteEntry(id: string): void {
    this.deleteEmitter.emit(id);
  }
}
