import { z } from "zod";
import { BaseTool } from "../utils/base-tool";
import { readFile } from "fs/promises";
import { resolve } from "path";

const READ_FILE_TOOL_NAME = "read-file";
const READ_FILE_DESCRIPTION =
  "Read contents of a file from absolute or relative path";

export class ReadFileTool extends BaseTool {
  name = READ_FILE_TOOL_NAME;
  description = READ_FILE_DESCRIPTION;

  schema = z.object({
    absoluteFilePath: z.string().describe("Path to the file to read"),
    relativeFilePath: z.string().describe("Path to the file to read"),
  });

  async execute({
    absoluteFilePath,
    relativeFilePath,
  }: z.infer<typeof this.schema>) {
    try {
      console.log("Absolute file path:", absoluteFilePath);
      console.log("Relative file path:", relativeFilePath);

      const absolutePath = resolve(absoluteFilePath);
      const content = await readFile(absolutePath, "utf-8");

      return {
        content: [
          {
            type: "text" as const,
            text: content,
          },
        ],
      };
    } catch (error) {
      console.error("Error reading file:", error);
      throw error;
    }
  }
}
