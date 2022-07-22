
import env from '../config/imutablex';

export interface Login {
  key: string;
}

export const createEmptyLogin = (): Login => ({
  key: env.defaultPrivateKey
});
