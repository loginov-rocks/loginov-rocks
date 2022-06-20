export class Routes {
  constructor() {
    this.routes = [];
  }

  registerRoute(path, route) {
    this.routes.push({ path, route });
  }

  getRoutes() {
    return () => Promise.all(this.routes.map(async ({ path, route }) => {
      const data = await route.getData();

      return {
        getData: () => data,
        path,
      };
    }));
  }
}
