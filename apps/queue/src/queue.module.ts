import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Bull from 'bull';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'default',
      imports: [ConfigModule],
      useFactory: (config: ConfigService): Bull.QueueOptions => {
        const redis = config.get<string>('REDIS');
        return {
          redis,
          defaultJobOptions: {
            attempts: 3,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [QueueService],
})
export class QueueModule {}
