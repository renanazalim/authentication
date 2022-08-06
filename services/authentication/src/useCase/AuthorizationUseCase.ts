import * as jwt from 'jsonwebtoken'
import { ICredentialRepository } from "../domain/interface/repositories/ICredentialRepository";
import AuthorizationRequest from "../domain/interface/request/AuthorizationRequest";
import AuthorizationResponse from "../domain/interface/response/AuthorizationResponse";
import Credential from "../domain/model/Credential";
import { CredentialRepository } from "../infra/data/repositories/CredentialRepository";

export default class AuthorizationUseCase{

    private readonly credentialRepository: ICredentialRepository;

    constructor(){
        this.credentialRepository = new CredentialRepository();
    }

    async execute(request: AuthorizationRequest): Promise<AuthorizationResponse> {
        //BUSCAR DADOS COM BASE NO CLIENTID E SECRETKEY
        let credential: Credential = await this.credentialRepository.GetByServiceAndSecretKey(request.service, request.secretKey);
        if(credential){
            //VALIDAR SE O USUARIO TEM PERMISSAO
            //GERAR UM TOKEN E RETORNAR
            return {
                service: request.service,
                token: jwt.sign(credential.roles, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TOKEN, algorithm: 'HS256' })
            } as AuthorizationResponse;
        }
        return null;
    }     
}
