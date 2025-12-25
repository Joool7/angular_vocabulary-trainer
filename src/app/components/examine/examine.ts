import { RadioOption } from './../shared/radio-component/radio.model';
import { Component, inject, output, signal } from '@angular/core';
import { WordPairService } from '../../services/word-pair-service';
import { ExaminationComponent } from './examination-component/examination-component';
import { ConfigurationComponent } from './configuration-component/configuration-component';

@Component({
  selector: 'app-examine',
  imports: [ExaminationComponent, ConfigurationComponent],
  templateUrl: './examine.html',
  styleUrl: './examine.scss',
})
export class ExamineComponent {
  protected readonly wordPairService = inject(WordPairService);

  examinationRunningEmitted = output<boolean>();
  examinationRunning = signal<boolean | null>(null);
  timeLimit = signal(0);

  startExamination(option: RadioOption): void {
    this.timeLimit.set(option.value);
    this.updatedExaminationRunning(true);
  }

  updatedExaminationRunning(running: boolean | null): void {
    this.examinationRunning.set(running);
    this.examinationRunningEmitted.emit(running ?? false);
  }
}
