import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

interface CreateEnrollmentParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async listAllEnrollments() {
    return this.prismaService.enrollment.findMany({
      where: { canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listEnrollmentsByStudentId(studentId: string) {
    return this.prismaService.enrollment.findMany({
      where: { studentId, canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return this.prismaService.enrollment.findFirst({
      where: { courseId, studentId, canceledAt: null },
    });
  }

  async createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return this.prismaService.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
