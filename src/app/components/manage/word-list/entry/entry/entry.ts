import { Component, input, output, signal } from '@angular/core';
import { WordPair } from '../../../../../services/word-pair.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button-component/button-component';
import { EntryFormComponent } from '../entry-form-component/entry-form-component';

@Component({
  selector: 'app-entry',
  imports: [FormsModule, ButtonComponent, EntryFormComponent],
  templateUrl: './entry.html',
  styleUrl: './entry.scss',
})
export class EntryComponent {
  wordPair = input.required<WordPair>();
  deleteEmitter = output();
  updateEmitter = output<WordPair>();

  editActive = signal(false);

  edit(): void {
    this.editActive.set(true);
  }

  delete(): void {
    this.deleteEmitter.emit();
  }

  updateEntry(newWordPair: WordPair) {
    this.updateEmitter.emit(newWordPair);
    this.editActive.set(false);
  }
}
