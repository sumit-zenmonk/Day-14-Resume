"use client";

import HeaderComp from "@/component/header-comp/header-comp";
import styles from "./home.module.css";
import { Box } from "@mui/material";
import BasicTemplateComp from "@/app/(templates)/resume/v1/basic_template_comp";

export default function HomeComp() {
  const resume_data = {
    "basics": {
      "name": "Dev Sharma",
      "label": "Full Stack Developer",
      "image": "",
      "email": "Dev.sharma@email.com",
      "phone": "+91 98765 43210",
      "url": "https://dev.io",
      "summary": "Detail-oriented Software Engineer with 3+ years of experience building scalable web applications. Passionate about clean code, system architecture, and improving user experiences through modern JavaScript frameworks.",
      "location": {
        "address": "HSR Layout",
        "postalCode": "560102",
        "city": "Bengaluru",
        "countryCode": "IN",
        "region": "Karnataka"
      },
      "profiles": [{
        "network": "LinkedIn",
        "username": "Dev-sharma-dev",
        "url": "https://linkedin.com"
      }, {
        "network": "GitHub",
        "username": "Dev-codes",
        "url": "https://github.com"
      }]
    },
    "work": [{
      "name": "TechFlow Solutions",
      "position": "SDE-I",
      "url": "https://techflow.io",
      "startDate": "2021-06-01",
      "endDate": "Present",
      "summary": "Leading the frontend migration from legacy jQuery to React, improving site performance by 40%.",
      "highlights": [
        "Architected a reusable component library used across 4 internal products",
        "Optimized API response times by 25% through Redis caching implementation"
      ]
    }],
    "volunteer": [{
      "organization": "Code For India",
      "position": "Mentor",
      "url": "https://codeforindia.org",
      "startDate": "2022-01-01",
      "endDate": "Present",
      "summary": "Teaching basic web development to students from underprivileged backgrounds.",
      "highlights": [
        "Mentored 15+ students through their first React projects"
      ]
    }],
    "education": [{
      "institution": "Vellore Institute of Technology",
      "url": "https://vit.ac.in",
      "area": "Computer Science & Engineering",
      "studyType": "B.Tech",
      "startDate": "2017-07-01",
      "endDate": "2021-05-30",
      "score": "8.8 CGPA",
      "courses": [
        "CS202 - Data Structures and Algorithms",
        "CS301 - Database Management Systems"
      ]
    }],
    "awards": [{
      "title": "Spot Award for Excellence",
      "date": "2023-03-15",
      "awarder": "TechFlow Solutions",
      "summary": "Recognized for rapid delivery of the high-priority 'E-commerce Checkout' module."
    }],
    "certificates": [{
      "name": "AWS Certified Developer – Associate",
      "date": "2022-08-20",
      "issuer": "Amazon Web Services",
      "url": "https://aws.amazon.com"
    }],
    "publications": [{
      "name": "The Rise of Edge Computing",
      "publisher": "Medium - Towards Dev",
      "releaseDate": "2023-11-10",
      "url": "https://medium.com",
      "summary": "An analysis of how edge computing is transforming latency-sensitive applications."
    }],
    "skills": [{
      "name": "Frontend",
      "level": "Expert",
      "keywords": ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    }, {
      "name": "Backend",
      "level": "Intermediate",
      "keywords": ["Node.js", "Express", "PostgreSQL", "MongoDB"]
    }],
    "languages": [{
      "language": "English",
      "fluency": "Professional Working Proficiency"
    }, {
      "language": "Hindi",
      "fluency": "Native"
    }],
    "interests": [{
      "name": "Open Source",
      "keywords": ["Documentation", "CLI Tools"]
    }],
    "references": [{
      "name": "Anjali Rao",
      "reference": "Dev is an exceptionally fast learner who consistently delivers high-quality code."
    }],
    "projects": [{
      "name": "TaskMaster Pro",
      "startDate": "2023-01-01",
      "endDate": "2023-04-01",
      "description": "A collaborative task management tool with real-time updates via WebSockets.",
      "highlights": [
        "Implemented Drag-and-Drop UI using dnd-kit",
        "Integrated OAuth2 for secure Google/GitHub login"
      ],
      "url": "https://taskmasterpro.vercel.app"
    }]
  }

  return (
    <Box className={styles.container}>
      <HeaderComp />
      <BasicTemplateComp resume_data={resume_data} />
    </Box>
  );
}
