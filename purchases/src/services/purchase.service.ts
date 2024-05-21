import { PrismaService } from '@/database/prisma/prisma.service';
import { KafkaService } from '@/messaging/kafka.service';
import { Injectable } from '@nestjs/common';

interface CreatePurchaseParams {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly kafka: KafkaService,
  ) {}

  async listAllPurchases() {
    return await this.prismaService.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listAllFromCustomer(customerId: string) {
    return await this.prismaService.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase(data: CreatePurchaseParams) {
    const doesProductExist = await this.prismaService.product.findUnique({
      where: {
        id: data.productId,
      },
    });

    if (!doesProductExist) {
      throw new Error('Product does not exist');
    }

    const purchase = await this.prismaService.purchase.create({
      data: {
        productId: data.productId,
        customerId: data.customerId,
      },
    });

    const customer = await this.prismaService.customer.findUnique({
      where: {
        id: data.customerId,
      },
    });

    const product = doesProductExist;

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        name: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
