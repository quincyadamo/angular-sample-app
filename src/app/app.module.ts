import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ProductListService } from './product-list.service';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './list/edit/edit.component';
import { NewComponent } from './list/new/new.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    NewComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProductListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
