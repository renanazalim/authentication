import * as jwt from 'jsonwebtoken'
import AuthorizationRequest from "../domain/interface/request/AuthorizationRequest";
import AuthorizationResponse from "../domain/interface/response/AuthorizationResponse";
import Credential from "../domain/model/Credential";
import { CredentialRepository } from "../infra/data/repositories/CredentialRepository";

export default class AuthorizationUseCase{
    private readonly credentialRepository: CredentialRepository =
    new CredentialRepository();

    async execute(request: AuthorizationRequest): Promise<AuthorizationResponse> {
        const credential: Credential = await this.credentialRepository.getByServiceAndSecretKey(request.service, request.secretKey);
        if(credential){
            return {
                service: request.service,
                token: jwt.sign(credential.roles, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TOKEN, algorithm: 'HS256' })
            } as AuthorizationResponse;
        }
        return null;
    }     
}
