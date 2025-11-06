<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $table = 'task';
    protected $primaryKey = 'task_id';
    public $timestamps = false;

    protected $guarded = ['id'];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
