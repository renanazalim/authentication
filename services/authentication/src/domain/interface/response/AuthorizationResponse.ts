import { APIGatewayAuthorizerResult } from 'aws-lambda/trigger/api-gateway-authorizer';

export default class AuthorizationResponse {
  success: boolean;

  result: APIGatewayAuthorizerResult;
}