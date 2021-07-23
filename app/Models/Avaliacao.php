<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    use HasFactory;

    protected $table = 'avaliacao';
    protected $primaryKey = 'avaliacao_id';

    protected $fillable = [
        'avaliado_id',
        'avaliador_id',
        'ehPositiva',
    ];
}
