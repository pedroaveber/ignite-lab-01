import { PrismaService } from '@/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async listAllProducts() {
    return await this.prismaService.product.findMany();
  }

  async getProductById(id: string) {
    return await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prismaService.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Product with same title already exists');
    }

    return await this.prismaService.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
