import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Trainer } from "./views/trainer/trainer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Trainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('vocabulary-trainer');
}
