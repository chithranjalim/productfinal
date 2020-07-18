import { Component, OnInit } from '@angular/core';
import {ProductModel} from './product.model';
import { ProductService } from '../product.service';
import { Routes, Router} from '@angular/router';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:String = "Product list";
  title1:String = "Edit form";
  imageWidth: Number = 50;
  imageMargin: Number = 2;
  showImage: boolean = true;
  products : ProductModel[];
  editProduct:ProductModel;
  
  
  constructor(public productService: ProductService,
    private _router: Router) { }

  toggleImage(): void {
  this.showImage = !this.showImage;
              };
  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe((data) => {
      this.products = JSON.parse(JSON.stringify(data));
  });

}
  onSubmit(){
        this.productService.postProduct(this.editProduct).subscribe((res) => {
        alert("success edit")
        this._router.navigate(['/'])
        console.log("submit")                 
      });
    }
    
  onEdit(product: ProductModel) {
    this.productService.editProduct= product;
  }

  onDelete(product) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.productService.deleteProduct(product._id).subscribe((res) => {
        this._router.navigate(['/products'])
        console.log(product._id);      
        console.log(product);
      });
    }
  }
}
  