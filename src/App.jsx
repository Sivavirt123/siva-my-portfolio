import { useEffect, useRef, useState } from "react";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["education", "Education"],
  ["achievements", "Achievements"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

const achievements = [
  {
    id: "academic",
    image: "/assets/topper.jpeg",
    alt: "Academic Achievement",
    title: "Received Academic Topper Award",
    popupTitle: "Academic Topper Award",
    popupText:
      "Received Academic Topper Award for outstanding performance in academic studies, demonstrating excellence in coursework and maintaining high grades throughout the program.",
  },
  {
    id: "leadership",
    image: "/assets/secretary.JPG",
    alt: "Leadership Role",
    title: "Served as Joint Secretary for Department Function",
    popupTitle: "Joint Secretary - Department Function",
    popupText:
      "Served as Joint Secretary for Department Function, coordinating events and managing responsibilities. Led team initiatives and contributed to successful event organization and student engagement.",
  },
  {
    id: "elevate",
    image: "/assets/elevatelabs.jpeg",
    alt: "Elevate Labs Internship",
    title: "Successfully Completed My Internship at Elevate Labs.",
    popupTitle: "Elevate Labs Internship",
    popupText:
      "Successfully completed Web Development Internship at Elevate Labs from May 26, 2025 to June 28, 2025. Gained hands-on experience with real-world projects and demonstrated exceptional skills and dedication.",
  },
  {
    id: "dovoo",
    image: "/assets/dovoo.jpeg",
    alt: "DoVoo UI/UX Internship",
    title: "Successfully completed my 1-month UI/UX internship at Do Voo.",
    popupTitle: "DoVoo UI/UX Internship",
    popupText:
      "Successfully completed 1-month UI/UX Design Internship at DoVoo from June 1 to June 30, 2025. Developed skills in user interface design, user experience principles, and design thinking methodologies.",
  },
];

const projects = [
  {
    title: "Career Ai",
    image: "/assets/aicarrer.png",
    alt: "aicarrer",
    description:
      "AI Career is a responsive career guidance web application built with React.js, designed to help users explore career opportunities, understand job-related information, and make informed career decisions through an AI-focused interface.",
    link: "https://sivavirt123.github.io/careera-ai-project/",
  },
  {
    title: "Basic Calculator",
    image: "/assets/calculator.png",
    alt: "Basic Calculator",
    description:
      "I created a simple calculator using HTML, CSS, and JavaScript. HTML was used to design the structure, CSS was applied to style the calculator, and JavaScript handles the logic, such as performing basic arithmetic operations.",
    link: "https://sivavirt123.github.io/calculator/",
  },
  {
    title: "Timer",
    image: "/assets/timer.png",
    alt: "Timer",
    description:
      "I built a digital timer using HTML, CSS, and JavaScript. HTML provided the structure (Start, Pause, Reset). CSS was used to style the interface, making it simple and user-friendly. JavaScript controlled the timer functionality, handling countdowns.",
    link: "https://sivavirt123.github.io/digitalclock/",
  },
  {
    title: "To-D0-List",
    image: "/assets/to-do-list.png",
    alt: "To-do-list",
    description:
      "I developed a To-Do List application using HTML, CSS, and JavaScript. HTML provided the structure. JavaScript powered the core features such as adding new tasks, marking tasks as completed, and deleting tasks from the list.",
    link: "https://sivavirt123.github.io/to-do-list/",
  },
];

const skills = [
  {
    icon: "fab fa-react",
    title: "React Js",
    description:
      "Building responsive and interactive web applications using reusable components and modern JavaScript.",
  },
  {
    icon: "fab fa-js-square",
    title: "JavaScript",
    description:
      "Interactive web functionality and dynamic user experiences with modern ES6+ features.",
  },
  {
    icon: "fab fa-html5",
    title: "HTML5",
    description:
      "Semantic markup and modern web standards for building structured web content.",
  },
  {
    icon: "fab fa-css3-alt",
    title: "CSS3",
    description:
      "Advanced styling, animations, and responsive design techniques for beautiful interfaces.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [sending, setSending] = useState(false);

  const animateRef = useRef([]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const onScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".timeline-item, .project-card, .skill-item",
    );

    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "all 0.6s ease";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    animateRef.current = Array.from(elements);

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMenuOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        alert("Message sent successfully!");
      } else {
        alert("Unable to send the message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>
              Siva<span> Portfolio</span>
            </h2>
          </div>

          <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
            {navItems.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
                onClick={(event) => handleNavClick(event, id)}
              >
                {label}
              </a>
            ))}
          </div>

          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <main>
        <section id="home" className="home">
          <div className="home-container">
            <div className="home-content">
              <div className="home-text">
                <h3>Hi, I'm</h3>
                <h1>Siva Subramaniyan</h1>
                <h2>Growing Front End Developer</h2>
                <p>
                  Passionate about creating stunning web experiences and
                  eye-catching designs. Specialized in modern web technologies
                  and creative problem-solving.
                </p>

                <div className="home-buttons">
                  <a
                    href="#contact"
                    className="btn btn-primary"
                    onClick={(event) => handleNavClick(event, "contact")}
                  >
                    Get In Touch
                  </a>
                  <a
                    href="#projects"
                    className="btn btn-secondary"
                    onClick={(event) => handleNavClick(event, "projects")}
                  >
                    View Projects
                  </a>
                </div>
              </div>

              <div className="home-image">
                <div className="image-container">
                  <img
                    src="/assets/myimage.jpeg"
                    alt="Siva Subramaniyan"
                    className="profile-img"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-arrow" />
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <SectionHeader
              title="About Me"
              subtitle="Get to know more about me"
            />

            <div className="about-content">
              <div className="about-info">
                <div className="info-grid">
                  <InfoItem
                    icon="fas fa-user"
                    title="Name"
                    value="Siva Subramaniyan S"
                  />
                  <InfoItem
                    icon="fas fa-phone"
                    title="Phone"
                    value="+91 9344241367"
                  />
                  <InfoItem
                    icon="fas fa-envelope"
                    title="Email"
                    value="rakeshsiva0309@gmail.com"
                  />
                  <InfoItem
                    icon="fas fa-map-marker-alt"
                    title="Location"
                    value="Tiruchirapalli, Tamil Nadu"
                  />
                </div>

                <div className="resume-download">
                  <a
                    href="/assets/myresumefedr.pdf"
                    className="btn btn-primary download-btn"
                    download="myresumefedr.pdf"
                  >
                    <i className="fas fa-download" /> Download Resume
                  </a>
                </div>
              </div>

              <div className="about-text">
                <h3>Professional Overview</h3>
                <p>
                  I am a passionate Front End Developer and M.Sc. IT graduate
                  with a strong interest in building modern, responsive, and
                  user-friendly websites. I have hands-on experience with HTML,
                  CSS, JavaScript, React.js, and Bootstrap, along with a good
                  understanding of web development fundamentals.
                </p>
                <p>
                  I enjoy creating clean and interactive web interfaces and
                  continuously improving my skills by working on practical
                  projects. With a combination of technical knowledge and a
                  strong interest in design, I am looking for opportunities to
                  begin my career as a Web Developer or Front-End Developer and
                  contribute to real-world projects while growing
                  professionally.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="education">
          <div className="container">
            <SectionHeader title="Education" subtitle="My academic journey" />

            <div className="education-timeline">
              <TimelineItem
                title="Master of Science in Information Technology"
                college="Bishop Heber College, Trichy"
                date="2024 - 2026"
                grade="Grade: 83.8%"
              />
              <TimelineItem
                title="Bachelor of Vocational Information Technology"
                college="Bishop Heber College, Trichy"
                date="2021 - 2024"
                grade="Grade: 77.9% (up to 6 Semesters)"
              />
            </div>
          </div>
        </section>

        <section id="achievements" className="achievements">
          <div className="container">
            <SectionHeader
              title="Achievements & Internships"
              subtitle="My accomplishments and professional experience"
            />

            <div className="achievements-grid">
              {achievements.map((item) => (
                <button
                  className="achievement-item"
                  key={item.id}
                  onClick={() => setSelectedAchievement(item)}
                  aria-label={`Open ${item.popupTitle}`}
                >
                  <div className="achievement-image">
                    <img src={item.image} alt={item.alt} />
                  </div>
                  <div className="achievement-overlay">
                    <h3>{item.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects">
          <div className="container">
            <SectionHeader
              title="My Projects"
              subtitle="Some of my recent work"
            />

            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-image">
                    <img src={project.image} alt={project.alt} />
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a
                      href={project.link}
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project <i className="fas fa-external-link-alt" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills">
          <div className="container">
            <SectionHeader
              title="Technical Skills"
              subtitle="Technologies I work with"
            />

            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="skill-item" key={skill.title}>
                  <div className="skill-icon">
                    <i className={skill.icon} />
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <SectionHeader title="Contact Me" />

            <div className="contact-content">
              <div className="contact-info">
                <div className="social-links">
                  <a
                    href="https://www.linkedin.com/in/siva-subramaniyan-825332277"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                  >
                    <i className="fab fa-linkedin" /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/Sivavirt123"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                  >
                    <i className="fab fa-github" /> GitHub
                  </a>
                </div>
              </div>

              <div className="contact-form-container">
                <form
                  className="contact-form"
                  action="https://formspree.io/f/mwpnpzel"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Your Message"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Siva Subramaniyan. All rights reserved.</p>
        </div>
      </footer>

      {selectedAchievement && (
        <div
          className="popup-overlay active"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget)
              setSelectedAchievement(null);
          }}
        >
          <div className="popup-content">
            <button
              className="popup-close"
              aria-label="Close popup"
              onClick={() => setSelectedAchievement(null)}
            >
              &times;
            </button>
            <div>
              <h2>{selectedAchievement.popupTitle}</h2>
              <p>{selectedAchievement.popupText}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function InfoItem({ icon, title, value }) {
  return (
    <div className="info-item">
      <i className={icon} />
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

function TimelineItem({ title, college, date, grade }) {
  return (
    <div className="timeline-item">
      <div className="timeline-icon">
        <i className="fas fa-graduation-cap" />
      </div>
      <div className="timeline-content">
        <h3>{title}</h3>
        <h4>{college}</h4>
        <span className="timeline-date">{date}</span>
        <p>{grade}</p>
      </div>
    </div>
  );
}

export default App;
