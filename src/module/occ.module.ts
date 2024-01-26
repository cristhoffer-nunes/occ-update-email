import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OccControler } from 'src/controller/occ.controller';
import { OccService } from 'src/service/occ.service';

@Module({
  imports: [HttpModule],
  controllers: [OccControler],
  providers: [OccService],
})
export class OccModule {}
