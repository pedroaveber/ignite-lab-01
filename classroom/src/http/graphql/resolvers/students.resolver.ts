import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from '../models/student';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { StudentsService } from '@/services/students.service';
import { EnrollmentsService } from '@/services/enrollments.service';
import { AuthUser, CurrentUser } from '@/http/auth/current-user';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    const students = await this.studentsService.listAllStudents();
    return students;
  }

  @ResolveField()
  async enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudentId(student.id);
  }

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() currentUser: AuthUser) {
    const student = await this.studentsService.getStudentByAuthId(
      currentUser.sub,
    );
    return student;
  }
}
