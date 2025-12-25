import { Component, input, output } from '@angular/core';
import { IconComponent } from '../icon-component/icon-component';

@Component({
  selector: 'app-button',
  imports: [IconComponent],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  icon = input('');
  buttonType = input<'primary' | 'secondary' | 'error'>('primary');
  disabled = input(false);

  clickEmitted = output();

  click(): void {
    this.clickEmitted.emit();
  }
}
