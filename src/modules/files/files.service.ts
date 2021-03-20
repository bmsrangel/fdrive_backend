import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/db/entities/FileEntity';
import { Repository } from 'typeorm';

import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private filesRepository: Repository<FileEntity>,
  ) {}

  addFile(file: Express.Multer.File, userId: number): Promise<FileEntity> {
    const filePath: string = path.join(
      'public',
      `${Date.now()}.${this.getFileExtension(file.originalname)}`,
    );
    const newFileEntity: Partial<FileEntity> = new FileEntity();
    newFileEntity.fileName = file.originalname;
    newFileEntity.filePath = filePath.split('\\')[1];
    newFileEntity.format = file.mimetype;
    newFileEntity.size = this.convertSize(file.size);
    newFileEntity.userId = userId;

    try {
      fs.writeFileSync(filePath, file.buffer);
      return this.filesRepository.save(newFileEntity);
    } catch (error) {
      throw new HttpException(
        'Falha ao salvar arquivo',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  getAllFilesFromUser(userId: number): Promise<FileEntity[]> {
    return this.filesRepository.find({
      where: {
        userId,
      },
    });
  }

  private getFileExtension(fileName: string): string {
    const splittedName: string[] = fileName.split('.');
    return splittedName[splittedName.length - 1];
  }

  private convertSize(fileSize: number): string {
    if (fileSize < 1024) {
      return `${fileSize.toFixed(1)} B`;
    } else if (fileSize < Math.pow(1024, 2)) {
      return `${(fileSize / 1024).toFixed(1)} KB`;
    } else if (fileSize < Math.pow(1024, 3)) {
      return `${(fileSize / Math.pow(1024, 2)).toFixed(2)} MB`;
    } else {
      return `${(fileSize / Math.pow(1024, 3)).toFixed(1)} GB`;
    }
  }
}
