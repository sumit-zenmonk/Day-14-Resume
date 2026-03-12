"use client"

import { Box, Typography } from "@mui/material"
import styles from "./premium_template_comp.module.css"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { selectContentByMobile } from "@/redux/feature/all_signup_users_content/allContentSlice"
import Image from "next/image"

export default function BasicTemplateComp() {
    const mobile_no = useSelector((state: RootState) => state.CurrLoginReducer.mobile_no)
    const userData = useSelector((state: RootState) => selectContentByMobile(state, mobile_no))
    const { basics, work, education, skills } = userData?.content_data || {};

    return (
        <Box className={styles.container}>
            {/* header top lecel */}
            <Box className={styles.header}>
                {/* logo box */}
                <Box className={styles.header_logo_box}>
                    <Typography className={styles.username}>
                        {basics?.name}
                    </Typography>
                    <Typography className={styles.profession}>
                        Chartered Accountant
                    </Typography>
                </Box>
                <Box className={styles.headerDesignLabel}></Box>

                {/* header deatisls side */}
                <Box className={styles.header_details}>
                    <Box className={styles.header_details_box}>
                        <Typography className={styles.headerLabel}>
                            Phone
                        </Typography>
                        <Typography className={styles.headerLabelText}>
                            {basics?.phone}
                        </Typography>
                    </Box>

                    <Box className={styles.header_details_box}>
                        <Typography className={styles.headerLabel}>
                            Email
                        </Typography>
                        <Typography className={styles.headerLabelText}>
                            {basics?.email}
                        </Typography>
                    </Box>

                    <Box className={styles.header_details_box}>
                        <Typography className={styles.headerLabel}>
                            Location
                        </Typography>
                        <Typography className={styles.headerLabelText}>
                            {basics?.location?.address}, {basics?.location?.city}
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
                            {basics?.summary}
                        </Typography>
                    </Box>

                    {/* skills */}
                    <Box className={styles.section_box}>
                        <Typography className={styles.section_title}>
                            Key Skills
                        </Typography>
                        <Box className={styles.skill_box}>
                            {skills && skills.length && skills.map((skill: any, idx: number) => (
                                <Box key={idx} className={styles.skill_item}>
                                    <Typography className={styles.skill_name}>
                                        {skill.name}
                                    </Typography>
                                    <Typography className={styles.skill_level}>
                                        {skill.level}
                                    </Typography>
                                </Box>
                            ))}
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
                        {work && work.length && work.map((job: any, idx: number) => (
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
                        ))}
                    </Box>

                    {/* education section */}
                    <Box className={styles.section_box}>
                        <Typography className={styles.section_title}>
                            Education
                        </Typography>
                        {education && education.length && education.map((edu: any, idx: number) => (
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
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}