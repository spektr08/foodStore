<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
      protected $fillable = [
        'name',
        'description',
        'price',
    ];


    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'order_product');
    }

}
