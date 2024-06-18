import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

@Injectable()
export class UploadService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      endpoint: process.env.AWS_S3_ENDPOINT,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
  }

  getMulterS3Options(prefix: string) {
    return multer({
      storage: multerS3({
        s3: this.s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: (req, file, cb) => {
          cb(null, `${prefix}/${Date.now().toString()}-${file.originalname}`);
        },
      }),
    });
  }
}
