"use client"

import { basics, education, skills, work } from "../../../../../dummy_content.json"
import { Box, Typography } from "@mui/material"
import styles from "./basic_template_comp.module.css"
import { ResumeSchemaType } from "@/types/resume"

interface BasicTemplateProps {
    resume_data: ResumeSchemaType;
}

export default function BasicTemplateComp({ resume_data }: BasicTemplateProps) {
    const { basics, education, skills, work } = resume_data;
    return (
        <Box className={styles.container}>
            <Box className={styles.content}>
                {/* Header */}
                <Box className={styles.sections}>
                    <Typography className={styles.user_name}>
                        {basics.name || "John Doe"}
                    </Typography>

                    <Box className={styles.header_basic_details}>
                        <Typography className={styles.basic_item}>
                            {basics.email || "email@example.com"} | {basics.phone || "(555) 000-0000"}
                        </Typography>
                        <Typography className={styles.basic_item}>
                            {basics.location?.city || "City"}, {basics.location?.region || "Region"} {basics.location?.postalCode}
                        </Typography>
                        <Typography className={styles.basic_item}>
                            {basics.location?.countryCode || "Country"}
                        </Typography>
                    </Box>
                </Box>


                {/* Summary */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>
                        Summary
                    </Typography>
                    <Typography className={styles.section_text}>
                        {basics.summary || "Professional summary goes here..."}
                    </Typography>
                </Box>


                {/* Work Experience */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>
                        Work Experience
                    </Typography>

                    {work.length > 0 ? work.map((job, i) => (
                        <Box key={i} className={styles.item_block}>
                            <Typography className={styles.item_title}>
                                {job.position || "Position"} — {job.name || "Company"}
                            </Typography>
                            <Typography className={styles.item_date}>
                                {job.startDate || "Start"} - {job.endDate || "Present"}
                            </Typography>
                            <Typography className={styles.section_text}>
                                {job.url}
                            </Typography>
                        </Box>

                    )) : <Typography>No experience listed.</Typography>}
                </Box>


                {/* Skills */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>
                        Skills
                    </Typography>
                    {skills.length > 0 ? skills.map((s, i) => (
                        <Typography key={i} className={styles.skill_item}>
                            {s.name} — {s.level}
                        </Typography>
                    )) : <Typography>No skills listed.</Typography>}

                </Box>


                {/* Education */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>
                        Education
                    </Typography>

                    {education.length > 0 ? education.map((edu, i) => (
                        <Box key={i} className={styles.item_block}>
                            <Typography className={styles.item_title}>
                                {edu.institution || "Institution"}
                            </Typography>
                            <Typography className={styles.section_text}>
                                {edu.studyType} in {edu.area}
                            </Typography>
                            <Typography className={styles.item_date}>
                                {edu.startDate} - {edu.endDate || "Present"}
                            </Typography>
                            <Typography className={styles.section_text}>
                                Score: {edu.score || "N/A"}
                            </Typography>
                        </Box>
                    )) : <Typography>No education listed.</Typography>}
                </Box>

            </Box>
        </Box>
    )
}
