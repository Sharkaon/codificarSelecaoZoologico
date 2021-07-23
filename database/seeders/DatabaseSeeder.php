<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $senha = md5('123');

        DB::table('usuario')->insert([
            'email' => 'tubaraobranco@zoomail.com',
            'nomeCientifico' => 'Carcharodon carcharias',
            'apelido' => 'Tubarão-branco',
            'ala' => 'Aquário',
            'senha' => $senha,
            'ehZelador' => False,
            'imagem' => 'https://i.imgur.com/BD5bueq.jpg'
        ]);

        DB::table('usuario')->insert([
            'email' => 'cangured@zoomail.com',
            'nomeCientifico' => 'Macropus rufus',
            'apelido' => 'Canguru-vermelho',
            'ala' => 'Desértica',
            'senha' => $senha,
            'ehZelador' => False,
            'imagem' => 'https://i.imgur.com/HZz85Kf.jpg'
        ]);

        DB::table('usuario')->insert([
            'email' => 'pimperador@zoomail.com',
            'nomeCientifico' => 'Aptenodytes forsteri',
            'apelido' => 'Pinguim-Imperador',
            'ala' => 'Antártica',
            'senha' => $senha,
            'ehZelador' => False,
            'imagem' => 'https://i.imgur.com/ERwk8qO.jpg'
        ]);

        DB::table('usuario')->insert([
            'email' => 'zelador@zoomail.com',
            'senha' => $senha,
            'ehZelador' => True
        ]);
    }
}
