Os pacotes adicionais usados no projeto foram o react-router-dom (5.2.0), axios(0.21.1) e o material-ui (@core: 4.12.1 @icons: 4.11.2). A príncipio, ambos podem ser instalados com um "npm install".
Também é necessário alterar as informações do banco em "app/config/database.php".
Migrations e seeders estão inclusas, pra rodar elas pode-se usar "php artisan migrate" e "php artisan db:seed".
Além disso, é possível que o imgur recuse requests de um localhost para pegar as imagens. Nesse caso, o adequado seria hospedar em outro lugar.
