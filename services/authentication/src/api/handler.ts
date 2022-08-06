import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import AuthorizationController from "./controller/AuthorizationController";

const authorizationController = new AuthorizationController();

export const authorization: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => authorizationController.authorization(event);