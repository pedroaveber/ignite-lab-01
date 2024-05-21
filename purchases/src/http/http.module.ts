import path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '@/database/database.module';
import { type ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

import { ProductsService } from '@/services/product.service';
import { PurchasesService } from '@/services/purchase.service';

import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersService } from '@/services/customer.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

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
    ProductsResolver,
    CustomersResolver,
    PurchasesResolver,

    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
