// import * as cdk from 'aws-cdk-lib';
// import * as s3 from 'aws-cdk-lib/aws-s3';
// import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
// import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
// import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

// export class InfraStack extends cdk.Stack {
//   constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     // Configura el bucket S3
//     const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
//       websiteIndexDocument: 'index.html',
//       removalPolicy: cdk.RemovalPolicy.DESTROY,
//       publicReadAccess: true,
//       autoDeleteObjects: true,
//     });

//     // Configura la distribución CloudFront
//     const distribution = new cloudfront.Distribution(this, 'Distribution', {
//       defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
//     });

//     // Despliega tu aplicación React en el bucket S3
//     new s3deploy.BucketDeployment(this, 'DeployWebsite', {
//       sources: [s3deploy.Source.asset('../packages/web/build')],
//       destinationBucket: websiteBucket,
//       distribution,
//     });

//     // Agrega la URL de CloudFront como una salida
//     new cdk.CfnOutput(this, 'DistributionOutput', {
//       value: distribution.distributionDomainName,
//       exportName: 'DistributionDomainName',
//     });

//   }
// }
