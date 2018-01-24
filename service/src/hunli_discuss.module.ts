import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { HunliDiscussProviders } from './hunli_discuss.providers';
import { HunliDiscussService, HunliFuyueService } from './hunli_discuss.service';

@Module({
    imports: [DatabaseModule],
    components: [
        ...HunliDiscussProviders,
        HunliDiscussService,
        HunliFuyueService,
    ],
    exports: [HunliDiscussService, HunliFuyueService],
})
export class HunliDiscussModule { }