import { HomeRoute } from './HomeRoute';
import { Routes } from './Routes';

const routes = new Routes();

const homeRoute = new HomeRoute({
  gitHubDataUrl: 'https://loginov.rocks/github.json',
});

routes.register('/', homeRoute);

export default routes;
