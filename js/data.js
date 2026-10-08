/**
 * Resume Data Source
 * Easily update this file to modify content across the entire website.
 */
const resumeData = {
  // ==========================================
  // SECTION 1: BIO & HERO
  // ==========================================
  personal: {
    name: "Collin Webb",
    pronouns: "he/him",
    role: "AI & Robotics Systems Engineer",
    tagline: "Bridging autonomous AI agents, robotics software, and physical engineering to build intelligent real-world systems.",
    availability: "Open to High-Impact Opportunities",
    location: "Rexburg, ID (Open to Remote & Relocation)",
    email: "collinwebb007@gmail.com",
    phone: "",
    github: "https://github.com/collinwebb007",
    linkedin: "https://www.linkedin.com/in/collinwebb/",
    resumePdfUrl: "#", // link to downloadable PDF resume
    about: [
      "I am an engineer focused at the intersection of Autonomous AI Agents, Robotics, and Modern Software Systems. With a multidisciplinary background combining generative AI workflows, robotics controls, and precision CAD design, I bring a unique capability to architect solutions that bridge digital intelligence and physical engineering.",
      "Whether designing multi-agent orchestration pipelines, programming robotics controllers, or modeling physical assemblies, I thrive on shipping robust, production-grade systems from concept to reality."
    ],
    stats: [
      { label: "AI & Agentic Systems", value: "Multi-Agent" },
      { label: "Robotics & Controls", value: "Hardware/Sim" },
      { label: "Design & Modeling", value: "3D CAD" },
      { label: "Engineering Mindset", value: "0 to 1" }
    ]
  },

  // ==========================================
  // SECTION 2: SKILLS & STRENGTHS
  // ==========================================
  skills: {
    categories: [
      {
        id: "ai-agents",
        name: "AI & Agentic Systems",
        icon: "cpu",
        items: [
          { name: "Autonomous Agent Orchestration", level: 94 },
          { name: "LLM APIs & Prompt Engineering", level: 95 },
          { name: "RAG & Vector Embeddings", level: 88 },
          { name: "Tool & Function Calling Pipelines", level: 92 },
          { name: "Python (LangChain, LlamaIndex, PyTorch)", level: 90 }
        ]
      },
      {
        id: "robotics",
        name: "Robotics & Hardware Systems",
        icon: "activity",
        items: [
          { name: "Robotics Control & Kinematics", level: 88 },
          { name: "ROS / Embedded Linux / Microcontrollers", level: 85 },
          { name: "Sensor & Actuator Integration (IMU, LiDAR)", level: 86 },
          { name: "Real-time Telemetry & Communications", level: 84 },
          { name: "C++ & Python Control Loops", level: 88 }
        ]
      },
      {
        id: "cad-hardware",
        name: "CAD & Rapid Prototyping",
        icon: "box",
        items: [
          { name: "3D CAD Modeling (SolidWorks / Fusion 360)", level: 92 },
          { name: "Mechanical Assembly & Tolerance Design", level: 88 },
          { name: "Additive Manufacturing & 3D Printing", level: 90 },
          { name: "Hardware Prototyping & Enclosures", level: 86 },
          { name: "Technical Drafting & BOM Management", level: 82 }
        ]
      },
      {
        id: "software-dev",
        name: "Software & Web Development",
        icon: "code",
        items: [
          { name: "JavaScript / TypeScript (React, Node.js)", level: 90 },
          { name: "Git, GitHub Actions & CI/CD", level: 92 },
          { name: "REST APIs, WebSockets & IoT Streams", level: 88 },
          { name: "Linux Systems & Docker Containers", level: 85 },
          { name: "UI/UX Dashboards & 3D Visualization", level: 86 }
        ]
      }
    ],
    coreStrengths: [
      {
        title: "Autonomous Agent Architecture",
        desc: "Designing intelligent multi-agent systems that autonomously reason, leverage tools, retrieve context, and execute complex workflows."
      },
      {
        title: "Physical-to-Digital Synthesis",
        desc: "Uniting software intelligence with real-world physical systems—linking AI reasoning to robotic actuators, sensors, and microcontrollers."
      },
      {
        title: "Rapid Prototyping (CAD to Code)",
        desc: "Taking ideas from initial 3D parametric CAD models and physical fabrication to robust firmware and control software."
      },
      {
        title: "First-Principles Problem Solving",
        desc: "Dissecting multidisciplinary engineering challenges across mechanics, electronics, and software to deliver reliable products."
      }
    ]
  },

  // ==========================================
  // SECTION 3: WORK EXPERIENCE
  // ==========================================
  experience: [
    {
      role: "Robotics & Automation Engineer",
      company: "Industrial Robotics & Automation Solutions",
      location: "Rexburg, ID",
      period: "2023 - Present",
      type: "Full-Time",
      description: "Leading the development of robotic warehouse automation workflows and building intelligent AI-driven customer service systems.",
      achievements: [
        "Architected and deployed automated storage and retrieval automation, significantly increasing inventory throughput and optimizing spatial storage efficiency.",
        "Integrated robotic hardware, motor controllers, and optical/positional sensor telemetry with inventory management control software.",
        "Designed and trained custom AI customer service chatbots using LLM architectures and retrieval pipelines, automating Tier-1 inquiry triage and resolving customer issues 50% faster.",
        "Spearheaded hardware-software integration loops, bridging CAD mechanical component design with firmware and backend automation logic."
      ],
      technologies: ["Robotics Control", "Python", "CAD / SolidWorks", "AI Agents & LLMs", "Sensor Telemetry", "C++", "REST APIs"]
    },
    {
      role: "AI & Mechanical Systems Prototyper",
      company: "Advanced Systems Lab",
      location: "Rexburg, ID",
      period: "2022 - 2023",
      type: "Contract / Research",
      description: "Spearheaded rapid prototyping of electromechanical mechanisms, CAD models, and autonomous software workflows.",
      achievements: [
        "Modeled complex mechanical assemblies, custom brackets, and robotic chassis using parametric 3D CAD (SolidWorks) optimized for additive manufacturing (3D printing).",
        "Developed autonomous Python agent scripts for automated data extraction, reporting, and multi-step computational task execution.",
        "Conducted physical testing, tolerance analysis, and reliability benchmarking on electromechanical prototypes."
      ],
      technologies: ["3D CAD Modeling", "Rapid Prototyping", "Python", "Kinematics", "Additive Manufacturing", "Git"]
    }
  ],

  // ==========================================
  // SECTION 4: FEATURED PROJECTS
  // ==========================================
  projects: [
    {
      id: "project-1",
      title: "Automated Robotic Storage & Retrieval System",
      category: "Robotics",
      featured: true,
      tagline: "Autonomous inventory automation & material handling optimization",
      description: "Designed and engineered an automated storage mechanism integrating motor actuators, optical sensors, and central inventory databases to streamline warehouse spatial utilization.",
      metrics: "35% faster retrieval cycles • Zero-collision telemetry",
      tech: ["Robotics Controls", "Python", "CAD / SolidWorks", "Microcontrollers", "Sensors"],
      liveUrl: "",
      githubUrl: "https://github.com/collinwebb007",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)"
    },
    {
      id: "project-2",
      title: "Agentic AI Customer Support Intelligence",
      category: "AI Agents",
      featured: true,
      tagline: "Autonomous multi-agent customer service assistant with knowledge retrieval",
      description: "Engineered and trained custom conversational AI chatbots using LLMs and RAG pipelines. Equipped with tool-calling capabilities to look up orders, diagnose customer issues, and escalate complex requests.",
      metrics: "50% reduction in response time • 85%+ automated resolution",
      tech: ["Python", "LLM APIs", "RAG / Embeddings", "Prompt Engineering", "FastAPI"],
      liveUrl: "",
      githubUrl: "https://github.com/collinwebb007",
      gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
    },
    {
      id: "project-3",
      title: "Parametric 3D Robotic Gripper & Chassis Assembly",
      category: "CAD & Hardware",
      featured: true,
      tagline: "Custom mechanical assemblies optimized for rapid additive prototyping",
      description: "Engineered 3D CAD mechanical models for custom robotic end-effectors and modular component enclosures. Tested for mechanical tolerances, structural rigidity, and seamless motor mounting.",
      metrics: "Rapid 3D print turnaround • High-strength lightweight geometry",
      tech: ["SolidWorks", "Fusion 360", "3D Printing (FDM)", "Mechanical Design", "GD&T"],
      liveUrl: "",
      githubUrl: "https://github.com/collinwebb007",
      gradient: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)"
    },
    {
      id: "project-4",
      title: "Autonomous Multi-Agent Task Orchestrator",
      category: "AI Agents",
      featured: true,
      tagline: "Multi-agent coordination pipeline for automated workflows and data synthesis",
      description: "An agentic system where specialized AI agents collaborate—planning tasks, running search and validation routines, and compiling structured reports with self-correcting error handling.",
      metrics: "Multi-agent tool orchestration • Automated task reasoning",
      tech: ["Python", "Multi-Agent Systems", "Vector DBs", "Async Workflows"],
      liveUrl: "",
      githubUrl: "https://github.com/collinwebb007",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
    }
  ],

  // ==========================================
  // SECTION 5: EDUCATION & CERTIFICATIONS
  // ==========================================
  education: [
    {
      institution: "Brigham Young University - Idaho (BYU-Idaho)",
      degree: "Bachelor of Science in Business Analytics",
      period: "Undergraduate",
      location: "Rexburg, ID",
      highlights: [
        "Focus on quantitative systems optimization, statistical modeling, and data-driven automation.",
        "Bridging business ROI and analytics with hands-on robotics engineering, SolidWorks CAD modeling, and autonomous AI agents."
      ]
    }
  ],
  certifications: [
    {
      name: "Certified SOLIDWORKS Associate (CSWA) – Mechanical Design",
      issuer: "Dassault Systèmes",
      year: "Certified",
      credentialUrl: "https://www.linkedin.com/in/collinwebb/"
    },
    {
      name: "Robotics & Warehouse Systems Automation",
      issuer: "Applied Industrial Automation",
      year: "Practitioner",
      credentialUrl: "https://www.linkedin.com/in/collinwebb/"
    },
    {
      name: "Autonomous AI & Agentic Systems",
      issuer: "LLM & Agent Architecture",
      year: "Specialization",
      credentialUrl: "https://www.linkedin.com/in/collinwebb/"
    }
  ]
};
