import { Component, input, output } from '@angular/core';
import { WordPair } from '../../../services/word-pair.model';
import { EntryComponent } from './entry/entry/entry';
import { FormsModule } from '@angular/forms';
import { EntryFormComponent } from './entry/entry-form-component/entry-form-component';

@Component({
  selector: 'app-word-list',
  imports: [EntryComponent, FormsModule, EntryFormComponent],
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

  newEntry(newWordPair: WordPair) {
    this.newEmitter.emit(newWordPair);
  }

  updateEntry(wordPair: WordPair) {
    this.updateEmitter.emit(wordPair);
  }

  deleteEntry(id: string): void {
    this.deleteEmitter.emit(id);
  }
}
