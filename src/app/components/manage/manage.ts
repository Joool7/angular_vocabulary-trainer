import { Component, computed, inject } from '@angular/core';
import { WordListComponent } from './word-list/word-list';
import { WordPairService } from '../../services/word-pair-service';
import { WordPair } from '../../services/word-pair.model';
import { ButtonComponent } from '../shared/button-component/button-component';

@Component({
  selector: 'app-manage',
  imports: [WordListComponent, ButtonComponent],
  templateUrl: './manage.html',
  styleUrl: './manage.scss',
})
export class ManageComponent {
  protected readonly wordPairService = inject(WordPairService);

  importDefault(): void {
    this.wordPairService.import();
  }

  resetList(): void {
    this.wordPairService.reset();
  }

  deleteEntry(id: string): void {
    this.wordPairService.delete(id);
  }

  newEntry(wordPair: WordPair): void {
    this.wordPairService.add(wordPair);
  }

  updateEntry(wordPair: WordPair): void {
    this.wordPairService.update(wordPair);
  }
}
