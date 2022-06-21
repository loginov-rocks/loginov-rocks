const isContentfulEntry = (value) => {
  if (value === null || Array.isArray(value) || typeof value !== 'object') {
    return false;
  }

  // Contentful Entry check is simplified here.
  return value.sys !== undefined;
};

export const transformToCmsComponent = (value) => {
  if (!isContentfulEntry(value)) {
    return value;
  }

  const type = value.sys.contentType.sys.id;
  const props = {};

  Object.keys(value.fields).forEach((key) => {
    const subValue = value.fields[key];

    if (Array.isArray(subValue)) {
      props[key] = subValue.map((subSubValue) => transformToCmsComponent(subSubValue));
    } else {
      props[key] = transformToCmsComponent(subValue);
    }
  });

  return { props, type };
};
