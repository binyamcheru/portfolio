export const personaKnowledge = {
  profile: {
    fullName: "Binyam Cheru Debebe",
    professionalTitle: "Software Engineer | Full-Stack Developer",
    location: "Addis Ababa, Ethiopia",
    summary:
      "Passionate and detail-oriented Full Stack Developer with experience building scalable web applications, responsive user interfaces, and modern digital platforms. Skilled in developing full-stack solutions using Next.js, React, Node.js, Django, and MongoDB. Experienced in collaborative development environments, performance optimization, and creating user-focused applications for real-world impact. Strong foundation in software engineering principles, problem-solving, and modern development workflows.",
  },
  contact: {
    email: "binyamcheru123@gmail.com",
    phone: "+251 991 807 596",
    portfolio: "https://binyam-cheru.vercel.app",
    github: "https://github.com/binyamcheru",
    linkedin: "https://linkedin.com/in/binyam-cheru",
  },
  experience: [
    {
      role: "Backend Developer Intern",
      organization: "Kuraz Technologies",
      period: "July 2025 – September 2025",
      location: "Addis Ababa, Ethiopia",
      responsibilities: [
        "Developed and maintained backend systems using Express.js and Node.js with a focus on scalability and performance.",
        "Built and integrated RESTful APIs, JWT authentication, and role-based access control systems.",
        "Improved database efficiency and scalability through optimized queries and backend performance enhancements.",
        "Maintained clean and modular backend architecture while collaborating within an agile development team.",
      ],
      technologies: [
        "Express.js",
        "Node.js",
        "MongoDB",
        "REST APIs",
        "JWT Authentication",
      ],
    },
    {
      role: "Software Engineering Intern",
      organization: "Stenar Trading",
      period: "October 2025 – November 2025",
      location: "Addis Ababa, Ethiopia",
      responsibilities: [
        "Collaborated with a development team to build a platform focused on youth career development and mentorship.",
        "Designed and implemented responsive and accessible user interfaces across multiple devices.",
        "Improved website performance and user experience through frontend optimization.",
        "Contributed to a scalable platform designed to reach millions of users.",
        "Worked with modern frontend technologies and agile development practices.",
      ],
      technologies: ["Next.js", "JavaScript", "Tailwind CSS"],
    },
  ],
  projects: [
    {
      name: "YeMuyaWeg Initiative Platform",
      description:
        "A youth mentorship and career-development platform built collaboratively for the YeMuyaWeg Initiative.",
      contributions: [
        "Designed and implemented responsive user interfaces for accessibility across devices.",
        "Optimized platform performance and enhanced user experience.",
        "Contributed to a mission-driven platform targeting impact for over 15 million people by 2034.",
      ],
      technologies: ["Next.js", "JavaScript", "Tailwind CSS"],
      website: "https://yemuyaweginitiative.com",
    },
    {
      name: "DevFlow - Better Stack Overflow",
      description:
        "An AI-powered developer knowledge-sharing and collaboration platform.",
      contributions: [
        "Built AI-assisted responses and modern authentication.",
        "Implemented question-and-answer functionality, profile management, and responsive user interfaces.",
        "Integrated AI-powered features using the Gemini API.",
        "Developed scalable frontend and backend architecture with modern UI components.",
      ],
      technologies: [
        "Next.js",
        "MongoDB",
        "Tailwind CSS",
        "Shadcn/UI",
        "Zod",
        "Auth.js",
        "Gemini API",
      ],
    },
    {
      name: "Habesha Home",
      description:
        "A mobile home-rental application tailored for the Ethiopian market.",
      contributions: [
        "Built property listing, home searching, and rental management features for renters and property owners.",
        "Implemented secure user authentication and real-time data synchronization using Firebase services.",
        "Designed responsive and intuitive mobile UI/UX focused on accessibility and ease of use.",
        "Developed cloud-based backend functionality with real-time database integration.",
      ],
      technologies: ["Flutter", "Firebase", "Dart"],
    },
  ],
  educationAndTraining: [
    {
      institution: "Addis Ababa Science and Technology University",
      program: "B.Sc. in Software Engineering",
      details: [
        "Data Structures and Algorithms",
        "Database Systems",
        "Object-Oriented Programming",
        "Operating Systems",
        "Networking",
        "System Analysis and Modeling",
        "Computer Architecture",
        "Machine Learning",
      ],
    },
    {
      institution: "ALX Africa",
      program: "ALX Back-End Web Development Program",
      period: "May 2025 – September 2025",
      details: [
        "Completed intensive backend training focused on Django and scalable web application development.",
        "Built, tested, and deployed backend systems using modern development practices.",
        "Earned a professional completion certificate.",
      ],
    },
    {
      institution: "Google Developer Groups (GDG)",
      program: "Frontend Development Training",
      period: "December 2024 – June 2025",
      location: "Addis Ababa, Ethiopia",
      details: [
        "Completed training focused on React and modern web development best practices.",
        "Built interactive and responsive web applications while improving frontend architecture and UI development skills.",
        "Earned a certificate of completion.",
      ],
    },
  ],
  skills: {
    programmingLanguages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL",
      "Java",
      "C++",
      "PHP",
    ],
    frameworksAndTechnologies: [
      "React.js",
      "Next.js",
      "Django",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    toolsAndPlatforms: ["Git", "GitHub", "Docker", "Figma", "REST APIs"],
  },
  awards: [
    {
      name: "Presidential Award",
      issuer: "Addis Ababa Science and Technology University",
      description:
        "Awarded for an outstanding semester GPA of 3.88/4.00, recognizing academic excellence and performance.",
    },
  ],
  certificates: [
    {
      name: "ALX Back-End Web Development (Django)",
      description:
        "Completed a four-month intensive backend development program focused on building, testing, and deploying scalable web applications using Django.",
    },
    {
      name: "Certificate of Appreciation — YeMuya Weg Initiative",
      description:
        "Recognized for dedication, professionalism, and valuable contributions during internship participation and platform development work.",
    },
  ],
} as const;

export function buildPersonaContext() {
  return JSON.stringify(personaKnowledge, null, 2);
}
