import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Product } from '../models/product';
import { ProductsService } from '@/services/product.service';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    return await this.productService.listAllProducts();
  }

  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProductInput) {
    return await this.productService.createProduct(data);
  }
}
