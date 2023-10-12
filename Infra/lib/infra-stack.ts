import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';

import * as iam from 'aws-cdk-lib/aws-iam';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Bucket S3 para el sitio web
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'abcjobs-web',
      accessControl: s3.BucketAccessControl.PRIVATE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Bucket S3 para los logs de CloudFront
    const logsBucket = new s3.Bucket(this, 'CloudFrontLogsBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      accessControl: s3.BucketAccessControl.LOG_DELIVERY_WRITE,  // Habilitar el control de acceso ACL para la entrega de logs
      autoDeleteObjects: true
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, 'CloudFrontOAI', {
      comment: 'OAI for the abc jobs website'
    });

    // Política de permisos para permitir que CloudFront acceda al bucket S3
    websiteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [websiteBucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }));
    
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(websiteBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      enableLogging: true,  // Habilitar los logs
      logBucket: logsBucket,  // Bucket donde se guardarán los logs
      logFilePrefix: "cloudfront/",  // Prefijo opcional para los logs
    })

    // Despliegue del sitio web al bucket S3
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../packages/web/build')],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // Salida con la URL de CloudFront
    new cdk.CfnOutput(this, 'DistributionOutput', {
      value: distribution.distributionDomainName,
      exportName: 'DistributionDomainName',
    });

    // Salida con el nombre del bucket de logs
    new cdk.CfnOutput(this, 'LogsBucketOutput', {
      value: logsBucket.bucketName,
      exportName: 'LogsBucketName',
    });
  }
}
