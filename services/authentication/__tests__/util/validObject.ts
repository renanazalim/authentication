import faker from 'faker';
import * as jwt from 'jsonwebtoken';
import AuthorizationDto from '../../src/domain/dto/AuthorizationDto';
import AuthorizationRequest from '../../src/domain/interface/request/AuthorizationRequest';

const getValidMethodArn = (apiId?: string): string =>
  `arn:aws:execute-api:us-east-1:012345678910:${
    apiId ?? 'apiIdNotUsedInServiceBasedAuth'
  }/*/GET/`;

const getFullAccessAuthorizationDto = (roles?: string): AuthorizationDto => ({
  claims: {
    principalId: faker.random.word(),
    roles: roles || 'diplomas.*'
  }
});

const getFullAccessHeaders = (roles?: string): { [key: string]: string } => ({
  Authorization: `Bearer ${jwt.sign(
    getFullAccessAuthorizationDto(roles),
    process.env.JWT_SECRET_KEY
  )}`
});

const getValidAuthorizeRequest = (roles?: string): AuthorizationRequest => ({
  event: {
    type: 'REQUEST',
    methodArn: getValidMethodArn(),
    resource: 'resource',
    path: 'path',
    httpMethod: 'GET',
    headers: getFullAccessHeaders(roles),
    multiValueHeaders: null,
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: 'accountId',
      apiId: 'apiId',
      authorizer: undefined,
      protocol: 'protocol',
      httpMethod: 'GET',
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: 'sourceIp',
        user: null,
        userAgent: null,
        userArn: null,
        clientCert: null
      },
      path: 'path',
      stage: 'stage',
      requestId: 'requestId',
      requestTimeEpoch: 1,
      resourceId: 'resourceId',
      resourcePath: 'resourcePath'
    }
  }
});

export { getValidAuthorizeRequest, getValidMethodArn };
