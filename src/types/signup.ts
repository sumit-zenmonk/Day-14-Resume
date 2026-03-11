import { z } from "zod"

export const signupSchema = z
    .object({
        phone_no: z.string().min(1, "Phone is required"),
    })

export type SignupSchemaType = z.infer<typeof signupSchema>