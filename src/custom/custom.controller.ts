import {
  Controller,
  Logger,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class CustomController {
  constructor(
  ) {}

  @MessagePattern('custom_queue')
  async processScreenshotJob(@Payload() job: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    Logger.debug('ok');

    channel.ack(message);
  }
}
