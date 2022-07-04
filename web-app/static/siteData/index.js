import { dolphRoute } from '../routes';

const getSiteData = async () => {
  const dolphRouteData = await dolphRoute.getData();

  return { dolphRouteData };
};

// Default export used to highlight singleton pattern.
export default getSiteData;
