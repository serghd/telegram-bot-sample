import "tsconfig-paths/register";
import { App } from "./core/App";
import { Services } from "./services/Services";

export const services = new Services();
const app = new App();

services.init().then(() => {
   app.start();
});
