import { Module } from '@nestjs/common';
import { AppController, AppGeteway } from './app.controller';
import { HunliDiscussModule } from './hunli_discuss.module';

@Module({
  imports: [HunliDiscussModule],
  controllers: [AppController],
  components: [AppGeteway],
})
export class ApplicationModule { }
