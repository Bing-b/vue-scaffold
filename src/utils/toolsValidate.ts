export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

export const isValidUsername = (str: string): boolean => {
  return str.trim().length > 0;
};
