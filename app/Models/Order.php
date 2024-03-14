<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
      protected $fillable = [
        'notes',
        'user_id',
        'status',
        'products'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    protected function products(): Attribute
    {
        return Attribute::make(
            get: fn($value) => json_decode($value, true),
            set: fn($value) => json_encode($value),
        );
    }

}
