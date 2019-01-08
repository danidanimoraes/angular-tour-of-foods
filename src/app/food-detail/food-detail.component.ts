import { Component, OnInit, Input } from '@angular/core';
import { Food } from '../food';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../food.service';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  @Input()
  food: Food;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private messageService: MessageService,
    private location: Location //interacting with the browser. You'll use it later to navigate back to the view that navigated here.
  ) { }

  ngOnInit() {
    // (+) operator converts the string to a number
    this.getFood(+this.route.snapshot.paramMap.get('id'));
  }

  private getFood(id: number): void
  {
    this.foodService
      .getFood(id)
      .subscribe((food: Food) => this.food = food);
  }

  public goBack(): void
  {
    this.location.back();
  }

  public save(): void
  {
    this.foodService
      .update(this.food)
      .subscribe(() => this.goBack());
  }
}
