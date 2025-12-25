import { RadioOption } from './../../shared/radio-component/radio.model';
import { Component, output, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/button-component/button-component';
import { RadioComponent } from '../../shared/radio-component/radio-component';

@Component({
  selector: 'app-configuration',
  imports: [ButtonComponent, RadioComponent],
  templateUrl: './configuration-component.html',
  styleUrl: './configuration-component.scss',
})
export class ConfigurationComponent {
  examinationStartEmitted = output<RadioOption>();

  timeOptions: RadioOption[] = [
    {
      checked: true,
      value: 0,
      visibleValue: 'Ohne',
    },
    {
      checked: true,
      value: 5,
      visibleValue: '5 min',
    },
    {
      checked: true,
      value: 10,
      visibleValue: '10 min',
    },
  ];

  selectedTimeOption = signal<RadioOption | null>(null);

  startExamination(): void {
    const selectedTimeOption = this.selectedTimeOption();
    if (!selectedTimeOption) return;
    this.examinationStartEmitted.emit(selectedTimeOption);
  }
}
