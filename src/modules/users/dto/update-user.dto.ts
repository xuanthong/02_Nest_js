import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, isArray, isJSON } from 'class-validator';

export class UpdateUserDto {
    @IsMongoId()
    _id: string;
    
    @IsOptional()
    @IsString()
    name: string;
    // @IsNotEmpty()
    // @IsEmail()
    // email: string;
    // phone: string;
    // address: string;
    // image: string;
    // role: string;
    // codeId: string;
    // codeExpired: Date;
}
