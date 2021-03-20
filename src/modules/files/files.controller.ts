import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileEntity } from 'src/db/entities/FileEntity';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async addFile(
    @UploadedFile('file') uploadedFile: Express.Multer.File,
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<FileEntity> {
    const newFile = await this.filesService.addFile(uploadedFile, userId);
    return newFile;
  }

  @Get(':id')
  async getAllFilesFromUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<FileEntity[]> {
    const files = await this.filesService.getAllFilesFromUser(userId);
    return files;
  }
}
