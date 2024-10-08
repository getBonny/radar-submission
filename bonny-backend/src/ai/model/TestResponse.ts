import { z } from 'zod';

export interface TestResponse {
  valid: boolean;
  reason: string;
  trust_score: number;
  quality_score: number;
  image_type: 'photo' | 'screenshot' | 'banking';
  products_tracked: number;
  status: 'valid' | 'bad_quality' | 'no_receipt' | 'limit_exceeded' | undefined;
  transaction_timestamp: string;
}

export const TestResponseSchema = z.object({
  valid: z.boolean(),
  reason: z.string(),
  image_type: z.enum(['photo', 'screenshot', 'banking']),
  products_tracked: z.number(),
  status: z.enum(['valid', 'bad_quality', 'no_receipt']).or(z.undefined()),
  trust_score: z.number(),
  quality_score: z.number(),
  transaction_timestamp: z.string(),
});
