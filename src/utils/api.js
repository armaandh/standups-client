import AWS from 'aws-sdk'
import * as AWSconfig from './amazonConfig'

export const endpointUrl = AWSconfig.endpointUrl
var bucketName = AWSconfig.bucketName
AWS.config.region = AWSconfig.region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWSconfig.identityPoolId,
})

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: bucketName}
});