import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OccModule } from './module/occ.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OccModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
