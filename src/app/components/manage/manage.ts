import { Component, computed, inject } from '@angular/core';
import { WordListComponent } from './word-list/word-list';
import { WordPairService } from '../../services/word-pair-service';
import { WordPair } from '../../services/word-pair.model';

@Component({
  selector: 'app-manage',
  imports: [WordListComponent],
  templateUrl: './manage.html',
  styleUrl: './manage.scss',
})
export class ManageComponent {
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

  deleteEntry(id: string): void {
    this._wordPairService.delete(id);
  }

  newEntry(wordPair: WordPair): void {
    this._wordPairService.add(wordPair);
  }

  updateEntry(wordPair: WordPair): void {
    this._wordPairService.update(wordPair);
  }
}
