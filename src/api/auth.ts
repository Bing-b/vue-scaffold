import requestService from '@/utils/request';

export const getPublicKey = <T = string>() => {
  return requestService<T>({
    url: '/auth/public-key',
    method: 'GET',
  });
};

export const loginApi = <T = any>(data: { info: string }) => {
  return requestService<T>({
    url: '/auth/login',
    method: 'POST',
    data,
  });
};

export const getCurrentUserRolePermissions = <T = any>() => {
  return requestService<T>({
    url: '/auth/permissions',
    method: 'GET',
  });
};

export const updatePasswordApi = <T = any>(data: any) => {
  return requestService<T>({
    url: '/auth/update-password',
    method: 'POST',
    data,
  });
};
