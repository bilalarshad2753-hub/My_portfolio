"use client"
import { useState, useEffect } from "react"

export function Header() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "projects", "skills", "services", "experience", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Projects", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Services", href: "services" },
    { name: "Experience", href: "experience" },
    { name: "Testimonials", href: "testimonials" },
    { name: "Contact", href: "contact" },
  ]

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0f172a]/95 backdrop-blur-lg shadow-lg shadow-[#06b6d4]/10" : "bg-[#0f172a]/80 backdrop-blur-sm"
      } border-b border-[#1e293b]`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
        <button
          onClick={() => handleNavClick("home")}
          className="text-2xl font-bold text-[#06b6d4] cursor-pointer hover:scale-110 transition-all duration-300 gradient-text relative group"
        >
          Bilal
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#06b6d4] group-hover:w-full transition-all duration-300"></span>
        </button>
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`text-base transition-all duration-300 cursor-pointer relative group ${
                activeSection === item.href
                  ? "text-[#06b6d4] font-semibold"
                  : "text-[#94a3b8] hover:text-[#06b6d4] hover:scale-110"
              }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] transform origin-left transition-all duration-300 ${
                  activeSection === item.href ? "w-full scale-x-100" : "w-0 group-hover:w-full group-hover:scale-x-100"
                }`}
              ></span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
