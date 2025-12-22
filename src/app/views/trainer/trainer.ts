import { Component, signal } from '@angular/core';
import { ManageComponent as ManageComponent } from '../../components/manage/manage';
import { TrainerViews } from './trainer.model';
import { TrainComponent } from '../../components/train/train';
import { ExamineComponent } from '../../components/examine/examine';
import { CardComponent } from '../../components/shared/card-component/card-component';

@Component({
  selector: 'app-trainer',
  imports: [ManageComponent, TrainComponent, ExamineComponent, CardComponent],
  templateUrl: './trainer.html',
  styleUrl: './trainer.scss',
})
export class TrainerComponent {
  protected view = signal<TrainerViews>('manage');

  protected examinationRunning = signal(false);

  setView(view: TrainerViews): void {
    this.view.set(view);
  }

  updateExaminationRunning(running: boolean): void {
    this.examinationRunning.set(running);
  }
}
