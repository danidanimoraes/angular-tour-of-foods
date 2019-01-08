import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  public foods: Food[];

  constructor(
    private foodService: FoodService,
    private messageService: MessageService
  )
  { 
    // Don't use constructor to fetch data, use ngOnInit
    /**
     * Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
     * The constructor shouldn't do anything.
     * It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.
     */
  }

  ngOnInit()
  {
    this.populateFoods();
  }

  private populateFoods(): void
  {
    this.foodService
      .getFoods()
      .subscribe((foods: Food[]) => this.foods = foods.sort((food1, food2) => food1.points <= food2.points ? 0 : -1));
  }

  public add(name: string, description: string, points: number): void
  {
    if(!name || !description || !points)
    {
      alert('Please insert all data for the food!');
      return;
    }

    this.foodService
      .add({name, description, points} as Food)
      .subscribe((food) => {
        this.foods.push(food);
        this.foods.sort((food1, food2) => food1.points <= food2.points ? 0 : -1)
      });
  }

  public delete(foodToDelete: Food): void
  {
    this.foodService
      .delete(foodToDelete)
      .subscribe(() => {
        this.foods = this.foods.filter((food) => food !== foodToDelete);
        this.foods.sort((food1, food2) => food1.points <= food2.points ? 0 : -1)
      });
  }

}
