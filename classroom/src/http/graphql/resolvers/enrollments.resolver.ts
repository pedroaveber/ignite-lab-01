import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from '@/services/enrollments.service';
import { Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { StudentsService } from '@/services/students.service';
import { CoursesService } from '@/services/courses.service';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  async enrollments() {
    const enrollments = await this.enrollmentsService.listAllEnrollments();
    return enrollments;
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}
