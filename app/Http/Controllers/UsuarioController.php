<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class UsuarioController extends Controller
{
    /**
     * 
     */

    public function index(){
        $usuarios = DB::table('usuario')->get();
        
        return $usuarios;
    }

    public function cadastrarUsuario(Request $request){
        $email = $request->email;
        $senha = md5($request->senha);
        $nomeCientifico = $request->nomeCientifico;
        $apelido = $request->apelido;
        $ala = $request->ala;
        $imagem = $request->imagem;

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $resultado = DB::table('usuario')->insert([
                'email' => $email,
                'senha' => $senha,
                'nomeCientifico' => $nomeCientifico,
                'apelido' => $apelido,
                'ala' => $ala,
                'ehZelador' => False,
                'imagem' => $imagem
            ]);
        }else{
            $resultado = null;
        }

        return $resultado;
    }

    public function cadastrarZelador(Request $request){
        $email = $request->email;
        $senha = md5($request->senha);

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $resultado = DB::table('usuario')->insert([
                'email' => $email,
                'senha' => $senha,
                'ehZelador' => True
            ]);
        } else {
            $resultado = null;
        }

        return $resultado;
    }

    public function autenticarUsuario(Request $request){
        $email = $request->email;
        $senha = md5($request->senha);
        $tipo = $request->tipo;

        $resultado = DB::table('usuario')
            ->where('email', $email)
            ->where('senha', $senha)
            ->where('ehZelador', $tipo)
            ->get();

        return $resultado;
    }
    
    public function pegarMatch(Request $request){
        $usuario_id = $request->usuario_id;
        
        if($request->nomeCientifico)
            $nomeCientifico = $request->nomeCientifico;
        else
            $nomeCientifico = null;

        if($request->apelido)
            $apelido = $request->apelido;
        else
            $apelido = null;

        if($request->ala)
            $ala = $request->ala;
        else
            $ala = null;

        $usuarios = DB::table('usuario')
            ->whereRaw('usuario_id NOT IN (SELECT avaliado_id FROM zoologico.avaliacao WHERE avaliador_id = ?)', $usuario_id)
            ->where('ehZelador', 0)
            ->where('usuario_id', '<>', $usuario_id)
            ->when($nomeCientifico, function($query, $nomeCientifico) {
                return $query->where('nomeCientifico', 'LIKE', '%'.$nomeCientifico.'%');
            })
            ->when($apelido, function($query, $apelido) {
                return $query->where('apelido', 'LIKE', '%'.$apelido.'%');
            })
            ->when($ala, function($query, $ala) {
                return $query->where('ala', 'LIKE', '%'.$ala.'%');
            })
            ->get();

        return $usuarios;
    }

    public function deletarUsuario($avaliado_id){
        $resultado = DB::table('usuario')->where('usuario_id', $avaliado_id)->delete();

        return $resultado;
    }
}
