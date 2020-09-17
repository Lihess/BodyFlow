import Amplify, { Storage } from 'aws-amplify';

// AWS S3와 연결하기 위함. serverless 활용
// https://dingcodingco.tistory.com/14
// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#manual-setup-import-storage-bucket
Amplify.configure({
    Auth: {
        identityPoolId: 'ap-northeast-2:fcc31825-3672-46c3-896c-8386f6890f03', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'ap-northeast-2', // REQUIRED - Amazon Cognito Region
    },
    Storage: {
        AWSS3: {
           bucket: 'body-flow', //REQUIRED - Amazon S3 bucket
           region: 'ap-northeast-2', //OPTIONAL - Amazon service region
       }
   }
});

// 사진 업로드를 위한 함수
const s3UploadPhoto = async(uri, fileName) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob()

        // S3에 사진 저장
        Storage.put(`images/${fileName}`, blob, {
            contentType: `image/${fileName}`
        })
    } catch (err) {
        console.log(err)
    }
}

// 사진 삭제
const s3DeletePhoto = async(uri) => {
    try {
        const fileName = uri.substr(uri.lastIndexOf('/') + 1)

        Storage.remove(`images/${fileName}`)
    } catch (err) {
        console.log(err)
    }
}


export { s3UploadPhoto, s3DeletePhoto }