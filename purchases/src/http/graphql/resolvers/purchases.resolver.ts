import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { PurchasesService } from '@/services/purchase.service';
import { Purchase } from '../models/purchase';
import { Product } from '../models/product';
import { ProductsService } from '@/services/product.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { AuthUser, CurrentUser } from '@/http/auth/current-user';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { CustomersService } from '@/services/customer.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly productsService: ProductsService,
    private readonly customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  async purchases() {
    return await this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    const purchase = await this.purchasesService.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });

    return purchase;
  }
}
