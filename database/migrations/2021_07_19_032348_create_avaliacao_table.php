<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAvaliacaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avaliacao', function (Blueprint $table) {
            $table->id('avaliacao_id');
            $table->unsignedBigInteger('avaliado_id');
            $table->unsignedBigInteger('avaliador_id');
            $table->foreign('avaliado_id')->references('usuario_id')->on('usuario');
            $table->foreign('avaliador_id')->references('usuario_id')->on('usuario');
            $table->boolean('ehPositiva');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('avaliacao');
    }
}
