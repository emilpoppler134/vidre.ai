#!/usr/bin/env node
import { generate } from "@graphql-codegen/cli";

export default function codegen() {
  const endpoint = "http://localhost:4000/graphql";

  generate(
    {
      schema: endpoint,
      documents: ["src/**/*.ts", "src/**/*.tsx"],
      generates: {
        "src/types/graphql.ts": {
          config: {
            gqlImport: "graphql-tag",
          },
          plugins: [
            "typescript",
            "typescript-operations",
            "typescript-react-apollo",
          ],
        },
      },
    },
    true,
  );
}

codegen();
