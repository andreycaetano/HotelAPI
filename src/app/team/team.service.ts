import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { UploadService } from 'src/upload/upload.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    private readonly upload: UploadService,
    private readonly prisma: PrismaService
  ) {}

  async create(createTeamDto: CreateTeamDto, file: Express.Multer.File): Promise<Team> {
    const data: Prisma.TeamCreateInput = {
      ...createTeamDto,
      photo: undefined
    }
    const team = await this.prisma.team.create({ data })
    const insertPhoto = await this.update(team.id, undefined, file)
    return insertPhoto;
  }

  async findAll(): Promise<Team[]> {
    return await this.prisma.team.findMany();
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.prisma.team.findUnique({ where: { id }})
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`)
    }
    return team;
  }

  async update(id: string, updateTeamDto?: UpdateTeamDto, file?: Express.Multer.File): Promise<Team> {
    const team = await this.findOne(id);
    const data: Prisma.TeamUpdateInput = {}
    if(updateTeamDto) {
      if(updateTeamDto.name !== undefined) data.name = updateTeamDto.name
      if(updateTeamDto.role !== undefined) data.role = updateTeamDto.role
    }
    if (file) {
      if(team.photo != undefined) {
        await this.upload.deleteFile(team.photo)
      }
      data.photo = await this.upload.uploadFile(file, `team/${id}`)
    }
    const updatedTeam = await this.prisma.team.update({
      where: { id },
      data
    })
    return updatedTeam;
  }

  async remove(id: string): Promise<void> {
    const team = await this.findOne(id);
    await this.upload.deleteFile(team.photo);
    await this.prisma.team.delete({ where: { id }})
  }
}
