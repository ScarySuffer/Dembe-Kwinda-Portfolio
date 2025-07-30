import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

// Import Recharts components
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';

import './resume.css';
import { allProjects } from './Projects'; // <<< IMPORTANT: Importing allProjects from the separate file

// ===========================================================================
// CHART DATA GENERATION FUNCTIONS (Derived from allProjects)
// ===========================================================================

// --- Skill Proficiency (Bar Chart) ---
// Counts occurrences of key technologies across all projects
const generateSkillProficiencyData = (projects) => {
  const techCounts = {};
  projects.forEach(project => {
    project.tech.split('·').forEach(techItem => {
      const cleanedTech = techItem.trim();
      techCounts[cleanedTech] = (techCounts[cleanedTech] || 0) + 1;
    });
  });

  // Select top N skills or specific skills you want to highlight
  const selectedSkills = [
    'React', 'Node.js', 'Flutter', 'Python', 'C#', 'SQL', 'Firebase', 'MongoDB', 'Arduino', 'Recharts', 'WebSocket', 'Express'
  ];
  
  return selectedSkills.map(skill => ({
    name: skill,
    // Assign a 'level' based on frequency or a dummy value if not present
    // This is still a simplified representation, true proficiency is subjective
    level: techCounts[skill] ? Math.min(100, 50 + techCounts[skill] * 10) : 30 // Base 30, +10 for each project
  })).sort((a,b) => b.level - a.level); // Sort by level descending
};

const skillProficiencyData = generateSkillProficiencyData(allProjects);

