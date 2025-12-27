"use client";

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { ChevronDown, Github, Linkedin, Mail, Twitter, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"


export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    alert("Message Sent");
    setName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1 },
    )

    const reveals = document.querySelectorAll(".reveal")
    reveals.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll(".parallax")
      parallaxElements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || "0.5")
        const yPos = -(window.scrollY * speed)
          ; (el as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv.pdf"
    link.download = "Developer_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="hero-gradient min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-6 py-20 flex items-center justify-between min-h-screen max-w-6xl">
          <div className="fade-in max-w-2xl">
            <h1 className="text-7xl max-sm:text-4xl font-bold text-[#06b6d4] mb-6 leading-tight">Hi, I'm a Web Developer</h1>
            <p className="text-xl text-[#cbd5e1] mb-8 leading-relaxed slide-in-left">
              I craft beautiful, functional web experiences with clean code
              <br />
              and modern design principles.
            </p>

            <div className="flex gap-6 mb-12">
              <a
                // href="https://github.com"
                href="https://github.com/bilalarshad2753-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-50 cursor-pointer w-12 h-12 rounded-full bg-[#1e293b] border border-[#334155] flex items-center justify-center hover:border-[#06b6d4] hover:bg-[#06b6d4]/10 transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-6 h-6 text-[#06b6d4] group-hover:rotate-12 transition-transform" />
              </a>
              <a

                href="https://www.linkedin.com/in/bilal-arshad-5128b3286/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-50 cursor-pointer w-12 h-12 rounded-full bg-[#1e293b] border border-[#334155] flex items-center justify-center hover:border-[#06b6d4] hover:bg-[#06b6d4]/10 transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-6 h-6 text-[#06b6d4] group-hover:rotate-12 transition-transform" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-50 cursor-pointer w-12 h-12 rounded-full bg-[#1e293b] border border-[#334155] flex items-center justify-center hover:border-[#06b6d4] hover:bg-[#06b6d4]/10 transition-all duration-300 hover:scale-110 group"
              >
                <Twitter className="w-6 h-6 text-[#06b6d4] group-hover:rotate-12 transition-transform" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=bilalarshad2753@gmail.com"
                target="_blank"
                className="relative z-50 cursor-pointer w-12 h-12 rounded-full bg-[#1e293b] border border-[#334155] flex items-center justify-center hover:border-[#06b6d4] hover:bg-[#06b6d4]/10 transition-all duration-300 hover:scale-110 group"
              >
                <Mail className="w-6 h-6 text-[#06b6d4] group-hover:rotate-12 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 stagger-children">
              <Button
                size="lg"
                onClick={() => handleScrollToSection("projects")}
                className="bg-[#06b6d4] text-[#0f172a] hover:bg-[#0891b2] text-base px-8 py-6 rounded-lg font-medium hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#06b6d4]/50 ripple relative overflow-hidden group"
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 shimmer"></span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                // onClick={() => handleScrollToSection("contact")}
                className="glass-card text-[#06b6d4] hover:bg-[#06b6d4]/20 text-base px-8 py-6 rounded-lg font-medium hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#06b6d4]/30 ripple"
              >
                Get in Touch
              </Button>


              <a
                href="/1.png"
                target="_blank"
                rel="noopener noreferrer"
                download="Bilal_Arshad_CV.png"
                className="inline-block"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-card text-[#06b6d4] hover:bg-[#06b6d4]/20 text-base px-8 py-6 rounded-lg font-medium hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#06b6d4]/30 ripple bg-transparent"
                >
                  {/* +92 313 4692510 */}

                  Download CV
                </Button>
              </a>



              {/* <Button
                size="lg"
                variant="outline"
                onClick={handleDownloadCV}
                className="glass-card text-[#06b6d4] hover:bg-[#06b6d4]/20 text-base px-8 py-6 rounded-lg font-medium hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#06b6d4]/30 ripple bg-transparent"
              >
                Download CV
              </Button> */}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-96 h-96 animate-float">
              <div className="absolute inset-0 bg-[#06b6d4]/20 rounded-full blur-3xl animate-pulse blob"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#06b6d4] via-[#0891b2] to-[#06b6d4] animate-spin-slow p-1">
                <div className="w-full h-full rounded-full bg-[#0f172a]"></div>
              </div>
              <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-[#06b6d4]/30 shadow-2xl shadow-[#06b6d4]/20">
                <img src="/professional-web-developer.png" alt="Developer" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-[#06b6d4] rounded-full animate-ping opacity-20"></div>
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-[#06b6d4] rounded-full animate-ping opacity-20"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-arrow cursor-pointer"
          onClick={() => handleScrollToSection("projects")}
        >
          <ChevronDown className="w-8 h-8 text-[#06b6d4]" />
        </div>
      </section>

      {/* Projects Section - Unique: 3D Perspective Cards with Parallax */}
      <section id="projects" className="min-h-screen py-20 bg-[#0f172a] reveal">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-[#06b6d4] mb-4">Projects</h2>
            <p className="text-xl text-[#cbd5e1]">Some of my recent work</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
            {[
              {
                title: "E-Commerce Platform",
                description: "A modern online shopping experience with cart functionality and checkout",
                image: "/modern-ecommerce-website.png",
                tags: ["Next.js", "Stripe", "Tailwind"],
                link: "#",
              },
              {
                title: "Task Management App",
                description: "Collaborative task tracking with real-time updates and team features",
                image: "/task-management-dashboard.png",
                tags: ["React", "Firebase", "TypeScript"],
                link: "#",
              },
              {
                title: "Weather Dashboard",
                description: "Real-time weather data visualization with forecasts and alerts",
                image: "/weather-application.png",
                tags: ["Vue.js", "API", "Charts"],
                link: "#",
              },
              {
                title: "Real Estate Platform",
                description: "A marketplace to manage real estate assets, and connect buyers with agents.",
                image: "/real-estate-platform.jpg",
                tags: ["Next.js", "PostgreSQL", "Redis"],
                link: "#",
              },
              {
                title: "Portfolio Website",
                description: "Showcase creative work with beautiful layouts and animations",
                image: "/portfolio-builder-interface.jpg",
                tags: ["Gatsby", "GraphQL", "Framer"],
                link: "#",
              },
              {
                title: "Fitness Tracker",
                description: "Track workouts, monitor progress, and achieve fitness goals",
                // image: "/fitness-tracking-app.png",
                image: "/fitness-tracking-app-interface.png",
                tags: ["React Native", "MongoDB", "Node.js"],
                link: "#",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="bg-[#1e293b] border border-[#334155] hover:border-[#06b6d4] transition-all duration-700 group overflow-hidden project-card-3d"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                  />
                </div>
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#06b6d4]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <h3 className="text-xl font-bold text-[#e2e8f0] mb-2 group-hover:text-[#06b6d4] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#94a3b8] mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#334155] text-[#06b6d4] border-0 group-hover:bg-[#06b6d4] group-hover:text-[#0f172a] transition-all duration-300"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={project.link}
                    className="text-[#06b6d4] hover:text-[#0891b2] flex items-center gap-2 group/link"
                  >
                    View Project{" "}
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Unique: Liquid morphing progress with 3D bars */}
      <section id="skills" className="min-h-screen py-20 bg-[#0f172a] reveal">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-[#06b6d4] mb-4">Skills</h2>
            <p className="text-xl text-[#cbd5e1]">Technologies I work with</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                category: "Frontend Development",
                skills: [
                  { name: "React/Next.js", level: 95 },
                  { name: "TypeScript", level: 90 },
                  { name: "Tailwind CSS", level: 95 },
                  { name: "HTML/CSS", level: 98 },
                ],
              },
              {
                category: "Backend Development",
                skills: [
                  { name: "Node.js", level: 85 },
                  { name: "Python", level: 80 },
                  { name: "REST APIs", level: 90 },
                  { name: "GraphQL", level: 75 },
                ],
              },
              {
                category: "Database",
                skills: [
                  { name: "PostgreSQL", level: 85 },
                  { name: "MongoDB", level: 80 },
                  { name: "Redis", level: 75 },
                  { name: "Supabase", level: 90 },
                ],
              },
              {
                category: "DevOps & Tools",
                skills: [
                  { name: "Git/GitHub", level: 95 },
                  { name: "Docker", level: 75 },
                  { name: "Vercel/AWS", level: 85 },
                  { name: "CI/CD", level: 80 },
                ],
              },
              {
                category: "Design",
                skills: [
                  { name: "Figma", level: 85 },
                  { name: "UI/UX Design", level: 80 },
                  { name: "Responsive Design", level: 95 },
                  { name: "Animations", level: 85 },
                ],
              },
              {
                category: "Other",
                skills: [
                  { name: "Testing (Jest/Vitest)", level: 80 },
                  { name: "Agile/Scrum", level: 85 },
                  { name: "Problem Solving", level: 95 },
                  { name: "Team Collaboration", level: 90 },
                ],
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="bg-[#1e293b] border border-[#334155] p-6 skill-card-3d hover:border-[#06b6d4] transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#06b6d4] to-[#0891b2] rounded-full skill-indicator" />
                  <h3 className="text-2xl font-bold text-[#06b6d4]">{category.category}</h3>
                </div>
                <div className="space-y-6">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={skill.name}
                      className="skill-item"
                      style={{ animationDelay: `${index * 0.1 + idx * 0.05}s` }}
                    >
                      <div className="flex justify-between mb-3">
                        <span className="text-[#e2e8f0] font-medium">{skill.name}</span>
                        <span className="text-[#06b6d4] font-bold skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="relative w-full h-3 bg-[#334155]/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#334155]/30 to-transparent" />
                        <div
                          className="h-full bg-gradient-to-r from-[#06b6d4] via-[#0891b2] to-[#06b6d4] rounded-full skill-progress-liquid relative overflow-hidden"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${index * 0.1 + idx * 0.05}s`,
                          }}
                        >
                          <div className="absolute inset-0 skill-shimmer" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Unique: Hexagon cards with parallax */}
      <section id="services" className="min-h-screen py-20 bg-[#0f172a] reveal">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-[#06b6d4] mb-4">Services</h2>
            <p className="text-xl text-[#cbd5e1]">What I can do for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💻",
                title: "Web Development",
                description:
                  "Building responsive, high-performance websites and web applications using modern frameworks and best practices.",
                features: ["React/Next.js Development", "API Integration", "Performance Optimization", "SEO Friendly"],
              },
              {
                icon: "🎨",
                title: "UI/UX Design",
                description:
                  "Creating beautiful, intuitive user interfaces with a focus on user experience and accessibility.",
                features: ["Responsive Design", "Wireframing & Prototyping", "Design Systems", "User Research"],
              },
              {
                icon: "📱",
                title: "Mobile Development",
                description:
                  "Developing cross-platform mobile applications that work seamlessly on iOS and Android devices.",
                features: ["React Native", "Progressive Web Apps", "App Store Deployment", "Mobile-First Approach"],
              },
              {
                icon: "🚀",
                title: "Full Stack Development",
                description: "End-to-end application development from database design to frontend implementation.",
                features: ["Database Design", "RESTful APIs", "Authentication", "Cloud Deployment"],
              },
              {
                icon: "🔧",
                title: "Maintenance & Support",
                description:
                  "Ongoing support and maintenance to keep your applications running smoothly and up-to-date.",
                features: ["Bug Fixes", "Feature Updates", "Performance Monitoring", "Security Updates"],
              },
              {
                icon: "💡",
                title: "Consulting",
                description:
                  "Technical consulting to help guide your project in the right direction with expert advice.",
                features: ["Technology Selection", "Architecture Planning", "Code Review", "Best Practices"],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="bg-[#1e293b] border border-[#334155] p-8 hover:border-[#06b6d4] transition-all duration-500 group service-zoom"
              >
                <div className="text-5xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#e2e8f0] mb-4">{service.title}</h3>
                <p className="text-[#94a3b8] mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-[#cbd5e1] flex items-start gap-2">
                      <span className="text-[#06b6d4] mt-1 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Unique: Holographic cards with depth effect */}
      <section id="experience" className="min-h-screen py-20 bg-[#0f172a] reveal">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-[#06b6d4] mb-4">Experience</h2>
            <p className="text-xl text-[#cbd5e1]">My professional journey</p>
          </div>
          <div className="space-y-12 max-w-4xl mx-auto relative">
            {/* Vertical timeline line with gradient */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#06b6d4] to-transparent timeline-glow" />

            {[
              {
                company: "Independent / Freelance",
                role: "Full Stack Developer",
                period: "2024 - Present",
                description:
                  "Independent full stack developer specializing in building modern, scalable web applications. I design and develop complete solutions including frontend, backend, databases, and deployment, with a strong focus on clean code and real-world usability.",
                achievements: [
                  "Built multiple full-stack web applications from scratch",
                  "Designed responsive front-end interfaces using modern UI/UX principles",
                  "Worked with React, Next.js, Node.js, PostgreSQL, Firebase, and modern tools",
                  "Handled complete project lifecycle from idea to deployment",
                ],
              },
              // {
              //   company: "Digital Solutions Ltd.",
              //   role: "Frontend Developer",
              //   period: "2020 - 2022",
              //   description:
              //     "Developed responsive web applications and collaborated with designers to create engaging user experiences.",
              //   achievements: [
              //     "Built 15+ client websites",
              //     "Reduced load times by 50%",
              //     "Introduced component library",
              //   ],
              // },
              // {
              //   company: "StartUp Studio",
              //   role: "Junior Developer",
              //   period: "2018 - 2020",
              //   description:
              //     "Started career building features for various client projects and learning modern web development technologies.",
              //   achievements: ["Completed 20+ projects", "Learned React and Node.js", "Contributed to open source"],
              // },
            ].map((job, index) => (
              <div key={index} className="relative pl-0 md:pl-20" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Timeline dot with pulse */}
                <div className="absolute left-0 md:left-[26px] top-8 w-4 h-4 bg-[#06b6d4] rounded-full timeline-dot">
                  <div className="absolute inset-0 bg-[#06b6d4] rounded-full animate-ping opacity-75" />
                </div>

                <Card
                  className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-[#334155] hover:border-[#06b6d4] p-8 experience-card-holographic group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Holographic overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/0 via-[#06b6d4]/5 to-[#06b6d4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-lg" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#06b6d4]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#e2e8f0] mb-2 group-hover:text-[#06b6d4] transition-colors duration-300">
                          {job.role}
                        </h3>
                        <p className="text-[#06b6d4] font-semibold text-lg flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#06b6d4] rounded-full inline-block" />
                          {job.company}
                        </p>
                      </div>
                      <Badge className="bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/50 w-fit backdrop-blur-sm group-hover:bg-[#06b6d4] group-hover:text-[#0f172a] transition-all duration-300">
                        {job.period}
                      </Badge>
                    </div>
                    <p className="text-[#cbd5e1] mb-6 leading-relaxed">{job.description}</p>
                    <div className="space-y-3">
                      {job.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="text-[#94a3b8] flex items-start gap-3 achievement-item group-hover:text-[#cbd5e1] transition-colors duration-300"
                          style={{ animationDelay: `${index * 0.2 + i * 0.1}s` }}
                        >
                          <span className="text-[#06b6d4] mt-1 text-lg">▸</span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Unique: Carousel-style cards */}
      <section id="testimonials" className="min-h-screen py-20 bg-[#0f172a] reveal">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-[#06b6d4] mb-4">Testimonials</h2>
            <p className="text-xl text-[#cbd5e1]">What clients say about me</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, Tech Corp",
                content:
                  "Outstanding work! The website exceeded our expectations. Professional, responsive, and delivered on time.",
                rating: 5,
                image: "/professional-woman-diverse.png",
              },
              {
                name: "Michael Chen",
                role: "Product Manager, StartUp Inc",
                content:
                  "Incredible attention to detail and great communication throughout the project. Highly recommend!",
                rating: 5,
                image: "/professional-man.jpg",
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Director, Digital Co",
                content:
                  "Transformed our online presence completely. The new site is fast, beautiful, and converts visitors effectively.",
                rating: 5,
                image: "/professional-woman-2.png",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-[#1e293b] border border-[#334155] p-6 testimonial-tilt">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#06b6d4]">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#e2e8f0] font-bold">{testimonial.name}</h4>
                    <p className="text-[#94a3b8] text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#06b6d4] text-[#06b6d4]" />
                  ))}
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">{testimonial.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Unique: Split layout with form and contact cards */}
      <section id="contact" className="min-h-screen py-20 bg-[#0f172a] reveal">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-[#06b6d4] mb-4 ml-10">Let's Connect</h2>
            <p className="text-xl text-[#cbd5e1] ml-10">Have a project in mind? Let's talk</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="bg-[#1e293b] border border-[#334155] p-8 contact-form">
              <form className="space-y-6" onSubmit={handleSubmit} >
                <div>
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#0f172a]/50 border-[#334155] text-[#e2e8f0] placeholder:text-[#64748b] focus:border-[#06b6d4] focus:ring-[#06b6d4]/20 transition-all"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0f172a]/50 border-[#334155] text-[#e2e8f0] placeholder:text-[#64748b] focus:border-[#06b6d4] focus:ring-[#06b6d4]/20 transition-all"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-[#0f172a]/50 border-[#334155] text-[#e2e8f0] placeholder:text-[#64748b] focus:border-[#06b6d4] focus:ring-[#06b6d4]/20 transition-all resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#06b6d4] text-[#0f172a] hover:bg-[#0891b2] hover:scale-105 transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#06b6d4] mb-6">Get in Touch</h3>
              <Card className="bg-[#1e293b] border border-[#334155] p-6 hover:border-[#06b6d4] transition-all duration-300 group contact-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-[#06b6d4]" />
                  </div>
                  <div>
                    <h4 className="text-[#e2e8f0] font-bold mb-1">Email</h4>
                    <p className="text-[#94a3b8]">bilalarshad2753@gmail.com</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1e293b] border border-[#334155] p-6 hover:border-[#06b6d4] transition-all duration-300 group contact-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6 text-[#06b6d4]" />
                  </div>
                  <div>
                    <h4 className="text-[#e2e8f0] font-bold mb-1">LinkedIn</h4>
                    <p className="text-[#94a3b8]">Connect with me</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1e293b] border border-[#334155] p-6 hover:border-[#06b6d4] transition-all duration-300 group contact-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github className="w-6 h-6 text-[#06b6d4]" />
                  </div>
                  <div>
                    <h4 className="text-[#e2e8f0] font-bold mb-1">GitHub</h4>
                    <p className="text-[#94a3b8]">View my projects</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1e293b] border border-[#334155] p-6 hover:border-[#06b6d4] transition-all duration-300 group contact-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Twitter className="w-6 h-6 text-[#06b6d4]" />
                  </div>
                  <div>
                    <h4 className="text-[#e2e8f0] font-bold mb-1">Twitter</h4>
                    <p className="text-[#94a3b8]">Follow me</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
