import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { MailQueueModule } from './mailQueue/mailQueue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailQueueModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
