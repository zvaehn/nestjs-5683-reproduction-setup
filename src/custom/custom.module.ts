import { Module } from '@nestjs/common';
import { CustomController } from './custom.controller';

@Module({
  controllers: [CustomController],
})

export class CustomModule {}
