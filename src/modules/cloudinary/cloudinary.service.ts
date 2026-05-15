import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Types } from 'mongoose';
import { Multer } from 'multer';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  // 🖼 Single image upload
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'packages',
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          resolve(result?.secure_url || '');
        },
      );

      upload.end(file.buffer);
    });
  }

  // 🏞 Multiple images upload (gallery)
  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const uploads = files.map((file) => this.uploadImage(file));
    return Promise.all(uploads);
  }
}