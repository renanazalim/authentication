import AWS from 'aws-sdk';

export const DynamoDBClient = () => {
  return new AWS.DynamoDB.DocumentClient();
};
