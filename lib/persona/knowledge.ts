export const personaKnowledge = {
  profile: {
    fullName: "Binyam Cheru Debebe",
    displayName: "Binyam Cheru",
    professionalTitle: "Software Engineer | Full-Stack Developer",
    shortTitle: "Full-Stack Developer",
    location: "Addis Ababa, Ethiopia",
    shortSummary:
      "I build modern web applications with React, Next.js, Node.js and Django. I care about shipping useful products, learning new technologies, and solving real-world problems through code.",
    motto: "Build things that solve real problems.",
    summary:
      "Full-stack developer who ships end to end: REST APIs, authentication and data models in Node.js/TypeScript and Django, and fast, accessible interfaces in Next.js and React. Internship experience on production platforms, a published Chrome extension, and a habit of writing clean, documented, tested code. Strong foundation in software engineering principles, problem-solving and modern development workflows.",
  },
  contact: {
    email: "binyamcheru123@gmail.com",
    phone: "+251 991 807 596",
    portfolio: "https://binyam-cheru.vercel.app",
    github: "https://github.com/binyamcheru",
    linkedin: "https://linkedin.com/in/binyam-cheru",
    x: "https://x.com/bini_code",
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
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
  ],
  projects: [
    // ── Selected work ──────────────────────────────────────────────
    {
      slug: "yemuyaweg-initiative",
      category: "frontend",
      featured: true,
      name: "YeMuyaWeg Initiative Platform",
      subtitle: "Youth Mentorship and Career Platform",
      year: "2025",
      role: "Frontend Developer (team)",
      description:
        "The official platform of the YeMuyaWeg Initiative, a mission-driven program empowering Ethiopian youth through mentorship and career development. I worked as a frontend developer in the product team.",
      contributions: [
        "Worked as part of a collaborative team to build a platform empowering Ethiopian youth through mentorship and career development.",
        "Designed and implemented responsive user interfaces for accessibility across devices.",
        "Optimized platform performance and enhanced user experience.",
        "Contributed to a mission-driven platform targeting impact for over 15 million people by 2034.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      website: "https://yemuyaweginitiative.com/",
      repository: null,
      card: {
        image: "/yemuyaweg/01.png",
        status: "Production",
        problem:
          "Ethiopian youth need an accessible, multilingual platform to find mentorship and career-development opportunities.",
        action:
          "Built responsive, accessible user interfaces as part of the frontend team and optimised page performance and UX.",
        result:
          "The platform is live in production and targets impact for over 15 million people by 2034.",
      },
      gallery: ["/yemuyaweg/02.png", "/yemuyaweg/03.png"],
    },
    {
      slug: "boardwave",
      category: "fullstack",
      featured: true,
      name: "BoardWave",
      subtitle: "Real-time Collaborative Whiteboard with Video Calls",
      year: "2026",
      role: "Full-Stack Developer (solo)",
      description:
        "A real-time collaborative whiteboard with built-in peer-to-peer video calls. Draw on a shared canvas with live cursors while talking to your team, all in the browser with nothing to install.",
      contributions: [
        "Built the shared canvas (pen, shapes, arrows, text, sticky notes, images) synced to every participant in real time over WebSockets, with live named cursors.",
        "Implemented peer-to-peer video and audio with a WebRTC mesh, STUN/TURN configuration and graceful fallback when no device is available.",
        "Designed rooms with short join codes, host/participant roles, lockable rooms, peer limits and a dashboard with live-presence badges and board thumbnails.",
        "Built accounts with avatar picker, email verification, password reset and JWT auth for both the REST API and the WebSocket handshake.",
        "Persisted board state to PostgreSQL with debounced writes and automatic reconnection with exponential backoff.",
      ],
      technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Express 5", "WebSockets", "WebRTC", "Prisma", "PostgreSQL"],
      website: "https://boardwave.vercel.app/",
      repository: "https://github.com/binyamcheru/boardwave",
      card: {
        image: "/boardwave/01.png",
        status: "Live",
        problem:
          "Remote teams juggle a whiteboard tool and a separate video call; the two never stay in sync and both usually need accounts and installs.",
        action:
          "Designed a single browser app where canvas edits and cursors flow over WebSockets while video and audio go peer-to-peer over WebRTC, backed by an Express API and Prisma/PostgreSQL.",
        result:
          "A deployed product (Vercel + Render + Neon) where up to four people can sketch and talk together with board state persisted between sessions.",
      },
      gallery: ["/boardwave/02.png", "/boardwave/03.png", "/boardwave/04.png"],
    },
    {
      slug: "scrollshot",
      category: "extension",
      featured: true,
      name: "ScrollShot",
      subtitle: "Full Page Screenshot & Annotate — Chrome Extension",
      year: "2026",
      role: "Creator & Developer (solo)",
      description:
        "A Chrome extension published on the Chrome Web Store. ScrollShot takes full-page screenshots the way your phone does: capture, tap “Capture more” to extend down the page, then annotate, beautify and export, all on-device with no account, upload or watermark.",
      contributions: [
        "Capture modes: visible area, full page, dragged region or a clicked element; scroll capture that extends one screen at a time and works inside nested scroll areas, chat apps, docs sites and PDFs, with sticky headers and scrollbars hidden automatically.",
        "Annotation tools: arrows, boxes, ellipses, lines, highlights, pen, numbered steps and text, plus blur/black-out for sensitive data, with move, resize, undo and redo.",
        "Beautify: padding, rounded corners, soft shadow, gradient backgrounds and optional browser or phone frames for presentations and posts.",
        "Export: PNG, JPEG with a target file size, PDF as one long page or A4/Letter pages, searchable PDF with an invisible text layer, and OCR in 13 languages.",
        "Privacy-first architecture: all processing happens on-device; the extension only accesses the tab being captured. Keyboard shortcuts for every capture mode.",
      ],
      technologies: ["TypeScript", "Chrome Extensions API", "Canvas", "OCR", "PDF generation"],
      website: "https://chromewebstore.google.com/detail/cilmjodgabkgkfgmbjafklkbleelhfeh",
      repository: null,
      card: {
        image: "/scroll-shot/01.png",
        status: "Published",
        problem:
          "Most screenshot extensions either capture the whole page blindly, upload your images to a server, or add watermarks and paywalls.",
        action:
          "Built a privacy-first extension with phone-style incremental scroll capture, a full annotation and beautify workspace, and multi-format export including searchable PDFs and OCR.",
        result:
          "Published on the Chrome Web Store (v1.0.0) with a public privacy policy and support site; free, no account, no upload, no watermark.",
      },
      gallery: ["/scroll-shot/02.png", "/scroll-shot/03.png", "/scroll-shot/04.png"],
    },

    // ── Full-stack ─────────────────────────────────────────────────
    {
      slug: "buna-house",
      category: "fullstack",
      featured: false,
      name: "Buna House Coffee Shop",
      subtitle: "E-commerce Storefront + Admin Dashboard",
      year: "2026",
      role: "Full-Stack Developer (solo)",
      description:
        "A full-stack e-commerce site for a coffee shop in Bole, Addis Ababa. A public storefront with menu, cart and checkout, plus an admin dashboard for products, orders, customers, leads and analytics, all served from one Next.js app with API routes and Supabase.",
      contributions: [
        "Built the storefront: categorised menu, cart, checkout and order-confirmation flow.",
        "Built the admin dashboard with orders, products, customers, leads, analytics and settings, protected by server-side auth with bcrypt-hashed passwords.",
        "Modelled the Postgres schema on Supabase with Row Level Security and storage buckets for product images.",
        "Added rate limiting, input validation and a read-only demo admin account whose write requests are rejected server-side.",
      ],
      technologies: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "bcrypt"],
      website: "https://buna-house-ochre.vercel.app/",
      repository: "https://github.com/binyamcheru/buna-house",
      card: {
        image: "/buna-house/01.png",
        status: "Live",
        problem:
          "A local coffee shop needed online ordering and a way to manage products, orders and customers without a separate backend service to host.",
        action:
          "Shipped storefront and admin in a single Next.js App Router project backed by Supabase Postgres, RLS and storage, with a safe read-only demo login.",
        result:
          "A live storefront and admin dashboard (demo login available) covering the full order-to-fulfilment loop.",
      },
      gallery: ["/buna-house/02.png", "/buna-house/03.png", "/buna-house/04.png"],
    },
    {
      slug: "devflow",
      category: "fullstack",
      featured: false,
      name: "DevFlow - Better Stack Overflow",
      subtitle: "AI-Powered Developer Q&A",
      year: "2025",
      role: "Full-Stack Developer",
      description:
        "An AI-powered developer knowledge-sharing and collaboration platform with questions, answers, profiles and Gemini-assisted responses.",
      contributions: [
        "Built a developer collaboration platform with AI-assisted responses and modern authentication.",
        "Implemented question-and-answer functionality, profile management, and responsive user interfaces.",
        "Integrated AI-powered features using the Gemini API.",
        "Developed scalable frontend and backend architecture with modern UI components.",
      ],
      technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Shadcn/UI", "Zod", "Auth.js", "Gemini API"],
      website: "https://devflow-nextjs-project-xnxb.vercel.app/",
      repository: "https://github.com/binyamcheru/Devflow-Nextjs-Project",
      card: {
        image: "/devflow/01.png",
        status: "Live",
        problem:
          "Developers need a modern knowledge-sharing platform with AI assistance for collaboration and problem-solving.",
        action:
          "Built question-and-answer features, profile management, Auth.js authentication, and Gemini-powered responses.",
        result:
          "Delivered a responsive full-stack developer collaboration platform with integrated AI assistance.",
      },
      gallery: ["/devflow/02.png", "/devflow/03.png"],
    },
    {
      slug: "habesha-home",
      category: "fullstack",
      featured: false,
      name: "Habesha Home",
      subtitle: "Mobile Home Rental Marketplace (Flutter)",
      year: "2026",
      role: "Mobile Developer (solo)",
      description:
        "A premium home-rental marketplace for the Ethiopian market built with Flutter and Firebase. Renters discover and book homes with local mobile payments; owners manage listings, bookings, a wallet and payouts.",
      contributions: [
        "Built property discovery, detailed listings, favourites and a booking flow with check-in/out dates and guest management.",
        "Integrated the Chapa SDK for local digital-wallet and card payments.",
        "Implemented real-time chat between renters and owners, ratings and reviews, and instant notifications.",
        "Built the owner dashboard with earnings overview, wallet, transaction history and payout requests.",
        "Secured the app with Firebase Authentication and Firestore rules, with real-time data sync and dark/light themes.",
      ],
      technologies: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Chapa SDK"],
      website: null,
      repository: "https://github.com/binyamcheru/Habesha-Home",
      card: {
        image: "/habesha-home/03.jpg",
        status: "Demo",
        problem:
          "Finding and renting a home in Ethiopia is informal and offline; owners have no tooling for listings, bookings or payments.",
        action:
          "Designed and built a two-sided mobile marketplace with Firebase for auth and real-time data and Chapa for local payments.",
        result:
          "A complete renter and owner experience: discovery, booking, payment, chat, reviews and an owner wallet with payouts.",
      },
      gallery: [
        "/habesha-home/01.jpg",
        "/habesha-home/02.jpg",
        "/habesha-home/04.jpg",
        "/habesha-home/06.jpg",
        "/habesha-home/07.jpg",
        "/habesha-home/09.jpg",
        "/habesha-home/10.jpg",
        "/habesha-home/11.jpg",
        "/habesha-home/13.jpg",
      ],
      portrait: true,
    },

    // ── Backend ────────────────────────────────────────────────────
    {
      slug: "bank-system-api",
      category: "backend",
      featured: false,
      name: "Bank System API",
      subtitle: "Production-grade RESTful Banking API",
      year: "2026",
      role: "Backend Developer (solo)",
      description:
        "A production-grade banking REST API built with Node.js, TypeScript, Express 5 and MongoDB. Supports OTP email verification, Google sign-in, JWT access/refresh tokens with Redis revocation, accounts, cards, atomic transfers, beneficiaries, an admin panel and interactive Swagger docs.",
      contributions: [
        "Designed a modular architecture (auth, user, account, card, transaction, beneficiary, admin) on top of a generic repository layer and Mongoose models.",
        "Implemented registration with email OTP, Google OAuth sign-in, JWT access + refresh tokens and logout-everywhere with token revocation tracked in Redis.",
        "Built deposits, withdrawals and atomic transfers to beneficiaries, paginated statements and transaction summaries.",
        "Added role-based admin endpoints to list, block and unblock users, accounts and cards, plus dashboard statistics.",
        "Hardened the API with Zod validation, bcrypt, helmet, rate limiting, CORS allow-lists and NoSQL-injection sanitisation; documented everything with Swagger/OpenAPI and a Postman collection.",
      ],
      technologies: ["Node.js", "TypeScript", "Express 5", "MongoDB", "Mongoose", "Redis", "JWT", "Google OAuth", "Zod", "Swagger"],
      website: "https://bank-system-api-nm3l.onrender.com/api-docs/",
      repository: "https://github.com/binyamcheru/bank-system-api",
      card: {
        image: "/bank-system-api/01.png",
        status: "Live API",
        problem:
          "Banking back-ends need strict auth, atomic money movement and auditability, which most tutorial-grade APIs skip.",
        action:
          "Built a TypeScript Express 5 service with OTP + OAuth auth, refresh-token rotation, Redis revocation, atomic transfers and a full admin surface, documented with Swagger.",
        result:
          "A deployed, documented API (Swagger UI + Postman collection) covering the complete account, card and transaction lifecycle.",
      },
      gallery: ["/bank-system-api/02.png", "/bank-system-api/03.png"],
    },

    // ── Frontend ───────────────────────────────────────────────────
    {
      slug: "valmont-residences",
      category: "frontend",
      featured: false,
      name: "The Valmont Residences",
      subtitle: "Cinematic Luxury Real-Estate Experience",
      year: "2026",
      role: "Frontend Developer (solo)",
      description:
        "An ultra-luxury digital showcase for a fictional collection of eighteen private estates in Mayfair, London. A 60fps canvas scroll-scrubbing hero, multi-currency pricing, interactive floor plans, a viewing scheduler and an ambient soundscape.",
      contributions: [
        "Built a custom 2D-canvas scroll-scrubbing engine synced with GSAP ScrollTrigger and Lenis, with a decoupled render loop, adaptive frame fallback and a 24-stream concurrent preloader.",
        "Implemented a global currency context switching prices between GBP, USD, EUR and AED in real time.",
        "Built the residence typology inspector with floor-plan modals, a dossier request modal and a fullscreen lightbox.",
        "Created the private viewing scheduler with calendar, time-slot picker and consultation-format options.",
      ],
      technologies: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "GSAP", "Lenis", "HTML5 Canvas"],
      website: "https://valmont-residences.vercel.app/",
      repository: "https://github.com/binyamcheru/valmont-residences",
      card: {
        image: "/valmont/01.png",
        status: "Live",
        problem:
          "Luxury property marketing needs a cinematic, high-performance web experience that still works on mobile.",
        action:
          "Engineered a frame-sequence canvas hero with GSAP and Lenis, plus rich interactive modals, currency switching and a scheduler, all in Next.js 16.",
        result:
          "A fluid 60fps architectural tour and complete enquiry funnel, deployed on Vercel.",
      },
      gallery: ["/valmont/screen-capture.webm"],
    },
    {
      slug: "zemen-homes",
      category: "frontend",
      featured: false,
      name: "Zemen Homes",
      subtitle: "Real Estate Website",
      year: "2026",
      role: "Frontend Developer (solo)",
      description:
        "A premium real-estate website for Zemen Homes (ዘመን), a property development and management company in Addis Ababa, with live property search, detail galleries and an on-site inspection booking flow.",
      contributions: [
        "Built property listings with live search and filters for location, type, status, bedrooms and price range.",
        "Created property detail modals with image galleries, features and amenities, plus a developments showcase.",
        "Implemented an inspection booking modal with date picker and time-slot selector, and a contact form with success state.",
        "Added scroll-reveal animations, a mobile sticky CTA bar, WhatsApp float button and Open Graph SEO tags.",
      ],
      technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4"],
      website: "https://zemen-homes.vercel.app/",
      repository: "https://github.com/binyamcheru/zemen-homes",
      card: {
        image: "/zemen-homes/01.png",
        status: "Live",
        problem:
          "A property developer needed a modern site where visitors can search listings and book inspections without leaving the page.",
        action:
          "Built a fast Vite + React site with filterable listings, gallery modals and an in-page booking flow driven by a single content file.",
        result:
          "A fully responsive, SEO-ready real-estate site with search, galleries and inspection booking.",
      },
      gallery: ["/zemen-homes/02.png", "/zemen-homes/03.png", "/zemen-homes/04.png"],
    },
    {
      slug: "warka-restaurant",
      category: "frontend",
      featured: false,
      name: "Warka Restaurant",
      subtitle: "Restaurant Website Concept",
      year: "2026",
      role: "Frontend Developer (solo)",
      description:
        "A frontend concept built for Warka Restaurant on Bole Road, Addis Ababa, designed as a sales/demo piece: hero, gallery, featured menu, full categorised menu modal, reviews and an order / table-reservation modal.",
      contributions: [
        "Built the full marketing site with hero, gallery, featured items and a categorised full-menu modal.",
        "Implemented Order Food and Find a Table modals with in-page forms.",
        "Centralised all content (images, menu, reviews, business info) in editable data files for easy hand-off.",
        "Added scroll-reveal animations and verified a clean, type-checked production build.",
      ],
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS v4"],
      website: "https://warka-restaurant.vercel.app/",
      repository: "https://github.com/binyamcheru/warka-restaurant",
      card: {
        image: "/warka/01.png",
        status: "Concept",
        problem:
          "Local restaurants rarely have a site that shows the menu well and lets guests order or reserve a table.",
        action:
          "Designed and built a polished concept site with menu, reviews and ordering/reservation modals, structured so real content can be swapped in from one folder.",
        result:
          "A presentable demo ready to pitch to the restaurant, deployed on Vercel.",
      },
      gallery: ["/warka/02.png", "/warka/03.png", "/warka/04.png"],
    },
    {
      slug: "ketemafarm",
      category: "frontend",
      featured: false,
      name: "KetemaFarm",
      subtitle: "Urban Farmers Marketplace",
      year: "2024",
      role: "Frontend Developer (hackathon)",
      description:
        "A marketplace interface connecting urban farmers with city consumers, built during a hackathon sprint.",
      contributions: [
        "Developed product-browsing and listing interfaces during a fast-paced hackathon sprint.",
        "Created a responsive experience designed to improve the visibility of local produce.",
      ],
      technologies: ["React", "Tailwind CSS"],
      website: "https://ketemafarm-mu.vercel.app/",
      repository: null,
      card: {
        image: "/ketema-farm/01.png",
        status: "Hackathon",
        problem:
          "Urban farmers need a direct way to make fresh produce visible to city consumers.",
        action:
          "Developed responsive product-browsing and listing interfaces during a hackathon sprint.",
        result:
          "Built a marketplace interface that connects city farms with potential local customers.",
      },
      gallery: ["/ketema-farm/02.png", "/ketema-farm/03.png", "/ketema-farm/04.png", "/ketema-farm/05.png"],
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
  credentials: [
    {
      type: "certificate",
      name: "ALX Back-End Web Development (Django)",
      issuer: "ALX Africa",
      period: "May 2025 – September 2025",
      description:
        "Completed a four-month intensive backend development program focused on building, testing, and deploying scalable web applications using Django.",
      evidence: ["Django", "REST APIs", "SQL", "Backend Development"],
      link: "https://drive.google.com/file/d/1Mf-VneV01HLxAHx-BbDGNeSM7BnLpjA5/view?usp=drive_link",
    },
    {
      type: "certificate",
      name: "Frontend Development with React",
      issuer: "Google Developer Groups (GDG)",
      period: "December 2024 – June 2025",
      description:
        "Completed frontend development training focused on React, responsive applications, frontend architecture, and modern web development practices.",
      evidence: ["React", "Responsive UI", "Frontend Architecture", "Modern JavaScript"],
      link: "https://drive.google.com/file/d/12pd5wToypXEpnGFrl2_hasKsB5AoqpKy/view?usp=drive_link",
    },
    {
      type: "award",
      name: "Presidential Award",
      issuer: "Addis Ababa Science and Technology University",
      period: null,
      description:
        "Awarded for an outstanding semester GPA of 3.88/4.00, recognizing academic excellence and performance.",
      evidence: ["Academic Excellence", "Software Engineering", "3.88/4.00 GPA"],
      link: "https://drive.google.com/file/d/10KXTy-pmsVsSJfln1RRVGXDUKjZyugu-/view?usp=drive_link",
    },
    {
      type: "certificate",
      name: "Certificate of Appreciation — YeMuya Weg Initiative",
      issuer: "YeMuya Weg Initiative",
      period: null,
      description:
        "Recognized for dedication, professionalism, and valuable contributions during internship participation and platform development work.",
      evidence: ["Professionalism", "Web Development", "Dedication"],
      link: "https://drive.google.com/file/d/1B0IyQxRrs1mn8DYD57ky8QJMW9jylUuM/view?usp=drive_link",
    },
  ],
} as const;

export function buildPersonaContext() {
  return JSON.stringify(personaKnowledge, null, 2);
}
