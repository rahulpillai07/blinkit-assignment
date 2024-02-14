import z from "zod";

export const userZodType = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5)
    .refine((password) => {
      return /[A-Z]/.test(password) && /[0-9]/.test(password);
    }, "Password must contain at least one uppercase letter and one number"),
});

export type UserType = z.infer<typeof userZodType>;
