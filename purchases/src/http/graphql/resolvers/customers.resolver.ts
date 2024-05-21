import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { Customer } from '../models/customer';
import { CustomersService } from '@/services/customer.service';
import { AuthUser, CurrentUser } from '@/http/auth/current-user';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { PurchasesService } from '@/services/purchase.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private readonly customersService: CustomersService,
    private readonly purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: AuthUser) {
    return await this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  async purchases(@Parent() customer: Customer) {
    return await this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  async resolveReference(reference: { authUserId: string }) {
    return await this.customersService.getCustomerByAuthUserId(
      reference.authUserId,
    );
  }
}
