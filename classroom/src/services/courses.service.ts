import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private readonly prismaService: PrismaService) {}

  async listAllCourses() {
    const courses = await this.prismaService.course.findMany();
    return courses;
  }

  async getCourseById(id: string) {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });
    return course;
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const courseWithSameSlug = await this.prismaService.course.findUnique({
      where: { slug },
    });

    if (courseWithSameSlug) {
      throw new Error('Course with same title already exists');
    }

    return this.prismaService.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
