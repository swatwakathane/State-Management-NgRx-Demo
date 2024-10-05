import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { selectCount } from '../store/counter.selector';
import { AppState } from '../store/app.state';
import { decrement, increment, reset } from '../store/counter.action';

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
    this.count$.pipe(take(1)).subscribe(count => {
      if (count > 0) {
        this.store.dispatch(decrement());
      }
      else {
        alert('Counter can not be less than 0');
      }
    });
  }

  resetCount() {
    this.store.dispatch(reset());
  }
}
