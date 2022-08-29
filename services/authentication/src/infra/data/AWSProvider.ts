import AWS from 'aws-sdk';

export const DynamoDBClient = () => new AWS.DynamoDB.DocumentClient();
