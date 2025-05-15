import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from 'src/mail/mail.service';

@Processor('mailQueue', { concurrency: 2 }) //that to do 3 job together we can add {limiter: {duration:10000, max: 20}} is that to make max 20 jobs in 10 sec
export class MailQueueProcessorService extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }
  async process(job: Job) {
    const totalSteps = 5;
    switch (job.name) {
      case 'send-email':
        console.log('sending email');
        await this.mailService.sendMail(job.data);
        break;
      default:
        console.log(`unknowing job name : ${job.name}`);
        await this.runTaskWithProgress(job, totalSteps);
        break;
    }
  }

  async runTaskWithProgress(job, totalSteps) {
    for (let step = 1; step <= totalSteps; step++) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const progress = Math.round((step / totalSteps) * 100);
      await job.updateProgress(progress);
    }
  }
  // worker events
  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    console.log(`job progress is ${job.progress} %`);
  }

  @OnWorkerEvent('active')
  onAdded(job: Job) {
    console.log(`Got a new job ${job.id}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`job with id ${job.id} is completed`);
  }

  @OnWorkerEvent('failed')
  onFail(job: Job) {
    console.log(`job with id ${job.id} is faild`);
    console.log(`attempt number ${job.attemptsMade}`);
  }
}
