import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/db/schema';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { Role } from 'src/auth/auth.roles';
import { CurrentUser } from 'src/common/decorators';
import { BonnyAuthGuard } from 'src/auth/authentication/authentication.guard';
import { BonnyRolesGuard } from 'src/auth/authorization/roles.guard';

@Controller('user')
@UseGuards(BonnyAuthGuard, BonnyRolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.AppUser)
  async getUser(
    @CurrentUser() user: User,
  ): Promise<User> {
    console.log(user)
    return this.userService.get(user.id);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.save(user);
  }

  @Put()
  @Roles(Role.AppUser)
  async updateUser(
    @CurrentUser() user: User,
    @Body('newUser') newUser: Partial<User>,
  ): Promise<User> {
    return this.userService.update(user.id, newUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
