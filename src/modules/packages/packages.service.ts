import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from './entities/package.entity';
import { Model, Types } from 'mongoose';
import { UpdatePackageDto } from './dto/update-package.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PackagesService {
    constructor(
        @InjectModel(Package.name) private readonly PackageRepo : Model<Package>
    ){}

    async create(dto : CreatePackageDto){
        return await this.PackageRepo.create(dto)
    }

    async findAll(){
        return await this.PackageRepo.find()
    }

    async findOne(id : string){
        const pack = await this.PackageRepo.findById(id)
        if(!pack){
         throw new NotFoundException('package not found')
     }
     return pack
    }

    async update( id : string,dto : UpdatePackageDto){
        return await this.PackageRepo.findByIdAndUpdate(id, {...dto},{returnDocument : 'after'})
    }

    async delete(id : string){
        return await this.PackageRepo.findByIdAndDelete(id)
    }

    async updateMedia(id : string, image: string, gallery:string[]){
        const pack = await this.PackageRepo.findById(id)
        if(!pack) throw new NotFoundException('package not found')
            return await this.PackageRepo.findByIdAndUpdate(id, {image, gallery},{returnDocument:'after'})
    }
}
