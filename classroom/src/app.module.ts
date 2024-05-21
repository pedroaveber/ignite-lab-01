import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { MessaagingModule } from './messaging/messaging.module';

@Module({
  imports: [HttpModule, MessaagingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
