import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { ReadFileTool } from "./tools/read-file";

const server = new McpServer({
  name: "read-file-test",
  version: "0.0.1",
});

// Register tools
new ReadFileTool().register(server);

const transport = new StdioServerTransport();

server.connect(transport);
