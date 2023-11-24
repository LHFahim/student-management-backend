import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto extends PickType(UserEntity, ['firstName']) {}
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserDto extends UserEntity {}
