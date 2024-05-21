import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '@/database/database.module';
import { type ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

import path from 'node:path';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { EnrollmentsService } from '@/services/enrollments.service';
import { StudentsService } from '@/services/students.service';
import { CoursesService } from '@/services/courses.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
  providers: [
    // Resolvers
    StudentsResolver,
    CoursesResolver,
    EnrollmentsResolver,

    // Services
    EnrollmentsService,
    StudentsService,
    CoursesService,
  ],
})
export class HttpModule {}
