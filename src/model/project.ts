
import env from '../config/imutablex';

export interface Project {
  walletKey: string;
  name: string;
  email:string;
  companyName: string;
}

export const createEmptyProject = (): Project => ({
  walletKey: env.defaultPrivateKey,
  name: "",
  email:"",
  companyName:""
});
