import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from '../product.service';
import { ProductModel } from '../product-list/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from "../auth.service";


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

export class NewProductComponent implements OnInit {
title:String = "Add Product";
  constructor(private productService: ProductService,
     private router:Router,
     private auth: AuthService,) { }
productItem = new ProductModel(null,null,null,null,null,null,null,null);
  ngOnInit(): void {
    this.productService.test()
    .subscribe(
      res => console.log("success"),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.auth.logoutUser();
          }
        }
      });
  }
 
addProduct()
{
  
  this.productService.newProduct(this.productItem)
  
            console.log("added");
            alert("success");
           this.router.navigate(['/products']);
        }
 
}