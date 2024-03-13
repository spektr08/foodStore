<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductsController extends Controller
{
   public function index() {
      $products = Product::paginate(10);
      return response()->json($products);
   }
}
