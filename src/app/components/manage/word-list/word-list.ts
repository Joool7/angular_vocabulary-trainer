import { Component, computed, input, output, signal } from '@angular/core';
import { WordPair } from '../../../services/word-pair.model';
import { EntryComponent } from './entry/entry/entry';
import { FormsModule } from '@angular/forms';
import { EntryFormComponent } from './entry/entry-form-component/entry-form-component';

type SortOrder = 'german' | 'english';

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

  sortOrder = signal<SortOrder>('german');

  sortedWordList = computed(() =>
    this.wordList().sort((a, b) =>
      this.sortOrder() === 'german'
        ? a.language1.localeCompare(b.language1)
        : a.language2.localeCompare(b.language2)
    )
  );

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

  sort(sortOrder: SortOrder): void {
    this.sortOrder.set(sortOrder);
  }
}
