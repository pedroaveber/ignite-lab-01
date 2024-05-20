import { Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
// import { AuthenticationGuard } from '../auth/authentication.guard';

@Resolver()
export class TestResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => String)
  getHello(): string {
    return 'Hello World!';
  }
}
