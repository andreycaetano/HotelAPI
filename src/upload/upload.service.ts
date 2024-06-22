import { BadRequestException, Injectable } from '@nestjs/common';
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
    const sanitizedFileName = file.originalname.replace(/\s+/g, '_');
    const key = `${prefix}/${Date.now().toString()}-${sanitizedFileName}`;

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read' as ObjectCannedACL,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      await this.s3.send(command);

      const objectUrl = `${key}`;

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

  groupFilesByField(files: Array<Express.Multer.File>, allowedFields: string[]) {
    const filesByField = files.reduce((acc, file) => {
      if (allowedFields.includes(file.fieldname)) {
        if (!acc[file.fieldname]) {
          acc[file.fieldname] = [];
        }
        acc[file.fieldname].push(file);
      }
      return acc;
    }, {});
    const invalidFields = Object.keys(filesByField).filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
      throw new BadRequestException(`Fields ${invalidFields.join(', ')} are not allowed`);
    }
    return filesByField
  }
}