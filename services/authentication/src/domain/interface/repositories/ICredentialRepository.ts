import Credential from "../../model/Credential";

export interface IGetByServicedAndSecretKey {
  (service: string, secretKey: string): Promise<Credential>;
}

export interface ICredentialRepository {
    GetByServiceAndSecretKey: IGetByServicedAndSecretKey;
}