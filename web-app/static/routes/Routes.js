export class Routes {
  constructor() {
    this.routes = [];
  }

  register(path, route) {
    this.routes.push({ path, route });
  }

  get() {
    return () => Promise.all(this.routes.map(async ({ path, route }) => {
      const data = await route.getData();

      return {
        getData: () => data,
        path,
      };
    }));
  }
}
