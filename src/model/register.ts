
import env from '../config/imutablex';

export interface Register {
  privateKey: string,
  starkContractAddress : string,
  registrationContractAddress : string
}

export const createEmptyRegister = (): Register => ({
  privateKey: env.defaultPrivateKey,
  starkContractAddress: env.client.starkContractAddress,
  registrationContractAddress: env.client.registrationContractAddress

});
