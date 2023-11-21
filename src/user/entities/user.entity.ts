import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Model } from 'libraries/mongodb/modelOptions';
import { DocumentWithTimeStamps } from 'src/common/classes/documentWithTimeStamps';
import { AuthProvider, PanelType } from 'src/common/enum/auth.enum';

@Model('users', true)
export class UserEntity extends DocumentWithTimeStamps {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @Prop({ required: true, trim: true })
  firstName: string;

  @ApiProperty({ required: true })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true, trim: true })
  lastName: string;

  @ApiProperty({ required: true })
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, trim: true })
  email: string;

  @Exclude()
  @Prop({ required: false })
  password: string;

  @Expose()
  @IsString()
  @IsOptional()
  @Prop({ required: false, default: '' })
  avatarURL: string;

  @Expose()
  @Prop({ required: false, enum: AuthProvider })
  @ApiProperty({ required: false, enum: AuthProvider })
  authProvider: AuthProvider;

  @Expose()
  @Prop({ required: false, type: Date, default: null })
  lastLogin?: Date;

  @Prop({ required: false, type: Boolean, default: true })
  @Expose()
  isEmailVerified: boolean;

  @ApiProperty({ required: false })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: false, type: String, trim: true })
  shortBio: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ required: false })
  @Prop({ required: false, type: String, trim: true })
  phoneNumber: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, default: '' })
  @Prop({ required: false, type: String, trim: true })
  @ValidateIf((object, value) => value !== '')
  @IsEmail({}, { message: 'Invalid email address' })
  secondaryEmail: string;

  @Expose()
  @IsEnum(PanelType)
  @ApiProperty({ required: true, enum: PanelType })
  @Prop({ required: true, enum: PanelType })
  panelType: PanelType;

  @Prop({ required: false, type: Boolean, default: true })
  @Expose()
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  @Expose()
  isDeleted: boolean;
}