import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { selectCount } from '../states/counter.selector';
import { AppState } from '../states/app.state';
import { decrement, increment, reset } from '../states/counter.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  count$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
  }
  increaseCount() {
    this.store.dispatch(increment());
  }
  decreaseCount() {
      this.store.dispatch(decrement());
    }
  resetCount() {
    this.store.dispatch(reset());
  }
}
