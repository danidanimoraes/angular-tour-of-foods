import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FOODS } from '../mock-foods';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  public foods: Food[];
  public selectedFood: Food;

  constructor(
    private foodService: FoodService
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
      .subscribe((foods: Food[]) => this.foods = foods);
  }

  public onSelect(food: Food): void
  {
    this.selectedFood = food;
  }
}
