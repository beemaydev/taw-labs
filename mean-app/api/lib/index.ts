import App from './app';
import UserController from './controllers/user.controller';
import IndexController from "./controllers/index.controller";
import PostController from './controllers/post.controller';

const app: App = new App([
    new UserController(),
    new PostController(),
    new IndexController()
]);

app.listen();
