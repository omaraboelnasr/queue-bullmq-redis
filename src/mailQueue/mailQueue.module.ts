import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MailQueueProcessorService } from './mailQueue.service';
import { MailQueueController } from './mailQueue.controller';
import { MailQueueEventsListener } from './mailQueue.events';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
      defaultJobOptions: {
        attempts: 3, // if job fails retry 3 times
        delay: 5000,
        removeOnComplete: 1000, //keep the last 1000 jobs
        removeOnFail: 2000, //keep the last 2000 jobs
        backoff: 2000, //after the job fail retry after 2 sec
      },
    }),
    BullModule.registerQueue({ name: 'mailQueue' }),
  ],
  controllers: [MailQueueController],
  providers: [MailQueueProcessorService, MailQueueEventsListener, MailService],
})
export class MailQueueModule {}
