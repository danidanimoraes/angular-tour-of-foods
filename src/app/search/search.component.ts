import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Observable, Subject } from 'rxjs';
import { Food } from '../food';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  foods$: Observable<Food[]>;

  // A Subject is both a source of observable values and an Observable itself.
  // You can also push values into that Observable by calling its next(value).
  // The searchTerms becomes an Observable emitting a steady stream of search terms.
  private searchTerms = new Subject<string>();

  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.foods$ = this.searchTerms
      .pipe(
        // RxJS operators that reduce the number of calls to the search()

        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        // switch to new search observable each time the term changes.
        // Preserves the original request order while returning only the observable
        //from the most recent HTTP method call. Results from prior calls are canceled and discarded.
        switchMap((term: string) => this.foodService.search(term)),
      );
  }

  // Push a search term into the observable stream.
  public search(term: string): void {
    this.searchTerms.next(term);
  }
}
