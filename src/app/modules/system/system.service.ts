import { Injectable } from "@nestjs/common";

import { exec } from "child_process";
import { promisify } from "util";
import { CommandResponse, ModelRun } from "./system.dto";
import { validateCommand } from "./system.utils";


const execAsync = promisify(exec);


@Injectable()
export class SystemService {
  async executeCommand(run: ModelRun): Promise<CommandResponse> {
    try {
      validateCommand(run.command, run.parameters);

      const startTime = Date.now();
      const { stdout } = await execAsync(`${ run.command } ${ run.parameters?.join(" ") }`);
      const executionTime = Date.now() - startTime;
      return {
        success: true,
        output: stdout,
        metadata: {
          executionTime
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}
