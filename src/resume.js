import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import './resume.css';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  // Removed FaSun, FaMoon as they are no longer used in the button
} from "react-icons/fa";

export default function Resume() {
  const resumeRef = useRef();
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to apply/remove dark mode class to the body and detect system preference
  useEffect(() => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

  // Set once at mount
  setIsDarkMode(prefersDarkMode.matches);

  const handler = (event) => setIsDarkMode(event.matches);
  prefersDarkMode.addEventListener('change', handler);

  return () => prefersDarkMode.removeEventListener('change', handler);
}, []); // ✅ Removed `isDarkMode` from deps


  const generatePDF = () => {
    const element = resumeRef.current;

    const options = {
      margin:       0.3,
      filename:     'Dembe_Kwinda_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };

 

  return (
    <div>
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <button
          onClick={generatePDF}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          aria-label="Download Resume as PDF"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5-.4h4v-5a.5.5 0 0 1 1 0v5h4a.5.5 0 0 1 .4.8l-5 5a.5.5 0 0 1-.8 0l-5-5zM.5 15a.5.5 0 0 1 0-1h15a.5.5 0 0 1 0 1H.5z" />
          </svg>
          Download PDF
        </button>
      </div>

      <div
        ref={resumeRef}
        className={`container resume ${isDarkMode ? 'dark-mode' : ''}`}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <h1>Dembe Kwinda</h1>
            <p className="subtitle">Curriculum Vitae</p>
          </div>
          <img
            src="/images/projects/dembe.jpg"
            alt="Dembe Kwinda"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 0 8px rgba(0,0,0,0.15)",
              border: "3px solid #0077cc"
            }}
            loading="lazy"
          />
        </header>

        <section className="contact-info" style={{ marginBottom: "20px" }}>
          <h2>Contact Information</h2>
          <ul>
            <li>
              <FaEnvelope aria-hidden="true" /> <strong>Email:</strong>{" "}
              <a href="mailto:dembekwinda03@gmail.com">dembekwinda03@gmail.com</a> /{" "}
              <a href="mailto:deekwinda@icloud.com">deekwinda@icloud.com</a>
            </li>
            <li>
              <FaPhone aria-hidden="true" /> <strong>Phone:</strong>{" "}
              <a href="tel:+27795205467">+27 79 520 5467</a> /{" "}
              <a href="tel:+27694543677">+27 69 454 3677</a>
            </li>
            <li><FaMapMarkerAlt aria-hidden="true" /> <strong>Location:</strong> Clayville, Olifantsfontein, South Africa</li>
            <li><FaLinkedin aria-hidden="true" /> <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/dembe-kwinda-4461b4237" target="_blank" rel="noopener noreferrer">linkedin.com/in/dembe-kwinda-4461b4237</a></li>
            <li><FaGithub aria-hidden="true" /> <strong>GitHub:</strong> <a href="https://github.com/ScarySuffer" target="_blank" rel="noopener noreferrer">github.com/ScarySuffer</a></li>
            <li><FaGlobe aria-hidden="true" /> <strong>Portfolio:</strong> <a href="https://dembe-kwinda-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">dembe-kwinda-portfolio.netlify.app</a></li>
          </ul>
        </section>

        <section>
          <h2>Profile</h2>
          <p>
            I am a passionate and results-driven full-stack developer skilled in software development languages such as HTML, CSS, Tailwind, JavaScript, and frameworks like Flutter and React. A self-taught professional with a strong eagerness to learn, I consistently deliver quality solutions, as demonstrated by my projects. I also have experience tutoring programming languages including C#, C, MATLAB, and Java, assisting students across various disciplines. Additionally, I served as a Mentor Buddy, providing guidance on programming concepts. I have a keen interest in data science, data engineering, and analytics, and aspire to contribute to innovative technologies that transform industries.
          </p>
        </section>

        <section>
          <h2>Personal Information</h2>
          <ul>
            <li><strong>ID:</strong> 0301025362080</li>
            <li><strong>Postal Address:</strong><br />9723 Sante Street<br />Clayville<br />Olifantsfontein, Midrand,1666</li>
            <li><strong>Residential Address:</strong><br />Ha-Tshifura 438<br />Limpopo</li>
          </ul>
        </section>

        <section>
          <h2>Professional Skills</h2>

          <h3>Programming & Software Development</h3>
          <ul>
            <li>C#, C, MATLAB, Java</li>
            <li>Arduino programming & embedded systems</li>
            <li>HTML, CSS, JavaScript</li>
            <li>Flutter (Cupertino & Material design, state management, animations)</li>
            <li>RESTful API development (Node.js, Express, MongoDB)</li>
            <li>Android Studio (Java/Kotlin)</li>
            <li>Firebase integration (Auth, Firestore)</li>
            <li>Email handling via SMTP (e.g., cookie orders via app)</li>
            <li>OpenStreetMap integration using flutter map</li>
            <li>Version Control: Git & GitHub</li>
          </ul>

          <h3>Computer-Aided Design (CAD)</h3>
          <ul>
            <li>Autodesk Inventor</li>
            <li>SolidWorks</li>
            <li>Fusion 360</li>
            <li>3D modelling for mechanical parts and assemblies</li>
            <li>Technical drawing interpretation</li>
          </ul>

          <h3>Automation</h3>
          <ul>
            <li>Circuit design & analysis (DC/AC, resonance, power systems)</li>
            <li>Sensor integration and basic robotics using Arduino</li>
            <li>Hands-on project work (engine hoist, bench vice, etc.)</li>
            <li>Lighting simulation using Relux</li>
            <li>Mechatronics prototyping</li>
          </ul>

          <h3>Data & Productivity Tools</h3>
          <ul>
            <li>Microsoft Excel (data logging, formulas, charts)</li>
            <li>Microsoft Word, PowerPoint</li>
            <li>Google Suite (Docs, Sheets, Drive, Classroom)</li>
            <li>Canva (flyers, marketing content)</li>
          </ul>
        </section>

        <section>
          <h2>Soft Skills</h2>
          <ul>
            <li>Communication & presentation skills</li>
            <li>Problem-solving & critical thinking</li>
            <li>Telephone etiquette</li>
            <li>Team collaboration & peer mentoring</li>
            <li>Academic leadership (student mentoring & tutoring)</li>
            <li>Business communication & client engagement</li>
          </ul>
        </section>

        <section>
          <h2>Languages</h2>
          <ul>
            <li>English</li>
            <li>IsiZulu</li>
            <li>IsiXhosa</li>
            <li>Xitsonga</li>
            <li>Northern Sotho</li>
            <li>Tshivenda</li>
          </ul>
        </section>

        <section>
          <h2>Employment History</h2>

          <h3>Mbula’s Academy – Maths and Physical Sciences Tutor</h3>
          <p><em>January 2022 – March 2023</em></p>
          <ul>
            <li>Tutoring and assisting students</li>
            <li>Conducting weekly tutorials</li>
            <li>Assessing students and returning feedback</li>
            <li>Maintaining Excel records</li>
            <li>Helping with university applications</li>
          </ul>
          <p><strong>Location:</strong> Makwarela Old – Christ The King Primary School</p>

          <h3>AOS Consulting Engineers – In-Service Training</h3>
          <p><em>April 2024 – May 2024</em></p>
          <ul>
            <li>Quality and snag list reports</li>
            <li>Meeting agendas and minutes</li>
            <li>Relux lighting simulation</li>
            <li>3D CAD modeling</li>
            <li>Electrical drawing verification</li>
            <li>Breaker panel capacity review</li>
          </ul>
          <p><strong>Location:</strong> 13 Challenger Ave, Midridge Park, Midrand, 1685</p>

          <h3>Nelson Mandela University – Mentor Buddy</h3>
          <p><em>October 2024 – January 2025</em></p>
          <ul>
            <li>Google Drive module organization</li>
            <li>Short instructional videos</li>
            <li>Study strategy sharing</li>
            <li>Peer engagement and motivation</li>
          </ul>
          <p><strong>Location:</strong> University Way, Summerstrand, Gqeberha</p>
        </section>

        <section>
          <h2>Education</h2>

          <h3>Matric – Mbilwi Secondary School, 2020</h3>
          <ul>
            <li>English, Mathematics, Physical Sciences</li>
            <li>Life Orientation, Life Sciences, Tshivenda, Geography</li>
          </ul>

          <h3>LLB Law – University of Johannesburg</h3>
          <p>Feb 2021 – Dec 2021</p>

          <h3>B Eng Mechatronics – Nelson Mandela University</h3>
          <p>Feb 2022 – Dec 2024</p>
          <ul>
            <li>Computer Science for Engineers 1A</li>
            <li>Computer Science for Engineers 1B</li>
            <li>Mechanics and Thermodynamics</li>
            <li>Computing Fundamentals for Engineering</li>
            <li>Material Sciences 1</li>
            <li>Mathematics 1A</li>
            <li>Mathematics 1B</li>
            <li>Engineering Drawing 1</li>
            <li>Workshop Practice 1</li>
        </ul>
        </section>

        <section>
          <h2>Extracurricular Activities</h2>
          <ul>
            <li>Web and app development</li>
            <li>Photography</li>
            <li>Soccer</li>
          </ul>
        </section>

        <section>
          <h2>References</h2>
          <ul>
            <li>Nelson Mandela University: +27 41 504 1111</li>
            <li>Mr Muntswu: +27 71 162 4028</li>
            <li>Mr Cornelis Leenders: +27 82 929 8282</li>
            <li>Ms Ronelle Plaatjes: +27 82 499 5969</li>
            <li>Pastor Mulovhedzi: +27 82 731 1142</li>
          </ul>
        </section>
      </div>
    </div>
  );
}