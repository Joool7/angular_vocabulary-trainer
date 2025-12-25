import { Component, input, model, OnInit } from '@angular/core';
import { RadioOption } from './radio.model';

@Component({
  selector: 'app-radio',
  imports: [],
  templateUrl: './radio-component.html',
  styleUrl: './radio-component.scss',
})
export class RadioComponent implements OnInit {
  options = input.required<RadioOption[]>();
  selectedOption = model.required<RadioOption | null>();

  ngOnInit(): void {
    if (this.selectedOption() === null && this.options().length > 0) {
      this.selectedOption.set(this.options()[0]);
    }
  }
}
