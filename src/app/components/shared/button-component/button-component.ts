import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  icon = input('');
  buttonType = input<'primary' | 'secondary' | 'error'>('primary');

  clickEmitted = output();

  click(): void {
    this.clickEmitted.emit();
  }
}
