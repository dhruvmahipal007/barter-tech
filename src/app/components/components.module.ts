import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { IonicModule } from '@ionic/angular';
import { LoadingReastaurantComponent } from './loading-reastaurant/loading-reastaurant.component';

@NgModule({
  declarations: [EmptyScreenComponent, LoadingReastaurantComponent],
  imports: [CommonModule, IonicModule],
  exports: [EmptyScreenComponent, LoadingReastaurantComponent],
})
export class ComponentsModule {}
