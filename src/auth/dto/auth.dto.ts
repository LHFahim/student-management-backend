import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateAuthDto {}

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}

export class LoginDto extends PickType(UserEntity, ['email']) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
}
