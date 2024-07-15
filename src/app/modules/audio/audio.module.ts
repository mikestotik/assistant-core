import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AudioService } from "./audio.service";


@Module({
  imports: [ HttpModule ],
  providers: [ AudioService ],
  exports: [ AudioService ]
})
export class AudioModule {}
