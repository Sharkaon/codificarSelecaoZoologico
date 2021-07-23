<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//      return view('welcome');
// });

Route::get('usuarios', [App\Http\Controllers\UsuarioController::class, 'index']);
Route::get('/usuarios/autenticar/{email}/{senha}/{tipo}', [App\Http\Controllers\UsuarioController::class, 'autenticarUsuario']);
Route::get('/usuarios/match/{usuario_id}/{nomeCientifico?}/{apelido?}/{ala?}', [App\Http\Controllers\UsuarioController::class, 'pegarMatchGet']);
Route::post('/usuarios/match', [App\Http\Controllers\UsuarioController::class, 'pegarMatch']);
Route::post('/usuarios/cadastrarUsuario', [App\Http\Controllers\UsuarioController::class, 'cadastrarUsuario']);
Route::post('/usuarios/cadastrarZelador', [App\Http\Controllers\UsuarioController::class, 'cadastrarZelador']);

Route::get('avaliacoes', [App\Http\Controllers\AvaliacaoController::class, 'index']);
Route::post('avaliacoes/criar', [App\Http\Controllers\AvaliacaoController::class, 'criarAvaliacao']);

Route::view('/{path?}', 'welcome');
