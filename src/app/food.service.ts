import { Injectable } from '@angular/core';
import { Food } from './food';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TEMPLATE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';

@Injectable()
export class FoodService {

  private foodsURL = 'api/foods/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  public getFoods(): Observable<Food[]>
  {
    // Asynchronous operation
    return this.httpClient
      .get<Food[]>(this.foodsURL)
      .pipe(
        // Tap doesn't touch the values, it looks at them and passes them along
        tap(() => this.log('Fecthed foods')),
        catchError(this.handleError('getFoods', []))
      );
  }

  public getFood(id: number): Observable<Food>
  {
    return this.httpClient
      .get<Food>(this.foodsURL.concat(`${id}`))
      .pipe(
        tap(() => this.log(`Fecthed food ${id}`)),
        catchError(this.handleError<Food>(`getFood ${id}`))
      );
  }

  public update(food: Food): Observable<Food>
  {
    return this.httpClient
      .put<Food>(this.foodsURL.concat(`${food.id}`), food, this.httpOptions)
      .pipe(
        tap(() => this.log(`Updated food ${food.id}`)),
        catchError(this.handleError<Food>(`updateFood ${food.id}`))
      );
  }

  public add(food: Food): Observable<Food>
  {
    return this.httpClient
      .post<Food>(this.foodsURL, food, this.httpOptions)
      .pipe(
        tap(() => this.log(`Added food ${food.id}`)),
        catchError(this.handleError<Food>(`updateFood ${food.id}`))
      );
  }

  public delete(food: Food): Observable<Food>
  {
    return this.httpClient
      .delete<Food>(this.foodsURL.concat(`${food.id}`))
      .pipe(
        tap(() => this.log(`Deleted food ${food.id}`)),
        catchError(this.handleError<Food>(`updateFood ${food.id}`))
      );
  }

  public search(term: string): Observable<Food[]>
  {
    if(!term.trim())
    {
      return Observable.of([]);
    }
  
    return this.httpClient
      .get<Food[]>(this.foodsURL.concat(`?name=${term}`))
      .pipe(
        tap(() => this.log(`Found foods mathcing ${term}`)),
        catchError(this.handleError<Food[]>('searchFoods', []))
      );
  }

  private log(message: string): void
  {
    this.messageService.addMessage(`FoodService: ${message}.`);
  }

  // result = to return as the observable result
  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error) => 
    {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return Observable.of(result as T);
    }
  }
}
