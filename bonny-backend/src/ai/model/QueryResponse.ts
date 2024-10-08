import { z } from "zod"

export interface QueryResponse {
    "sql": string,
}

export const QuerySchema = z.object({
    "sql": z.string(),
  });