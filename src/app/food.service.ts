import { Injectable } from '@angular/core';
import { Food } from './food';
import { FOODS } from './mock-foods';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';

@Injectable()
export class FoodService {

  constructor(
    private messageService: MessageService
  ) { }

  public getFoods(): Observable<Food[]>
  {
    // Asynchronous operation
    this.messageService.addMessage('FoodService: fecthed foods.');
    return Observable.of(FOODS);
  }

  public getFood(id: number): Observable<Food>
  {
    this.messageService.addMessage(`FoodService: fecthed food ${id}.`);
    return Observable.of(FOODS.find((food: Food) => food.id === id));
  }
}
