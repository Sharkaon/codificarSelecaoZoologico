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
    
    public function mostrarUsuario($id){
        $usuario = DB::table('usuario')->where('usuario_id', $id)->first();

        return $usuario;
    }

    public function cadastrarUsuario(Request $request){
        $email = $request->email;
        $senha = md5($request->senha);
        $nomeCientifico = $request->nomeCientifico;
        $apelido = $request->apelido;
        $ala = $request->ala;
        $imagem = $request->imagem;

        $resultado = DB::table('usuario')->insert([
            'email' => $email,
            'senha' => $senha,
            'nomeCientifico' => $nomeCientifico,
            'apelido' => $apelido,
            'ala' => $ala,
            'ehZelador' => False,
            'imagem' => $imagem
        ]);

        return $resultado;
    }

    public function cadastrarZelador(Request $request){
        $email = $request->email;
        $senha = md5($request->senha);

        $resultado = DB::table('usuario')->insert([
            'email' => $email,
            'senha' => $senha,
            'ehZelador' => True
        ]);

        return $resultado;
    }

    public function deletarUsuario($id){
        $resultado = DB::table('usuario')->where('usuario_id', $id)->delete();

        return $resultado;
    }

    public function autenticarUsuario($email, $senha, $tipo){
        $senha = md5($senha);

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
    
    public function pegarMatchGet($usuario_id, $nomeCientifico = null, $apelido = null, $ala = null){

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
}
