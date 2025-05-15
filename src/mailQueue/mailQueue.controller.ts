import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller('mailQueue')
export class MailQueueController {
  constructor(@InjectQueue('mailQueue') private readonly mailQueue: Queue) {}

  @Post('send-email')
  async processVideo(@Body() body: any) {
    await this.mailQueue.add('send-email', body);
    return {
      message: 'Email job added to queue',
    };
  }

  @Get()
  async getJob() {
    const allJob = await this.mailQueue.getJobs();
    return {
      message: 'video processing job added to queue!!',
      data: allJob,
    };
  }

  @Delete()
  async clearAllJob() {
    const allJob = await this.mailQueue.clean(0, 10, 'completed');
    return {
      message: 'video processing job added to queue!!',
      data: allJob,
    };
  }
}
