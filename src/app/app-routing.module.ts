import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods/foods.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';

const routes: Routes =
[
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'food/:id', component: FoodDetailComponent}
];

@NgModule({
  // You generally don't declare components in a routing module, so I've deleted declarations and CommonModule.
  // Exporting RouterModule makes router directives available for use in the AppModule components that will need them.
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule
{ }
