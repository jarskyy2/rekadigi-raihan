import { z } from "zod";

export const formCustomerSchema = z.object({
  name: z.string().min(2, {
    message: "Nama minimum 2 karakter.",
  }),
});
