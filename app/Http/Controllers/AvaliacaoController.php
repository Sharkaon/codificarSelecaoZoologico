<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class AvaliacaoController extends Controller
{
    /**
     * 
     */

    public function index(){
        $avaliacoes = DB::table('avaliacao')->get();

        return $avaliacoes;
    }
    
    public function mostrarAvaliacao($id){
        $avaliacao = DB::table('avaliacao')->where('avaliacao_id', $id)->first();

        return $avaliacao;
    }

    public function criarAvaliacao(Request $request){
        $avaliado_id = $request->avaliado_id;
        $avaliador_id = $request->avaliador_id;
        $ehPositiva = $request->ehPositiva;

        $resultado = DB::table('avaliacao')->insert([
            'avaliado_id' => $avaliado_id,
            'avaliador_id' => $avaliador_id,
            'ehPositiva' => $ehPositiva
        ]);

        return [$avaliado_id, $avaliador_id, $ehPositiva]   ;
    }

    // public function atualizarAvaliacao($id, $avaliado_id, $avaliador_id, $positiva){        
    //     $resultado = DB::table('avaliacao')->where('avaliacao_id', $id)->update([
    //         'avaliado_id' => $avaliado_id,
    //         'avaliador_id' => $avaliador_id,
    //         'positiva' => $positiva
    //     ]);

    //     return $resultado;
    // }

    // public function deletarAvaliacao($id){
    //     $resultado = DB::table('avaliacao')->where('avaliacao_id', $id)->delete();

    //     return $resultado;
    // }
}
