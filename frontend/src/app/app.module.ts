import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { categoriesReducer } from './store/categories.reducer';
import { CategoriesEffects } from './store/categories.effects';
import { itemsReducer } from './store/items.reducer';
import { ItemsEffects } from './store/items.effects';

import { AppComponent } from './app.component';
import { PageNotFoundComponents } from './page.not-found.components';
import { LayoutComponent } from './ui/layout/layout.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ItemsComponent } from './pages/items/items.component';
import { CreateItemComponent } from './pages/create-item/create-item.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true,
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponents,
    LayoutComponent,
    LoaderComponent,
    CenteredCardComponent,
    RegisterComponent,
    LoginComponent,
    FileInputComponent,
    ItemsComponent,
    CreateItemComponent,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    StoreModule.forRoot({
      users: usersReducer,
      categories: categoriesReducer,
      items: itemsReducer
    }, {metaReducers}),
    EffectsModule.forRoot([
      UsersEffects,
      CategoriesEffects,
      ItemsEffects
    ]),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatListModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
