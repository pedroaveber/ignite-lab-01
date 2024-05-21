import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Course } from '@prisma/client';
import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
  slug?: string;
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

  async getCourseBySlug(slug: string) {
    const course = await this.prismaService.course.findUnique({
      where: { slug },
    });
    return course;
  }

  async createCourse({ title, slug }: CreateCourseParams) {
    const courseSlug = slug ?? slugify(title, { lower: true });

    const courseWithSameSlug: Course | null =
      await this.prismaService.course.findUnique({
        where: { slug: courseSlug },
      });

    if (courseWithSameSlug) {
      throw new Error('Course with same title already exists');
    }

    return this.prismaService.course.create({
      data: {
        title,
        slug: courseSlug,
      },
    });
  }
}
