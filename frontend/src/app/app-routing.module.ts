import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponents } from './page.not-found.components';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '**', component: PageNotFoundComponents}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
