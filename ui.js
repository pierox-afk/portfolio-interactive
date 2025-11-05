document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      populateHero(data.hero);
      populateResume(data.resume);
      populateProjects(data.projects);
    });
});

function populateHero(heroData) {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div class="title">${heroData.title}</div>
    <div class="subtitle">${heroData.subtitle}</div>
    <div class="hero-actions">
      <a href="#projects" class="btn">View Projects</a>
      <a href="#about" class="btn">About Me</a>
    </div>
  `;
}

function populateResume(resumeData) {
  const resume = document.getElementById('resume');
  resume.innerHTML = `
    <header class="resume-header">
      <h1>${resumeData.name}</h1>
      <div class="resume-meta">
        <div>${resumeData.location}</div>
        <div>${resumeData.birthDate}</div>
        <div>${resumeData.gender}</div>
        <div><a href="${resumeData.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
        <div><a href="${resumeData.upwork}" target="_blank" rel="noopener">Upwork</a></div>
        <div>${resumeData.phone}</div>
      </div>
    </header>
    <div class="resume-body">
      <aside class="resume-left">
        <section class="card">
          <h3>Profile</h3>
          <p>${resumeData.profile}</p>
        </section>
        <section class="card">
          <h3>Skills</h3>
          <ul class="skills">
            ${resumeData.skills.map(skill => `<li>${skill}</li>`).join('')}
          </ul>
        </section>
        <section class="card">
          <h3>Languages</h3>
          <p>${resumeData.languages.join(', ')}</p>
        </section>
      </aside>
      <main class="resume-main">
        <section class="card">
          <h3>Profile Summary</h3>
          <p>${resumeData.profileSummary}</p>
        </section>
        <section class="card">
          <h3>Employment</h3>
          ${resumeData.employment.map(job => `
            <article>
              <strong>${job.title}</strong>
              <div class="muted">${job.period} — ${job.company}</div>
              <ul>
                ${job.duties.map(duty => `<li>${duty}</li>`).join('')}
              </ul>
            </article>
          `).join('')}
        </section>
        <section class="card">
          <h3>Education</h3>
          <p><strong>${resumeData.education.degree}</strong> — ${resumeData.education.institution} (${resumeData.education.period})</p>
          <p>${resumeData.education.description}</p>
        </section>
      </main>
    </div>
  `;
}

function populateProjects(projectsData) {
  const projects = document.getElementById('projects');
  projects.innerHTML = projectsData.map(project => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a class="btn" href="${project.link}" target="_blank" rel="noopener">Abrir</a>
    </div>
  `).join('');
}
