import { APIGatewayRequestAuthorizerEvent } from "aws-lambda/trigger/api-gateway-authorizer";

export default class AuthorizationRequest {
    event: APIGatewayRequestAuthorizerEvent;
  }
  