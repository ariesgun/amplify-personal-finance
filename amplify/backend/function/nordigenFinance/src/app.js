/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["NORDIGEN_SECRET_ID","NORDIGEN_SECRET_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_NORDIGENSESSION_ARN
	STORAGE_NORDIGENSESSION_NAME
	STORAGE_NORDIGENSESSION_STREAMARN
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const NordigenClient = require('nordigen-node')
const { randomUUID } = require('crypto');

const aws = require('aws-sdk');
const ssm = new aws.SSM()

const getSecret = async () => {
    const result = await ssm.getParameters({Names: ["NORDIGEN_SECRET_ID","NORDIGEN_SECRET_KEY"].map(secretName => process.env[secretName]),
      WithDecryption: true,
    }).promise()
    return result;
  }

const docClient = new aws.DynamoDB.DocumentClient();

const addSession = async(params) => {
  try {
    await docClient.put(params).promise();
    return { body: 'Successfully created item!' }
  } catch (err) {
    return {error: err}
  }
}

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/item', async function(req, res) {
  // Add your code here
  
  const result = await getSecret()

  const client = new NordigenClient({
    secretId: result['Parameters'][0]['Value'],
    secretKey: result['Parameters'][1]['Value']
  });

  const tokenData = await client.generateToken()
  console.log('TokenData: ', tokenData)

  const institutions = await client.institution.getInstitutions({country: "NL"});
  console.log("Institutions: ", institutions)

  const institutionId = "RABOBANK_RABONL2U";

  // Initialize new bank session
  const init = await client.initSession({
    redirectUrl: "https://gocardless.com",
    institutionId: institutionId,
    referenceId: randomUUID()
  })

  // Get link to authorize in the bank
  // Authorize with your bank via this link, to gain access to account data
  const link = init.link;
  // requisition id is needed to get accountId in the next step
  const requisitionId = init.id;

  console.log('Link: ', link)
  console.log('requisitionId: ', requisitionId)
  
  // Get account id after completed authorization with a bank
  const requisitionData = await client.requisition.getRequisitionById(requisitionId);
  console.log(requisitionData)
  
  // Get account id from the list
  const accountId = requisitionData.accounts[0];
  console.log(accountId)
  
  // Instantiate account object
  const account = client.account(accountId);
  console.log(account)
  
  // Fetch account metadata
  const metadata = await account.getMetadata();
  console.log(metadata)
  
  // Fetch account balances
  const balances = await account.getBalances();
  console.log(balances)
  
  // Fetch account details
  const details = await account.getDetails();
  console.log(details)
  
  // Fetch account transactions
  const transactions = await account.getTransactions();
  console.log(transactions)

  const res2 = await addSession({
    TableName: 'nordigensession',
    Item: {
      id: requisitionData.id,
      created: requisitionData.created,
      institutionId: requisitionData.institution_id,
      agreement: requisitionData.agreement,
      reference: requisitionData.reference,
      link: requisitionData.link,
      status: requisitionData.status,
      username: 'aaa',
      accounts: [ 

      ]
    }
  })
  
  res.json({success: 'get call succeed! ', url: req.url});
});

app.get('/banks/*', async function(req, res) {
  console.log(req)
  
  const result = await getSecret()

  const client = new NordigenClient({
    secretId: result['Parameters'][0]['Value'],
    secretKey: result['Parameters'][1]['Value']
  });

  const tokenData = await client.generateToken()
  console.log('TokenData: ', tokenData)

  const institutions = await client.institution.getInstitutions({country: "NL"});
  console.log("Institutions: ", institutions)

  res.json({success: 'Success', url: req.url, body: JSON.stringify(institutions)});
});

app.get('/sync/*', async function(req, res) {
  // Add your code here
  console.log(req.params['0'])
  const payload = req.params['0']

  const result = await getSecret()

  const client = new NordigenClient({
    secretId: result['Parameters'][0]['Value'],
    secretKey: result['Parameters'][1]['Value']
  });

  const tokenData = await client.generateToken()
  console.log('TokenData: ', tokenData)
  
  // Get account id after completed authorization with a bank
  const requisitionData = await client.requisition.getRequisitionById(payload);
  console.log(requisitionData)
  
  // Get account id from the list
  const accountId = requisitionData.accounts[0];
  console.log(accountId)
  
  // Instantiate account object
  const account = client.account(accountId);
  console.log(account)
  
  // Fetch account metadata
  const metadata = await account.getMetadata();
  console.log(metadata)
  
  // Fetch account balances
  const balances = await account.getBalances();
  console.log(balances)
  
  // Fetch account details
  const details = await account.getDetails();
  console.log(details)
  
  // Fetch account transactions
  const transactions = await account.getTransactions();
  console.log(transactions)

  res.json({success: 'Success!', url: req.url, body: {
    'account': accountId,
    'metadata': metadata,
    'balances': balances,
    'transactions': transactions,
    'requisitionData': requisitionData
  }});
});

/****************************
* Example post method *
****************************/

app.post('/init', async function(req, res) {
  // Add your code here
  console.log(req.body)
  const payload = req.body

  const result = await getSecret()

  const client = new NordigenClient({
    secretId: result['Parameters'][0]['Value'],
    secretKey: result['Parameters'][1]['Value']
  });

  const tokenData = await client.generateToken()

  const institutionId = ''

  // Initialize new bank session
  const init = await client.initSession({
    redirectUrl: payload.redirect_url,
    institutionId: payload.bank_id,
    referenceId: randomUUID()
  })

  // Get link to authorize in the bank
  // Authorize with your bank via this link, to gain access to account data
  const link = init.link;
  // requisition id is needed to get accountId in the next step
  const requisitionId = init.id;

  console.log('Link: ', link)
  console.log('requisitionId: ', requisitionId)
  
  // Get account id after completed authorization with a bank
  const requisitionData = await client.requisition.getRequisitionById(requisitionId);
  console.log(requisitionData)

  res.json({success: 'post call succeed!', url: req.url, body: JSON.stringify(requisitionData)})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.listen(3000, async function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
