import AWS from 'aws-sdk'
import * as AWSconfig from './amazonConfig'
// const host = ""

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

export const getAllTeams = () => {
    return allTeams
}

export const getTeam = (id) => {
    return allTeams.find(t => t.id === id);
}

// Static data untill we get api working

export const saveToAWS = (videoBlob, key) => {
    return new Promise((resolve, reject) => s3.upload({
        Key: key,
        Body: videoBlob,
        ACL: 'public-read'
      }, function(err, data) {
        if (err) {
            reject(err.message)
          return alert('There was an error uploading your photo: ', err.message);
        }
        resolve(data)
        alert('Successfully uploaded photo.');
        console.log(data)
      }))
}

// '/'
export const getAllVideos = (delimiter) => {
    return new Promise((resolve, reject) => {
        s3.listObjects({ Delimiter: delimiter }, ( err, data ) => {
            if (err){
                reject(err.message)
                return alert('There is an error listing your videos: ' + err.message)
            } else{
                resolve(data.Contents)
            }
        })
    })
}

const allTeams = [
    {
        id: '1',
        name: 'Engineering',
        members: [
            {
                id: '11',
                name: 'Edgar Zapeka'
            },
            {
                id: '22',
                name: 'Cha Tumtaweetikul'
            },
            {
                id: '33',
                name: 'Armaan Dhanji'
            },
            {
                id: '44',
                name: 'Liam MacNeil'
            }
        ],
        subteams: [ {
            id: '2',
            name: 'Design',
            members: [
                {
                    id: '55',
                    name: 'Steve Jobs'
                },
                {
                    id: '66',
                    name: 'Jony Ive'
                },
            ],
            subteams: []
        },
        {
            id: '3',
            name: 'Management',
            members: [
                {
                    id: '77',
                    name: 'Jeff Bezos'
                },
            ],
            subteams: []
        }]
    },
    {
        id: '2',
        name: 'Design',
        members: [
            {
                id: '55',
                name: 'Steve Jobs'
            },
            {
                id: '66',
                name: 'Jony Ive'
            },
        ],
        subteams: []
    },
    {
        id: '3',
        name: 'Management',
        members: [
            {
                id: '77',
                name: 'Jeff Bezos'
            },
        ],
        subteams: []
    },
]