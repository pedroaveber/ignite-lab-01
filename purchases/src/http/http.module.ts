import path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '@/database/database.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { ProductsService } from '@/services/product.service';
import { PurchasesService } from '@/services/purchase.service';

import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersService } from '@/services/customer.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from '@/messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
  ],
  providers: [
    ProductsResolver,
    CustomersResolver,
    PurchasesResolver,

    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
