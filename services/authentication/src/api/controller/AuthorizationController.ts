import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AuthorizationRequest from "../../domain/interface/request/AuthorizationRequest";
import AuthorizationResponse from "../../domain/interface/response/AuthorizationResponse";
import AuthorizationUseCase from "../../useCase/AuthorizationUseCase";

export default class AuthorizationController {

    private authorizationUseCase = new AuthorizationUseCase();

    async authorization(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>{
        const request: AuthorizationRequest = JSON.parse(event.body);
        
        try{
          const response: AuthorizationResponse = await this.authorizationUseCase.execute(request);

          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          };

          return {
            headers,
            statusCode: 200,
            body: JSON.stringify(response)
          } as APIGatewayProxyResult;

        } catch(error){ }
    }

}