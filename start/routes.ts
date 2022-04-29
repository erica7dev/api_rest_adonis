/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

//configurando cors

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/moments', 'MomentsController').apiOnly() //apiOnly => só deixa rotas de api

  Route.post('/moments/:momentId/comments', 'CommentsController.store') //'.store' => exec. function
}).prefix('/api') //prefiro do cors pro front
//post = inserção