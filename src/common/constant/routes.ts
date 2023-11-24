import { ControllersEnum } from '../enum/controllers.enum';

export const Routes = {
  [ControllersEnum.Auth]: {
    login: 'login/email',
    registerByEmail: 'register/email',
  },
} as const;
