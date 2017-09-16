import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from './product'

@Injectable()
export class ProductListService {
  observedProductList = new BehaviorSubject(null);
  observedNextProductId = new BehaviorSubject(null);
  updateProducts(productList: Array<Product>){
    this.observedProductList.next(productList);
  }
  updateNextProductId(nextProductId: number){
    this.observedNextProductId.next(nextProductId);
  }
}