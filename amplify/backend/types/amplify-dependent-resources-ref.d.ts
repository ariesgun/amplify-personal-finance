export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "personalfinancialtra": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "PersonalFinancialTracker": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "PersonalFinancialTracker": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "nordigenFinance": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "personalfinancialtralayernordigen": {
      "Arn": "string"
    }
  },
  "storage": {
    "nordigensession": {
      "Arn": "string",
      "Name": "string",
      "PartitionKeyName": "string",
      "PartitionKeyType": "string",
      "Region": "string",
      "SortKeyName": "string",
      "SortKeyType": "string",
      "StreamArn": "string"
    }
  }
}