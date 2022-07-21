import AuthorizationRequest from "../domain/interface/request/AuthorizationRequest";
import AuthorizationResponse from "../domain/interface/response/AuthorizationResponse";

export default class AuthorizationUseCase{

    static async execute(request: AuthorizationRequest): Promise<AuthorizationResponse> {
        return;
    }
        

}