import { z } from 'zod';

export const promocodeSchema = z.object({
  promoCode: z
    .string()
    .min(4, 'Промокод має містити щонайменше 4 символи')
    .max(12, 'Промокод має містити не більше 12 символів')
    .uppercase()
})