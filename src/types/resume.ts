import { z } from "zod";

const LocationSchema = z.object({
    address: z.string(),
    postalCode: z.string(),
    city: z.string(),
    countryCode: z.string(),
    region: z.string(),
});

const ProfileSchema = z.object({
    network: z.string(),
    username: z.string(),
    url: z.string().url(),
});

const WorkSchema = z.object({
    name: z.string(),
    position: z.string(),
    url: z.string().url(),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    summary: z.string(),
    highlights: z.array(z.string()),
});

const VolunteerSchema = z.object({
    organization: z.string(),
    position: z.string(),
    url: z.string().url(),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    summary: z.string(),
    highlights: z.array(z.string()),
});

const EducationSchema = z.object({
    institution: z.string(),
    url: z.string().url(),
    area: z.string(),
    studyType: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    score: z.string(),
    courses: z.array(z.string()),
});

const AwardSchema = z.object({
    title: z.string(),
    date: z.string(),
    awarder: z.string(),
    summary: z.string(),
});

const CertificateSchema = z.object({
    name: z.string(),
    date: z.string(),
    issuer: z.string(),
    url: z.string().url(),
});

const PublicationSchema = z.object({
    name: z.string(),
    publisher: z.string(),
    releaseDate: z.string(),
    url: z.string().url(),
    summary: z.string(),
});

const SkillSchema = z.object({
    name: z.string(),
    level: z.string(),
    keywords: z.array(z.string()),
});

const LanguageSchema = z.object({
    language: z.string(),
    fluency: z.string(),
});

const InterestSchema = z.object({
    name: z.string(),
    keywords: z.array(z.string()),
});

const ReferenceSchema = z.object({
    name: z.string(),
    reference: z.string(),
});

const ProjectSchema = z.object({
    name: z.string(),
    description: z.string(),
    highlights: z.array(z.string()),
    keywords: z.array(z.string()).optional(),
    startDate: z.string(),
    endDate: z.string().nullable().optional(),
    url: z.string().url(),
});

export const ResumeSchema = z.object({
    basics: z.object({
        name: z.string(),
        label: z.string(),
        image: z.string().optional().or(z.literal("")),
        email: z.string().email(),
        phone: z.string(),
        url: z.string().url(),
        summary: z.string(),
        location: LocationSchema,
        profiles: z.array(ProfileSchema),
    }),
    work: z.array(WorkSchema),
    volunteer: z.array(VolunteerSchema).optional(),
    education: z.array(EducationSchema),
    awards: z.array(AwardSchema).optional(),
    certificates: z.array(CertificateSchema).optional(),
    publications: z.array(PublicationSchema).optional(),
    skills: z.array(SkillSchema),
    languages: z.array(LanguageSchema),
    interests: z.array(InterestSchema),
    references: z.array(ReferenceSchema).optional(),
    projects: z.array(ProjectSchema),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
