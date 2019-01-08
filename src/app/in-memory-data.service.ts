import { Injectable } from '@angular/core';
import { Food } from './food';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService{

  createDb()
  {
    // Maps to /foods
    const foods = [
      {id: 1, name: 'Donut', points: 9, description: 'I love vanilla frosted from Dunkin'},
      {id: 2, name: 'Waffle', points: 9, description: 'Specifically belgian waffles. They are thick!'},
      {id: 3, name: 'Pancake', points: 9, description: 'Try Cinn-A-Stack from IHOP'},
      {id: 4, name: 'Lasagna', points: 10, description: 'I like them juicy, dripping sauce'},
      {id: 5, name: 'Cinnamon roll', points: 10, description: 'From cinnabon'},
      {id: 6, name: 'Cheesecake', points: 8, description: 'Cheesecake Factory\'s banana cheesecake'},
      {id: 7, name: 'Biscuit', points: 7, description: 'FROM KFC!! And Red Lobster too'},
      {id: 8, name: 'Salmon', points: 7, description: 'Herb crusted salmon <3'},
      {id: 9, name: 'Aspargus', points: 7, description: 'With salmon'},
      {id: 10, name: 'Eggo', points: 6, description: 'I\'m eleven!'},
      {id: 11, name: 'Croissant', points: 6, description: ':)'},
      {id: 12, name: 'Onion', points: 1, description: 'They steal other tastes! Everything tastes like onion!'},
      {id: 13, name: 'Salad', points: 4, description: 'Too healthy'},
      {id: 14, name: 'Lobster', points: 0, description: 'HOW DO YOU FEEL HUNGRY LOOKING AT THEM?'},
    ];
    return {foods};
  }

  constructor() { }

  // Overrides to ensure food always has an id.
  genId(foods: Food[]): number
  {
    return foods.length + 1;
  }
}
