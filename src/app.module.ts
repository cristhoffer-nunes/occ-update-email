import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OccModule } from './module/occ.module';

@Module({
  imports: [OccModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
