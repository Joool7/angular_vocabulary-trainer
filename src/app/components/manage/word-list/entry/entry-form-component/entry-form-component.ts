import { Component, computed, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WordPair } from '../../../../../services/word-pair.model';
import { InputComponent } from '../../../../shared/input-component/input-component';
import { ButtonComponent } from '../../../../shared/button-component/button-component';

@Component({
  selector: 'app-entry-form',
  imports: [FormsModule, InputComponent, ButtonComponent],
  templateUrl: './entry-form-component.html',
  styleUrl: './entry-form-component.scss',
})
export class EntryFormComponent {
  wordPair = input.required<WordPair>();
  updateEmitter = output<WordPair>();

  newLanguage1 = linkedSignal(() => this.wordPair().language1);
  newLanguage2 = linkedSignal(() => this.wordPair().language2);

  formValid = computed(() => this.newLanguage1()?.trim() && this.newLanguage2()?.trim());

  updateEntry() {
    if (!this.formValid()) return;
    this.updateEmitter.emit({
      ...this.wordPair(),
      language1: this.newLanguage1(),
      language2: this.newLanguage2(),
    });
    this._resetForm();
  }

  private _resetForm(): void {
    this.newLanguage1.set('');
    this.newLanguage2.set('');
  }
}
