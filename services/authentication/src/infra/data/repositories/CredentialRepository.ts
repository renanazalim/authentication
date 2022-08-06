import { ICredentialRepository, IGetByServicedAndSecretKey } from "../../../domain/interface/repositories/ICredentialRepository";
import Credential from "../../../domain/model/Credential";
import { DynamoDBClient } from "../AWSProvider";

export class CredentialRepository implements ICredentialRepository{
    GetByServiceAndSecretKey: IGetByServicedAndSecretKey = async (service, secretKey) => {
      const DynamoDB = DynamoDBClient();
      const params = {
        TableName: `Api.Credential`,
        FilterExpression:
          'service = :service AND secretKey = :secretKey',
        ExpressionAttributeValues: {
          ':service': service,
          ':secretKey': secretKey
        }
      };
      const data = await DynamoDB.scan(params).promise();
      return data.Items[0] as Credential;
    };
    
}