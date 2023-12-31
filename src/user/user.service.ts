import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { SerializeService } from 'libraries/serializer/serialize';
import { InjectModel } from 'nestjs-typegoose';
import { RegisterByEmailDto, UserProfileDto } from 'src/auth/dto/auth.dto';
import { AuthProvider, PanelType } from 'src/common/enum/auth.enum';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService extends SerializeService<UserEntity> {
  constructor(
    @InjectModel(UserEntity)
    private readonly userModel: ReturnModelType<typeof UserEntity>,
  ) {
    super(UserEntity);
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async createUser(body: RegisterByEmailDto) {
    const createdUser = await this.userModel.create({
      ...body,

      avatarURL: '',
      authProvider: AuthProvider.EMAIL,
      isEmailVerified: true,

      panelType: PanelType.CLIENT,

      lastLogin: null,

      isActive: true,
      isDeleted: false,
    });

    return this.toJSON(createdUser, UserDto);
  }

  async findAll() {
    const docs = await this.userModel.find();

    return this.toJSONs(docs, UserDto);
  }

  async findUserById(_id: string) {
    return await this.userModel.findById(_id);
  }

  async findOne(_id: string) {
    const user = await this.userModel.findOne({ _id });
    if (!user) throw new NotFoundException('User not found');

    return this.toJSON(user, UserProfileDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action remove a #${id} user`;
  }
}
