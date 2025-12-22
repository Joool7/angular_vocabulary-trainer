import { Component, inject, input, linkedSignal, output, signal } from '@angular/core';
import { WordPair } from '../../../../../services/word-pair.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/button-component/button-component';

@Component({
  selector: 'app-entry',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './entry.html',
  styleUrl: './entry.scss',
})
export class EntryComponent {
  wordPair = input.required<WordPair>();
  deleteEmitter = output();
  updateEmitter = output<WordPair>();

  editActive = signal(false);

  newWordPair = linkedSignal(() => this.wordPair());

  edit(): void {
    this.editActive.set(true);
  }

  delete(): void {
    this.deleteEmitter.emit();
  }

  updateEntry(form: NgForm) {
    if (form.invalid) return;

    this.updateEmitter.emit(this.newWordPair());
    this.editActive.set(false);
    form.resetForm();
  }
}
