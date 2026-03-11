import { z } from "zod"

export const loginSchema = z.object({
    phone_no: z.string().min(1, "Phone is required"),
})

export type LoginSchemaType = z.infer<typeof loginSchema>