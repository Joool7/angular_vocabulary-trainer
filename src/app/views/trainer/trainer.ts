import { Component, signal } from '@angular/core';
import { ManageComponent as ManageComponent } from '../../components/manage/manage';
import { TrainerViews } from './trainer.model';
import { TrainComponent } from '../../components/train/train';
import { ExamineComponent } from '../../components/examine/examine';

@Component({
  selector: 'app-trainer',
  imports: [ManageComponent, TrainComponent, ExamineComponent],
  templateUrl: './trainer.html',
  styleUrl: './trainer.scss',
})
export class TrainerComponent {
  protected view = signal<TrainerViews>('manage');

  setView(view: TrainerViews): void {
    this.view.set(view);
  }
}
