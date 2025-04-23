#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { ReadFileTool } from "./tools/read-file.js";

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const params: Record<string, string> = {};

  for (const arg of args) {
    if (arg.startsWith("--") || arg.startsWith("—")) {
      const [key, value] = arg.replace(/^(-{1,2}|—)/, "").split("=");
      if (key && value) {
        params[key] = value.replace(/^["'](.*)["']$/, "$1");
      }
    }
  }

  return params;
}

const params = parseArgs();
const API_KEY = params.API_KEY || process.env.API_KEY;

console.log("PARAMS", params);
console.log("API_KEY", API_KEY);

console.log("Starting MCP server...");
const server = new McpServer({
  name: "fs-mcp",
  version: "0.0.2",
});

// Register tools
new ReadFileTool(API_KEY, params).register(server);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sequential Thinking MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
