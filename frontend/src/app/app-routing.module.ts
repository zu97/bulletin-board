import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponents } from './page.not-found.components';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ItemsComponent } from './pages/items/items.component';
import { CreateItemComponent } from './pages/create-item/create-item.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';

const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'items/create', component: CreateItemComponent},
  {path: 'items/:id', component: ItemDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponents}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
