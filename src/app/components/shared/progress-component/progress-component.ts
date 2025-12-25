import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-progress',
  imports: [],
  templateUrl: './progress-component.html',
  styleUrl: './progress-component.scss',
})
export class ProgressComponent {
  value = input.required<number>();
  direction = input<'increasing' | 'decreasing'>('increasing');

  valueInPercent = computed(() =>
    this.direction() === 'increasing' ? this.value() : 100 - this.value()
  );
}
