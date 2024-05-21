import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCustomerByAuthUserId(authUserId: string) {
    return await this.prismaService.customer.findFirst({
      where: {
        authUserId,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const user = await this.prismaService.customer.create({
      data: {
        authUserId,
      },
    });

    return user;
  }
}
