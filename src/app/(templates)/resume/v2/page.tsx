"use client"

import { Box, Fab, Typography } from "@mui/material"
import styles from "./premium_template_comp.module.css"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { selectContentByMobile } from "@/redux/feature/all_signup_users_content/allContentSlice"
import Image from "next/image"
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { ResumeSchemaType } from "@/types/resume"

interface ResumeProps {
    propData?: ResumeSchemaType
}

export default function PremiumTemplateComp({ propData }: ResumeProps) {
    const mobile_no = useSelector((state: RootState) => state.CurrLoginReducer.mobile_no)
    const userData = useSelector((state: RootState) => selectContentByMobile(state, mobile_no, 2))
    const { basics, work, education, skills } = propData || userData?.content_data || {};

    const handlePrint = () => {
        window.print();
    };

    return (
        <Box className={styles.container}>
            {/* header top lecel */}
            <Box className={styles.header}>
                {/* logo box */}
                <Box className={styles.header_logo_box}>
                    <Typography className={styles.username}>
                        {basics?.name || "S*********"}
                    </Typography>
                    <Typography className={styles.profession}>
                        {work?.[0]?.position || "F------------"}
                    </Typography>
                </Box>
                <Box className={styles.headerDesignLabel}></Box>

                {/* contact details */}
                <Box className={styles.header_details}>
                    <Box className={styles.header_details_box}>
                        <Typography className={styles.headerLabel}>
                            Phone
                        </Typography>
                        <Typography className={styles.headerLabelText}>
                            {basics?.phone || "+91 ************"}
                        </Typography>
                    </Box>

                    <Box className={styles.header_details_box}>
                        <Typography className={styles.headerLabel}>
                            Email
                        </Typography>
                        <Typography className={styles.headerLabelText}>
                            {basics?.email || "*********@example.com"}
                        </Typography>
                    </Box>

                    <Box className={styles.header_details_box}>
                        <Typography className={styles.headerLabel}>
                            Location
                        </Typography>
                        <Typography className={styles.headerLabelText}>
                            {basics?.location?.address || "***** 21"}, {basics?.location?.city || "---------"}
                        </Typography>
                    </Box>

                    <Box className={styles.header_details_box}>
                        <Typography className={styles.headerLabel}>
                            Experience
                        </Typography>
                        <Typography className={styles.headerLabelText}>
                            3 years , 5 months
                        </Typography>
                    </Box>
                </Box>

                {/* image sectuon */}
                <Box className={styles.header_img_box}>
                    <Image
                        src={"/v2.png"}
                        alt="profile"
                        width={150}
                        height={150}
                    />
                </Box>
            </Box>

            {/* body section bottom  */}
            <Box className={styles.body}>
                {/* left section */}
                <Box className={styles.left_section}>
                    {/* summary */}
                    <Box className={styles.section_box}>
                        <Typography className={styles.section_title}>
                            Profile Summary
                        </Typography>
                        <Typography className={styles.section_text}>
                            {basics?.summary || "---------------------"}
                        </Typography>
                    </Box>

                    {/* skills */}
                    <Box className={styles.section_box}>
                        <Typography className={styles.section_title}>
                            Key Skills
                        </Typography>
                        <Box className={styles.skill_box}>
                            {skills && skills.length ? (
                                skills.map((skill: any, idx: number) => (
                                    <Box key={idx} className={styles.skill_item}>
                                        <Typography className={styles.skill_name}>
                                            {skill.name}
                                        </Typography>
                                        <Typography className={styles.skill_level}>
                                            {skill.level}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <>
                                    <Box className={styles.skill_item}>
                                        <Typography className={styles.skill_name}>React</Typography>
                                        <Typography className={styles.skill_level}>Advanced</Typography>
                                    </Box>

                                    <Box className={styles.skill_item}>
                                        <Typography className={styles.skill_name}>Next.js</Typography>
                                        <Typography className={styles.skill_level}>Advanced</Typography>
                                    </Box>

                                    <Box className={styles.skill_item}>
                                        <Typography className={styles.skill_name}>JavaScript</Typography>
                                        <Typography className={styles.skill_level}>Advanced</Typography>
                                    </Box>

                                    <Box className={styles.skill_item}>
                                        <Typography className={styles.skill_name}>Material UI</Typography>
                                        <Typography className={styles.skill_level}>Advanced</Typography>
                                    </Box>
                                </>
                            )}

                        </Box>
                    </Box>
                </Box>

                {/*right Section*/}
                <Box className={styles.right_section}>
                    {/* work experience */}
                    <Box className={styles.section_box}>
                        <Typography className={styles.section_title}>
                            Work Experience
                        </Typography>

                        {work && work.length ? (
                            work.map((job: any, idx: number) => (
                                <Box key={idx} className={styles.work_item}>
                                    <Typography className={styles.work_position}>
                                        {job.position}
                                    </Typography>
                                    <Typography className={styles.work_company}>
                                        {job.name}
                                    </Typography>
                                    <Typography className={styles.work_date}>
                                        {job.startDate} - {job.endDate}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <>
                                <Box className={styles.work_item}>
                                    <Typography className={styles.work_position}>Frontend Developer</Typography>
                                    <Typography className={styles.work_company}>Tech Solutions Pvt Ltd</Typography>
                                    <Typography className={styles.work_date}>Jan 2022 - Present</Typography>
                                </Box>

                                <Box className={styles.work_item}>
                                    <Typography className={styles.work_position}>Junior Developer</Typography>
                                    <Typography className={styles.work_company}>Web Innovators</Typography>
                                    <Typography className={styles.work_date}>Jun 2020 - Dec 2021</Typography>
                                </Box>
                            </>
                        )}

                    </Box>

                    {/* education */}
                    <Box className={styles.section_box}>
                        <Typography className={styles.section_title}>
                            Education
                        </Typography>

                        {education && education.length ? (
                            education.map((edu: any, idx: number) => (
                                <Box key={idx} className={styles.edu_item}>
                                    <Typography className={styles.edu_degree}>
                                        {edu.studyType}
                                    </Typography>
                                    <Typography className={styles.edu_school}>
                                        {edu.institution}
                                    </Typography>
                                    <Typography className={styles.edu_date}>
                                        {edu.startDate} - {edu.endDate}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Box className={styles.edu_item}>
                                <Typography className={styles.edu_degree}>B.Tech Computer Science</Typography>
                                <Typography className={styles.edu_school}>Delhi Technical University</Typography>
                                <Typography className={styles.edu_date}>2016 - 2020</Typography>
                            </Box>
                        )}

                    </Box>
                </Box>
            </Box>
            <Fab
                onClick={handlePrint}
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16
                }}
            >
                <LocalPrintshopIcon />
            </Fab>
        </Box>
    )
}