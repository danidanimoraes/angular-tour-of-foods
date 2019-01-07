import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public foods: Food[] = [];
  
  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.populateFoods();
  }

  private populateFoods(): void{
    this.foodService
      .getFoods()
      .subscribe((foods: Food[]) => 
        this.foods = foods.sort((food1, food2) => food1.points < food2.points ? 0 : -1)
          .slice(1,5)
        );
  }
}
