import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Routes } from 'src/common/constant/routes';
import { ResourceId } from 'src/common/decorator/params.decorator';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Serialize()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: ControllersEnum.Users, version: APIVersions.V1 })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(Routes[ControllersEnum.Users].findAll)
  findAll(@Request() request: any) {
    return this.userService.findAll();
  }

  @Get(Routes[ControllersEnum.Users].findOne)
  findOne(@ResourceId() id: string) {
    return this.userService.findOne(id);
  }

  @Patch(Routes[ControllersEnum.Users].updateOne)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(Routes[ControllersEnum.Users].deleteOne)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
