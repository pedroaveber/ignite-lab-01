import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

interface CreateStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async listAllStudents() {
    const students = await this.prismaService.student.findMany();
    return students;
  }

  async getStudentById(id: string) {
    const student = await this.prismaService.student.findUnique({
      where: { id },
    });
    return student;
  }

  async getStudentByAuthId(authUserId: string) {
    const student = await this.prismaService.student.findUnique({
      where: { authUserId },
    });
    return student;
  }

  async createStudent({ authUserId }: CreateStudentParams) {
    const student = await this.prismaService.student.create({
      data: {
        authUserId,
      },
    });

    return student;
  }
}