// --- Project Category Distribution (Pie Chart) ---
const generateProjectCategoryData = (projects) => {
  const categoryCounts = {};
  projects.forEach(project => {
    const category = project.category || 'Other'; // Default to 'Other' if category is missing
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return Object.keys(categoryCounts).map(category => ({
    name: category,
    value: categoryCounts[category]
  }));
};

const projectCategoryData = generateProjectCategoryData(allProjects);

// --- Learning Progress (Line Chart) ---
// This data is conceptual and hard to derive directly from static project list.
// Keeping it as dummy data to illustrate learning over time.
const learningProgressData = [
  { name: 'Q1', DataScience: 40, Engineering: 60 },
  { name: 'Q2', DataScience: 60, Engineering: 70 },
  { name: 'Q3', DataScience: 70, Engineering: 80 },
  { name: 'Q4', DataScience: 85, Engineering: 90 },
];

// --- Data Science Focus (Pie Chart 2) ---
// Focuses on technologies specifically relevant to data science projects
const generateDataScienceFocusData = (projects) => {
  const dsTechCounts = {};
  const dataScienceProjects = projects.filter(p => p.category && p.category.includes('Data Science'));

  dataScienceProjects.forEach(project => {
    project.tech.split('·').forEach(techItem => {
      const cleanedTech = techItem.trim();
      // Only count specific data science related tech for this chart
      if (['Python', 'Recharts', 'Chart.js', 'SQLite', 'Node.js', 'API Data Handling', 'ETL', 'Data Visualization'].includes(cleanedTech)) {
         dsTechCounts[cleanedTech] = (dsTechCounts[cleanedTech] || 0) + 1;
      }
    });
  });

  return Object.keys(dsTechCounts).map(tech => ({
    name: tech,
    value: dsTechCounts[tech]
  }));
};

const dataScienceFocusData = generateDataScienceFocusData(allProjects);


const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B']; // More colors for more slices

// ===========================================================================
// CUSTOM RECHARTS COMPONENTS FOR STYLING CONTROL
// ===========================================================================

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="chart-tooltip-item" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Legend component
const CustomLegend = ({ payload, isDarkMode }) => {
  return (
    <ul className="chart-legend">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="chart-legend-item">
          <span className="chart-legend-color-box" style={{ backgroundColor: entry.color }}></span>
          <span className="chart-legend-item-text">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};


export default function Resume() {
  const resumeRef = useRef();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartsReady, setChartsReady] = useState(false); // New state for conditional rendering

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(prefersDarkMode.matches);
    const handler = (event) => setIsDarkMode(event.matches);
    prefersDarkMode.addEventListener('change', handler);

    // Set chartsReady to true after a small delay to ensure DOM is ready
    // and isDarkMode is initialized. requestAnimationFrame is often better
    // than setTimeout(0) for DOM-related rendering.
    requestAnimationFrame(() => {
      setChartsReady(true);
    });

    return () => prefersDarkMode.removeEventListener('change', handler);
  }, []);

  const generatePDF = () => {
    const element = resumeRef.current;
    const options = {
      margin: 0.3,
      filename: 'Dembe_Kwinda_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className={`resume-page-wrapper ${isDarkMode ? 'dark-mode' : ''}`}> {/* Moved dark-mode class here */}
      {/* Download PDF Button - positioned outside the main grid for better control */}
      <div className="pdf-button-container">
        <button
          onClick={generatePDF}
          className="download-pdf-button"
          aria-label="Download Resume as PDF"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5-.4h4v-5a.5.5 0 0 1 1 0v5h4a.5.5 0 0 1 .4.8l-5 5a.5.5 0 0 1-.8 0l-5-5zM.5 15a.5.5 0 0 1 0-1h15a.5.5 0 0 1 0 1H.5z" />
          </svg>
          Download PDF
        </button>
      </div>

      {/* Main Resume Content and Sidebars */}
      <div className="resume-grid-container">
        {/* Left Sidebar for Charts */}
        <div className="resume-sidebar left-sidebar">
          <h3>Skill Proficiency (from Projects)</h3>
          {chartsReady ? ( // Conditionally render charts
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={skillProficiencyData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#555' : '#ccc'} />
                <XAxis type="number" stroke={isDarkMode ? '#f2f2f2' : '#222'} />
                <YAxis type="category" dataKey="name" stroke={isDarkMode ? '#f2f2f2' : '#222'} />
                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                <Bar dataKey="level" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-placeholder">Loading Skill Proficiency Chart...</div>
          )}

          <h3>Project Categories</h3>
          {chartsReady ? ( // Conditionally render charts
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={projectCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {projectCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                <Legend content={<CustomLegend isDarkMode={isDarkMode} />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-placeholder">Loading Project Categories Chart...</div>
          )}
        </div>

        {/* Main Resume Content */}
        <div
          ref={resumeRef}
          className={`container resume`} // Removed dark-mode class from here
        >
          <header>
            <div>
              <h1>Dembe Kwinda</h1>
              <p className="subtitle">Curriculum Vitae</p>
            </div>
            <img
              src="/images/projects/dembe.jpg"
              alt="Portrait of Dembe Kwinda" // Updated alt text
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                border: "3px solid #0077cc"
              }}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </header>

          <section>
            <h2>Profile</h2>
            <p>
              I am a passionate and results-driven individual with strong experience in engineering, programming, and automation...
              I aspire to contribute to innovative tech that transforms industries.
            </p>
          </section>

          <section>
            <h2>Personal Information</h2>
            <ul>
              <li><strong>ID:</strong> 0301025362080</li>
              <li>
                <strong>Postal Address:</strong><br />
                9723 Sante Street<br />
                Clayville<br />
                Olifantsfontein, 1666
              </li>
              <li>
                <strong>Residential Address:</strong><br />
                Ha-Tshifura 438<br />
                Limpopo
              </li>
              <li>
                <strong>Email Addresses:</strong><br />
                dembekwinda03@gmail.com<br />
                deekwinda@icloud.com<br />
                s225485125@mandela.ac.za
              </li>
            </ul>
          </section>

          <section>
            <h2>Professional Skills</h2>

            <h3>Programming & Software Development</h3>
            <ul>
              <li>C#, C, MATLAB, Java, Python</li>
              <li>Arduino programming & embedded systems</li>
              <li>HTML, CSS, JavaScript</li>
              <li>Flutter (Cupertino & Material design, state management, animations)</li>
              <li>RESTful API development (Node.js, Express, MongoDB)</li>
              <li>Android Studio (Java/Kotlin)</li>
              <li>Firebase integration (Auth, Firestore)</li>
              <li>Email handling via SMTP</li>
              <li>OpenStreetMap integration using flutter map</li>
              <li>Version Control: Git & GitHub</li>
              <li>Cryptocurrency Data Integration: Real-time and historical data fetching from external APIs (e.g., CoinGecko)</li>
              <li>Data Parsing & Manipulation: Handling and processing JSON data structures for display</li>
              <li>Interactive Charting: Implementing data visualization for cryptocurrency price trends</li>
              <li>Asynchronous Programming: Managing API calls and data updates efficiently</li>
              <li>Frontend Development (React): Building responsive user interfaces for data display</li>
              <li>WebSocket Integration: Real-time data communication for dynamic updates</li>
            </ul>

            <h3>Cloud & DevOps Tools</h3>
            <ul>
              <li>Currently studying AWS Cloud Practitioner (in progress)</li>
              <li>Hands-on experience with EC2 instance setup and basic cloud deployments</li>
            </ul>

            <h3>Computer-Aided Design (CAD)</h3>
            <ul>
              <li>Autodesk Inventor, SolidWorks, Fusion 360</li>
              <li>3D modelling for mechanical parts and assemblies</li>
              <li>Technical drawing interpretation</li>
            </ul>

            <h3>Engineering & Automation</h3>
            <ul>
              <li>Circuit design & analysis (DC/AC, resonance, power systems)</li>
              <li>Sensor integration and basic robotics using Arduino</li>
              <li>Lighting simulation using Relux</li>
              <li>Hands-on project work (engine hoist, bench vice, etc.)</li>
              <li>Mechatronics prototyping</li>
            </ul>

            <h3>Data & Productivity Tools</h3>
            <ul>
              <li>Microsoft Excel (data logging, formulas, charts)</li>
              <li>Microsoft Word, PowerPoint</li>
              <li>Google Suite (Docs, Sheets, Drive, Classroom)</li>
              <li>Canva (flyers, marketing content)</li>
              <li>API Data Handling: Efficiently retrieving and processing data from web APIs</li>
              <li>Database Management: SQLite, PostgreSQL</li>
              <li>Scripting & Automation: PowerShell</li>
            </ul>

            <div className="skills-category">
              <h3>Data Science & Analytics</h3>
              <ul>
                <li>Data Analysis & Interpretation</li>
                <li>Data Visualization (Charts, Graphs)</li>
                <li>Statistical Modeling Concepts</li>
                <li>Machine Learning Fundamentals</li>
                <li>Data Cleaning & Preprocessing</li>
              </ul>
            </div>
          </section>

          <section>
            <h2>Soft Skills</h2>
            <ul>
              <li>Communication & presentation skills</li>
              <li>Problem-solving & critical thinking</li>
              <li>Telephone etiquette</li>
              <li>Team collaboration & peer mentoring</li>
              <li>Academic leadership</li>
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

            <div className="job-entry">
              <h3>Mbula’s Academy – Maths and Physical Sciences Tutor</h3>
              <p className="job-dates"><em>January 2022 – March 2023</em></p>
              <ul>
                <li>Tutoring and assisting students</li>
                <li>Conducting weekly tutorials for each grade</li>
                <li>Assessing students with tests and returning feedback</li>
                <li>Recording weekly test marks on Excel</li>
                <li>Assisting with university applications</li>
                <li>Participating in marketing campaigns</li>
              </ul>
            </div>

            <div className="job-entry">
              <h3>A O S Consulting Engineers – In-Service Training (Vacation Work)</h3>
              <p className="job-dates"><em>May 2024 – June 2024</em></p>
              <ul>
                <li>Compiled reports post site visits (Quality, Slaglist)</li>
                <li>Lighting simulations using Relux</li>
                <li>CAD drawings for custom installations</li>
                <li>Matched electrical drawings to physical locations</li>
              </ul>
            </div>

            <div className="job-entry">
              <h3>Nelson Mandela University – Mentor Buddy</h3>
              <p className="job-dates"><em>October 2024 – January 2025</em></p>
              <ul>
                <li>Google Drive resource management</li>
                <li>Educational video content creation</li>
                <li>Exam preparation content and mentoring</li>
              </ul>
            </div>
          </section>

          <section>
            <h2>Education</h2>

            <div className="education-entry">
              <h3>Matric (Grade 12)</h3>
              <p className="education-dates">Mbilwi Secondary School, 2020</p>
              <ul>
                <li>English, Mathematics, Physical Sciences, Life Orientation</li>
                <li>Life Sciences, Tshivenda, Geography</li>
              </ul>
            </div>

            <div className="education-entry">
              <h3>LLB Law – University of Johannesburg</h3>
              <p className="education-dates">Feb 2021 – Dec 2021</p>
            </div>

            <div className="education-entry">
              <h3>B Eng Mechatronics – Nelson Mandela University</h3>
              <p className="education-dates">Feb 2022 – Present</p>
              <p><strong>Modules:</strong></p>
              <ul>
                <li>Computer Science for Engineers 1A & 1B</li>
                <li>Mechanics, Thermodynamics, Materials Science</li>
                <li>Mathematics 1A & 1B</li>
                <li>Electrotechnology, Physics, Workshop Practice</li>
              </ul>
            </div>

            <div className="education-entry">
              <h3>AWS Cloud Practitioner – Amazon Web Services (In Progress)</h3>
              <p className="education-dates">2025 – Online Self-Paced</p>
              <ul>
                <li>Core AWS services, security, pricing</li>
                <li>Practical hands-on labs with EC2 and IAM</li>
              </ul>
            </div>
          </section>

          <section>
            <h2>Extracurricular Activities</h2>
            <ul>
              <li>Web and app development</li>
              <li>Photography</li>
              <li>Playing Soccer</li>
            </ul>
          </section>

          <section>
            <h2>References</h2>
            <ul>
              <li>Nelson Mandela University: +27 (0) 41 504 1111</li>
              <li>Mr Muntswu (Mbula’s Academy): +27 (0) 71 162 4028</li>
              <li>Mr Cornelis Leenders (AOS Consulting): +27 (0) 82 929 8282</li>
              <li>Ms Ronelle Plaatjes – Mentor Buddy Supervisor: 041 504 9055 / +27 (0) 82 499 5969</li>
              <li>Pastor Mulovhedzi: +27 (0) 82 731 1142</li>
            </ul>
          </section>
        </div>

        {/* Right Sidebar for Charts */}
        <div className="resume-sidebar right-sidebar">
          <h3>Learning Progress (Conceptual)</h3>
          {chartsReady ? ( // Conditionally render charts
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={learningProgressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#555' : '#ccc'} />
                <XAxis dataKey="name" stroke={isDarkMode ? '#f2f2f2' : '#222'} />
                <YAxis stroke={isDarkMode ? '#f2f2f2' : '#222'} />
                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                <Legend content={<CustomLegend isDarkMode={isDarkMode} />} />
                <Line type="monotone" dataKey="DataScience" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Engineering" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-placeholder">Loading Learning Progress Chart...</div>
          )}

          <h3>Data Science Tech Focus</h3>
          {chartsReady ? ( // Conditionally render charts
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataScienceFocusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {dataScienceFocusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                <Legend content={<CustomLegend isDarkMode={isDarkMode} />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-placeholder">Loading Data Science Focus Chart...</div>
          )}
        </div>
      </div>
    </div>
  );
}
