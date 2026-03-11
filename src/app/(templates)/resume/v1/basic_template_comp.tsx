"use client"

import { ResumeSchemaType } from "@/types/resume";
import { Box, Typography, Stack } from "@mui/material";
import styles from "./basic_template_comp.module.css";

interface BasicTemplateProps {
    resume_data: ResumeSchemaType;
}

export default function BasicTemplateComp({ resume_data }: BasicTemplateProps) {
    const {
        basics,
        work,
        skills,
        education,
        awards,
        certificates,
        interests,
        languages,
        projects,
        publications,
        references,
        volunteer
    } = resume_data;

    return (
        <Box className={styles.container}>
            <Box className={styles.content}>
                {/* Header / Basics */}
                <Box className={styles.sections}>
                    <Typography className={styles.user_name}>
                        {basics.name || "John Doe"}
                    </Typography>

                    <Box className={styles.header_basic_details}>
                        <Typography className={styles.basic_item}>
                            {basics.label || "Professional Title"}
                        </Typography>

                        <Typography className={styles.basic_item}>
                            {basics.email || "email@example.com"} | {basics.phone || "(555) 000-0000"}
                        </Typography>

                        <Typography className={styles.basic_item}>
                            {basics.url || "https://portfolio.com"}
                        </Typography>

                        <Typography className={styles.basic_item}>
                            {basics.location?.city || "City"}, {basics.location?.region || "State"}
                        </Typography>
                    </Box>
                </Box>

                {/* Summary */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>Summary</Typography>
                    <Typography className={styles.section_text}>
                        {basics.summary || "Professional summary goes here..."}
                    </Typography>
                </Box>

                {/* Work Experience */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>Experience</Typography>

                    {work.length > 0 ? work.map((job, i) => (
                        <Box key={i} className={styles.item_block}>
                            <Typography className={styles.item_title}>
                                {job.position || "Position"} @ {job.name || "Company"}
                            </Typography>

                            <Typography className={styles.item_date}>
                                {job.startDate} - {job.endDate || 'Present'}
                            </Typography>

                            <Typography className={styles.section_text}>
                                {job.summary || "Job description..."}
                            </Typography>

                            <ul className={styles.list}>
                                {job.highlights?.map((h, j) => (
                                    <li key={j}>
                                        <Typography>{h}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )) : <Typography>No experience listed.</Typography>}
                </Box>

                {/* Projects */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>Projects</Typography>

                    {projects.length > 0 ? projects.map((p, i) => (
                        <Box key={i} className={styles.item_block}>
                            <Typography className={styles.item_title}>
                                {p.name || "Project Name"} ({p.url || "No URL"})
                            </Typography>

                            <Typography className={styles.section_text}>
                                {p.description || "Project description..."}
                            </Typography>

                            <Typography className={styles.section_text}>
                                {p.highlights?.join(", ")}
                            </Typography>
                        </Box>
                    )) : <Typography>No projects listed.</Typography>}
                </Box>

                {/* Skills */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>Skills</Typography>

                    {skills.length > 0 ? skills.map((s, i) => (
                        <Typography key={i} className={styles.skill_item}>
                            <strong>{s.name || "Skill Group"}:</strong> {s.keywords?.join(", ") || "Keywords"}
                        </Typography>
                    )) : <Typography>No skills listed.</Typography>}
                </Box>

                {/* Education */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>Education</Typography>

                    {education.length > 0 ? education.map((edu, i) => (
                        <Box key={i} className={styles.item_block}>
                            <Typography className={styles.item_title}>
                                {edu.institution || "University"}
                            </Typography>

                            <Typography className={styles.section_text}>
                                {edu.studyType} in {edu.area} ({edu.endDate || "Date"})
                            </Typography>

                            <Typography className={styles.section_text}>
                                GPA: {edu.score || "N/A"}
                            </Typography>
                        </Box>
                    )) : <Typography>No education listed.</Typography>}
                </Box>

                {/* Awards & Certificates */}
                {(awards || certificates) &&
                    <Stack direction="row" spacing={4} className={styles.section_block}>

                        {awards &&
                            <Box>
                                <Typography className={styles.section_title}>Awards</Typography>

                                {awards.length > 0 ? awards.map((a, i) => (
                                    <Typography key={i}>{a.title} - {a.awarder}</Typography>
                                )) : <Typography>None</Typography>}
                            </Box>
                        }

                        {certificates &&
                            <Box>
                                <Typography className={styles.section_title}>Certificates</Typography>

                                {certificates.length > 0 ? certificates.map((c, i) => (
                                    <Typography key={i}>{c.name} ({c.issuer})</Typography>
                                )) : <Typography>None</Typography>}
                            </Box>
                        }

                    </Stack>
                }

                {/* Languages & Interests */}
                <Stack direction="row" spacing={4} className={styles.section_block}>

                    <Box>
                        <Typography className={styles.section_title}>Languages</Typography>

                        {languages.length > 0 ? languages.map((l, i) => (
                            <Typography key={i}>{l.language} ({l.fluency})</Typography>
                        )) : <Typography>English</Typography>}
                    </Box>

                    <Box>
                        <Typography className={styles.section_title}>Interests</Typography>

                        {interests.length > 0 ? interests.map((int, i) => (
                            <Typography key={i}>{int.name}: {int.keywords?.join(", ")}</Typography>
                        )) : <Typography>None</Typography>}
                    </Box>

                </Stack>

                {/* Publications & Volunteer */}
                {publications &&
                    <Box className={styles.section_block}>

                        <Typography className={styles.section_title}>
                            Publications & Volunteer Work
                        </Typography>

                        {publications.map((pub, i) => (
                            <Typography key={i}>
                                Published: {pub.name} via {pub.publisher}
                            </Typography>
                        ))}

                        {volunteer && volunteer.map((v, i) => (
                            <Typography key={i}>
                                Volunteered at: {v.organization} as {v.position}
                            </Typography>
                        ))}

                    </Box>
                }

                {/* References */}
                {references &&
                    <Box className={styles.section_block}>

                        <Typography className={styles.section_title}>References</Typography>

                        {references.length > 0 ? references.map((r, i) => (
                            <Box key={i} className={styles.reference_block}>
                                <Typography>"{r.reference}"</Typography>
                                <Typography>- {r.name}</Typography>
                            </Box>
                        )) : <Typography>References available upon request.</Typography>}

                    </Box>
                }
            </Box>
        </Box>
    );
}