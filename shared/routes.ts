import { z } from 'zod';
import { imageResponseSchema } from './schema';

export const errorSchemas = {
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  images: {
    random: {
      method: 'GET' as const,
      path: '/api/images/random' as const,
      responses: {
        200: imageResponseSchema,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ImageResponseType = z.infer<typeof api.images.random.responses[200]>;
