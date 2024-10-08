import { Injectable } from '@nestjs/common';
import { Profile } from './profile.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }

  async save(profile: Profile): Promise<Profile> {
    return await this.profileRepository.save(profile);
  }

  async get(id: string): Promise<Profile> {
    return (
      await this.profileRepository.find({
        where: { id: id },
        relations: {
          transactions: {
            receipt: true,
            questStatus: {
              quest: true,
            },
          },
          couponStatuses: true,
        },
      })
    )[0];
  }

  async findUserPosition(uid: string) {
    const sortedUsers = await this.profileRepository.find({
      order: {
        tokens: 'DESC',
      },
    });
    const position = sortedUsers.findIndex((user) => user.id === uid) + 1;

    return { position: position, totalUsers: sortedUsers.length };
  }

  async findByUserName(userName: string): Promise<Profile> {
    return (
      await this.profileRepository.find({
        where: { userName: userName },
      })
    )[0];
  }

  async update(id: string, profile: Partial<Profile>): Promise<Profile> {
    await this.profileRepository.update(id, profile);
    return await this.profileRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.profileRepository.findOneByOrFail({ id: id });
    return await this.profileRepository.delete(id);
  }

  async getWeeklyUploadCount(userId: string): Promise<number> {
    const user = await this.get(userId);
    return user.uploadsPerWeek;
  }

  async increaseWeeklyUploadCount(userId: string): Promise<number> {
    const user = await this.get(userId);
    user.uploadsPerWeek++;
    await this.save(user);
    return user.uploadsPerWeek;
  }

  async decreaseWeeklyUploadCount(userId: string): Promise<number> {
    const user = await this.get(userId);
    user.uploadsPerWeek--;
    await this.save(user);
    return user.uploadsPerWeek;
  }
}
