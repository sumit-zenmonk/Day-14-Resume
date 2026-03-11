import { z } from "zod";

const LocationSchema = z.object({
    address: z.string().min(1, "Address is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    city: z.string().min(1, "City is required"),
    countryCode: z.string().min(1, "Country code is required"),
    region: z.string().min(1, "Region is required"),
});

const WorkSchema = z.object({
    name: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position title is required"),
    url: z.string().url("Please provide a valid company URL"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().nullable().optional(),
});

const EducationSchema = z.object({
    institution: z.string().min(1, "Institution name is required"),
    url: z.string().url("Please provide a valid institution URL"),
    area: z.string().min(1, "Area of study is required"),
    studyType: z.string().min(1, "Degree type is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().nullable().optional(),
    score: z.string().min(1, "GPA/Score is required"),
});

const SkillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
    level: z.string().min(1, "Skill level is required"),
});

export const ResumeSchema = z.object({
    basics: z.object({
        name: z.string().min(1, "Name is required"),
        image: z.string().min(1, "Image is required"),
        email: z.string().email("Please provide a valid email address"),
        phone: z.string().min(1, "Phone number is required"),
        summary: z.string().min(1, "Summary is required"),
        location: LocationSchema,
    }),
    work: z.array(WorkSchema),
    education: z.array(EducationSchema),
    skills: z.array(SkillSchema),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
