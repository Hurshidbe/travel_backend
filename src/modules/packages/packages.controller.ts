import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UnauthorizedException, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { user_role } from "src/shared/enums";
import { PackagesService } from "./packages.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { UpdatePackageDto, UpdatePackageMediaDto } from "./dto/update-package.dto";
import { CreatePackageDto } from "./dto/create-package.dto";

@Controller('packages')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(user_role.ADMIN,user_role.SUPER_ADMIN)
export class PackageController {
  constructor(
    private readonly packageService: PackagesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  async create(@Body() createPackageDto: CreatePackageDto) {
    try {
      const pkg = await this.packageService.create(createPackageDto);
      return { success: true, data: pkg };
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Get('all')
  async findAll() {
    try {
      const packages = await this.packageService.findAll();
      return { success: true, data: packages };
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const pkg = await this.packageService.findOne(id);
      return { success: true, data: pkg };
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    try {
      const pkg = await this.packageService.update(id, updatePackageDto);
      return { success: true, data: pkg };
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }

  @Patch(':id/media')
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
  ]),
)
async updateMedia(
  @Param('id') id: string,
  @UploadedFiles()
  files: {
    image?: Express.Multer.File[];
    gallery?: Express.Multer.File[];
  },
) {
  try {
    let imageUrl: string | undefined;
    let galleryUrls: string[] = [];

    if (files.image?.length) {imageUrl = await this.cloudinaryService.uploadImage(files.image[0])}
    if (files.gallery?.length) {galleryUrls =await this.cloudinaryService.uploadImages(files.gallery)}
    if (!imageUrl || galleryUrls.length === 0) {throw new BadRequestException('No media uploaded')}

    const pkg = await this.packageService.updateMedia(id, imageUrl, galleryUrls);
    return {success: true, data: pkg}
  } catch (error) {
    throw new HttpException( error.message, error.status ?? 500);
  }
}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.packageService.delete(id);
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(error.message, error.status ?? 500);
    }
  }
}