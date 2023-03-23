AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'
Description: An AWS Serverless Specification template describing your function.
Resources:
  post1:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: lambda_function.lambda_handler
      Runtime: python3.7
      CodeUri: .
      Description: ''
      MemorySize: 128
      Timeout: 3
      Role: 'arn:aws:iam::940168446867:role/PostRole'
      Environment:
        Variables:
          SNS_ARN: 'arn:aws:sns:us-east-2:940168446867:booksTopic'
          TABLE_NAME: books
