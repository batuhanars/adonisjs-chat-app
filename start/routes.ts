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

import Route from "@ioc:Adonis/Core/Route";
import User from "App/Models/User";
import Chat from "App/Models/Chat";

Route.get("/", async ({ view, auth }) => {
  const chats = await Chat.all();
  return await view.render("home", { chats, user: auth.use("web").user });
})
  .middleware("auth:web")
  .as("home");

Route.post("/", async ({ auth, request, response }) => {
  const newMessage = await Chat.create({
    senderId: auth.use("web").user?.id,
    message: request.input("message"),
  });
  return response.send(newMessage);
})
  .middleware("auth:web")
  .as("message.send");

Route.get("/giris-yap", async ({ view }) => {
  return view.render("login");
}).as("login");

Route.post("/giris-yap", async ({ auth, request, response }) => {
  const email = request.input("email");
  const password = request.input("password");

  await auth.use("web").attempt(email, password);
  response.redirect("/");
}).as("login.post");

Route.get("/kayit-ol", async ({ view }) => {
  return view.render("register");
}).as("register");

Route.post("/kayit-ol", async ({ auth, request, response }) => {
  const email = request.input("email");
  const password = request.input("password");

  await User.create(request.body());

  await auth.use("web").attempt(email, password);
  response.redirect("/");
}).as("register.post");
