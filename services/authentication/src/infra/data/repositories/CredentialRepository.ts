import Credential from "../../../domain/model/Credential";
import { DynamoDBClient } from "../AWSProvider";

export class CredentialRepository {
    private dynamoDbClient = DynamoDBClient();

    async getByServiceAndSecretKey(service: string, secretKey: string): Promise<Credential> {
      const params = {
        TableName: `Api.Credential`,
        FilterExpression:
          'service = :service AND secretKey = :secretKey',
        ExpressionAttributeValues: {
          ':service': service,
          ':secretKey': secretKey
        }
      };
      return (await this.dynamoDbClient.query(params).promise()).Items[0] as Credential;
    }    
}