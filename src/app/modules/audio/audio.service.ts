import installer from "@ffmpeg-installer/ffmpeg";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import ffmpeg from "fluent-ffmpeg";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";
import { dirname, resolve } from "path";
import { lastValueFrom } from "rxjs";
import { APP_ROOT_PATH } from "../../../config";


@Injectable()
export class AudioService {
  constructor(
    private readonly http: HttpService) {

    ffmpeg.setFfmpegPath(installer.path);
  }


  public toMp3(input: any, output: any) {
    try {
      const outputPath = resolve(dirname(input), `${ output }.mp3`);
      return new Promise<string>((resolve, reject) => {
        ffmpeg(input)
          .inputOption("-t 30")
          .output(outputPath)
          .on("end", () => {
            this.removeFile(input);
            resolve(outputPath);
          })
          .on("error", (err) => reject(err.message))
          .run();
      });
    } catch (e) {
      console.log("Error while creating mp3", e.message);
    }
  }


  public async create(url: string, filename: string) {
    try {
      const oggPath = resolve(APP_ROOT_PATH, "../voices", `${ filename }.ogg`);
      const response = await lastValueFrom(this.http.get(url, { responseType: "stream" }));

      return new Promise((resolve) => {
        const stream = createWriteStream(oggPath);
        response.data.pipe(stream);
        stream.on("finish", () => resolve(oggPath));
      });
    } catch (e) {
      console.log("Error while creating ogg", e.message);
    }
  }


  public async removeFile(path: string) {
    try {
      await unlink(path);
    } catch (e) {
      console.log("Error while removing file", e.message);
    }
  }
}
