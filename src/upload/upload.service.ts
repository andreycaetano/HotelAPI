import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandOutput, ObjectCannedACL, DeleteObjectCommand } from '@aws-sdk/client-s3';

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

  async uploadFile(file: Express.Multer.File, prefix: string): Promise<string> {
    const key = `${prefix}/${Date.now().toString()}-${file.originalname}`;

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read' as ObjectCannedACL,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      await this.s3.send(command);
      
      const objectUrl = `${process.env.AWS_S3_ENDPOINT}/${process.env.AWS_S3_BUCKET_NAME}/${key}`;
      
      return objectUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async deleteFile(key: string): Promise<void> {
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key, 
    };

    const command = new DeleteObjectCommand(deleteParams);

    try {
      await this.s3.send(command);
      console.log(`Deleted file ${key} from S3`);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}
