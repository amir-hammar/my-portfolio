// Content for 10-cosmos, mirroring src/i18n.tsx (EN + FR).
// Split out so the scene file stays readable.

export const TR = {
  en: {
    nav: { expertise: 'Expertise', career: 'Career', projects: 'Projects', contact: 'Contact' },
    main: { role: 'Software Engineer Student', footer: 'A portfolio built by Amir Hammar', scroll: 'Scroll to travel ▾' },
    expertise: { title: 'Expertise' },
    career: { title: 'Career History' },
    projects: { title: 'Projects' },
    contact: {
      title: 'Contact Me',
      description: "Got a project waiting to be realized? Let's collaborate and make it happen!",
      button: 'Send me an email',
    },
  },
  fr: {
    nav: { expertise: 'Expertise', career: 'Carrière', projects: 'Projets', contact: 'Contact' },
    main: { role: 'Étudiant en Génie Logiciel', footer: 'Un portfolio construit par Amir Hammar', scroll: 'Défilez pour voyager ▾' },
    expertise: { title: 'Expertise' },
    career: { title: 'Parcours Professionnel' },
    projects: { title: 'Projets' },
    contact: {
      title: 'Me Contacter',
      description: 'Vous avez un projet en attente de réalisation ? Collaborons pour le concrétiser !',
      button: 'Envoyez-moi un email',
    },
  },
};

export const SKILLS = [
  { icon: 'code', en: 'Programming', fr: 'Programmation',
    items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript',
            { en: 'API Integration', fr: "Intégration d'API" },
            { en: 'Object-Oriented Programming', fr: 'Programmation Orientée Objet' }] },
  { icon: 'react', en: 'Web Development', fr: 'Développement Web',
    items: ['React.js', 'Node.js', 'HTML', 'CSS', 'JQuery', 'Maven'] },
  { icon: 'db', en: 'Data', fr: 'Données',
    items: ['ETL', 'JSON', 'BigQuery', { en: 'SQL Query', fr: 'Requêtes SQL' }, 'MySQL',
            'PostgreSQL', 'MariaDB', 'Pandas', 'NumPy',
            { en: 'Statistical Analysis', fr: 'Analyse Statistique' }] },
  { icon: 'tools', en: 'Development Tools & Environments', fr: 'Outils et Environnements',
    items: ['GitHub', 'Docker', 'Azure', 'Visual Studio Code', 'PyCharm', 'IntelliJ IDEA',
            'Ubuntu', 'Windows Server', 'Bash', 'Matlab'] },
];

export const CAREER = [
  {
    logo: 'stingray',
    date: { en: 'Jan 2025 - Present', fr: 'Jan 2025 - Présent' },
    title: { en: 'Software Developer', fr: 'Développeur Logiciel' },
    company: 'Stingray', city: 'Montreal, QC, CA',
    tasks: {
      en: ['Worked with <b>ETL</b> pipelines on <b>Google Cloud Platform</b>, processing <b>20+ GB</b> of data daily using <b>Apache Beam</b>',
           'Contributed approximately <b>3,000+ lines</b> of <b>Java</b> production code across multiple repositories',
           'Processed and analyzed datasets containing <b>50+ million</b> rows across <b>30+ BigQuery tables</b>',
           'Created and implemented <b>40+ unit tests</b> to ensure code quality and data integrity',
           'Improved data quality for analytics platforms serving <b>10+ million users</b>'],
      fr: ['Travaillé sur des pipelines <b>ETL</b> sur <b>Google Cloud Platform</b>, traitant <b>plus de 20 Go</b> de données par jour avec <b>Apache Beam</b>',
           'Contribué à plus de <b>3 000 lignes</b> de code <b>Java</b> en production',
           'Traité et analysé des ensembles de plus de <b>50 millions</b> de lignes sur <b>30+ tables BigQuery</b>',
           'Créé plus de <b>40 tests unitaires</b> pour assurer la qualité du code',
           'Amélioré la qualité des données pour des plateformes desservant plus de <b>10 millions d\'utilisateurs</b>'],
    },
    stack: ['ETL', 'Google BigQuery', 'Google Cloud Platform', 'Apache Beam', 'Java', 'Python', 'SQL', 'GitLab'],
  },
  {
    logo: 'ssc',
    date: { en: 'May 2024 - Dec 2024', fr: 'Mai 2024 - Déc 2024' },
    title: { en: 'Data Analyst', fr: 'Analyste de Données' },
    company: { en: 'Shared Services Canada', fr: 'Services Partagés Canada' }, city: 'Montreal, QC, CA',
    tasks: {
      en: ['Built a <b>Python-based</b> solution automating extraction and verification of <b>5,000+ rows</b> of email data, using <b>customTkinter</b> for the GUI',
           'Automated <b>15+ recurring</b> data update processes using <b>Power Automate</b>',
           'Migrated a consolidated dataset covering <b>10+ services</b> to an <b>Azure SQL Server</b>',
           'Enhanced <b>5+ existing reports</b> in <b>Power BI</b> with <b>20+ new visuals</b>'],
      fr: ['Développé une solution <b>Python</b> automatisant la vérification de <b>5 000+ lignes</b> de données, avec <b>customTkinter</b>',
           'Automatisé plus de <b>15 processus</b> récurrents avec <b>Power Automate</b>',
           'Migré un jeu de données couvrant <b>10+ services</b> vers un <b>serveur SQL Azure</b>',
           'Amélioré <b>5+ rapports</b> dans <b>Power BI</b> avec <b>20+ visualisations</b>'],
    },
    stack: ['Python', 'SQL', 'Tkinter', 'Azure SQL', 'Power Automate', 'Power BI', 'Power Query'],
  },
  {
    logo: 'matrox',
    date: { en: 'Jan 2023 - Aug 2023', fr: 'Jan 2023 - Août 2023' },
    title: { en: 'R&D Technician', fr: 'Technicien R&D' },
    company: 'Matrox', city: 'Montreal, QC, CA',
    tasks: {
      en: ['Developed and enhanced <b>10+ features</b> in an existing <b>C project</b>',
           'Resolved <b>15+ bugs</b> impacting the integration of new features',
           'Configured an <b>Ubuntu virtual machine</b> from scratch',
           'Performed <b>50+ HDMI protocol tests</b> using an oscilloscope'],
      fr: ['Développé et amélioré plus de <b>10 fonctionnalités</b> dans un <b>projet C</b>',
           'Résolu plus de <b>15 bogues</b> affectant l\'intégration des nouvelles fonctionnalités',
           'Configuré une <b>machine virtuelle Ubuntu</b> depuis zéro',
           'Effectué plus de <b>50 tests</b> du protocole HDMI à l\'oscilloscope'],
    },
    stack: ['C/C++', 'MATLAB', 'Ubuntu', 'Oscilloscope', 'Raspberry Pi'],
  },
  {
    logo: 'addatech',
    date: { en: 'June 2022 - Aug 2022', fr: 'Juin 2022 - Août 2022' },
    title: { en: 'Technical Support Technician', fr: 'Technicien Support Technique' },
    company: 'Addatech', city: 'Laval, QC, CA',
    tasks: {
      en: ['Responded to <b>30+ technical support requests</b> via email and phone',
           'Provided written solutions resolving <b>10+</b> user issues, improving resolution time',
           'Used remote control software to assist <b>5+</b> users',
           'Assisted with installation and configuration of software for <b>10+</b> users'],
      fr: ['Répondu à plus de <b>30 demandes</b> de support technique par email et téléphone',
           'Fourni des solutions écrites résolvant plus de <b>10 problèmes</b> utilisateurs',
           'Utilisé des logiciels de prise en main à distance pour aider <b>5+</b> utilisateurs',
           'Assisté à l\'installation de logiciels pour plus de <b>10 utilisateurs</b>'],
    },
    stack: ['SQL'],
  },
];

export const PROJECTS = [
  { imgs: ['digiclipse', 'digiclipse2'], title: 'DigiClipse',
    en: 'Ensure the availability of parts by automating the extraction and verification of part numbers through Excel files and the Digikey API, while managing human errors using <b>Pandas</b>, <b>Python</b>, <b>Docker</b> and <b>APIs</b>.',
    fr: "Assurer la disponibilité des pièces en automatisant l'extraction et la vérification des numéros de pièces via des fichiers Excel et l'API Digikey, à l'aide de <b>Pandas</b>, <b>Python</b>, <b>Docker</b> et des <b>APIs</b>." },
  { imgs: ['arcade'], title: 'Arcade',
    en: 'Built an <b>arcade game</b> from scratch, designing both the <b>hardware</b> and <b>software</b>. Programmed <b>gameplay</b>, <b>UI</b>, <b>menus</b>, and <b>settings</b> while optimizing performance. Applied skills in <b>Arduino</b>, <b>controller integration</b>, and <b>electronics</b>.',
    fr: "Création d'un <b>jeu d'arcade</b> à partir de rien, conception du <b>matériel</b> et du <b>logiciel</b>. Programmation du <b>gameplay</b>, de l'<b>interface</b>, des <b>menus</b>. Compétences en <b>Arduino</b> et <b>électronique</b>." },
  { imgs: ['aspire'], title: 'Aspire',
    en: 'Develop a <b>voice assistant</b> named <b>Aspire</b> for <b>computer control</b>. It enables users to <b>open applications</b>, <b>navigate the web</b>, and ask questions to <b>ChatGPT</b>. Leverages <b>OpenAI GPT</b> and <b>Python</b>.',
    fr: "Développement d'un <b>assistant vocal</b> nommé <b>Aspire</b> pour le <b>contrôle d'ordinateur</b> : <b>ouvrir des applications</b>, <b>naviguer sur le web</b>, poser des questions à <b>ChatGPT</b>. Utilise <b>OpenAI GPT</b> et <b>Python</b>." },
  { imgs: ['database'], title: { en: 'Web Database Interface', fr: 'Interface de Base de Données Web' },
    en: 'Set up a <b>web database interface</b> on a <b>Raspberry Pi</b> server that simplifies <b>displaying</b>, <b>entering</b>, and <b>manipulating data</b>, integrating <b>SQL</b> capabilities with <b>MariaDB</b>.',
    fr: "Mise en place d'une <b>interface de base de données web</b> sur un serveur <b>Raspberry Pi</b> simplifiant l'<b>affichage</b>, la <b>saisie</b> et la <b>manipulation des données</b>, avec <b>MariaDB</b>." },
  { imgs: ['translator'], title: { en: 'Voice Translator', fr: 'Traducteur Vocal' },
    en: 'Developed a <b>Python-powered</b> voice translator that converts <b>speech to text</b> using <b>OpenAI Whisper</b> and <b>NumPy</b>, translates into Japanese via an <b>external API</b>, and synthesizes the result back into <b>speech</b>.',
    fr: "Traducteur vocal <b>Python</b> convertissant la <b>parole en texte</b> avec <b>OpenAI Whisper</b> et <b>NumPy</b>, traduisant en japonais via une <b>API externe</b>, puis synthétisant le texte en <b>parole</b>." },
  { imgs: ['sscMain', 'sscSettings'], title: { en: 'Data Updater Application', fr: 'Application de Synchronisation' },
    en: '<b>Automate</b> the extraction, verification, and updating of email <b>data</b> in Excel, as part of my work at Shared Services Canada, using <b>Python</b>, <b>customTkinter</b> for the <b>GUI</b>, and <b>Excel query libraries</b>.',
    fr: "<b>Automatisation</b> de l'extraction et de la mise à jour des <b>données</b> d'emails dans Excel, dans le cadre de mon travail à Services Partagés Canada, avec <b>Python</b> et <b>customTkinter</b>." },
  { imgs: ['sga'], title: { en: 'Class Management System', fr: 'Système de Gestion de Classe' },
    en: 'Developed a <b>Class Management System</b> for the LOG210 course, engineered to <b>streamline</b> the management of <b>courses</b>, <b>students</b>, and other academic activities. Built with <b>TypeScript</b>, <b>Pug</b> and <b>CSS</b>.',
    fr: "Développement d'un <b>Système de Gestion de Classe</b> pour le cours LOG210, conçu pour <b>simplifier</b> la gestion des <b>cours</b> et des <b>étudiants</b>. Construit avec <b>TypeScript</b>, <b>Pug</b> et <b>CSS</b>." },
  { imgs: ['portfolio'], title: { en: 'Portfolio Website', fr: 'Site Web Portfolio' },
    en: 'Developed a personal website to showcase projects, skills, and experiences using <b>React</b>. Built with <b>TypeScript</b> on <b>HTML5</b> and styled with <b>SASS</b> to ensure a robust, responsive, and interactive design.',
    fr: "Développement d'un site web personnel pour présenter mes projets et compétences avec <b>React</b>. Construit avec <b>TypeScript</b> et stylisé avec <b>SASS</b>." },
];

export const ICONS = {
  code:  'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z',
  react: 'M12 10.1a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8m0-4.3c2.7 0 5.2.4 7 1 1.9.7 3 1.7 3 2.5v1.4c0 .8-1.1 1.8-3 2.5-1.8.6-4.3 1-7 1s-5.2-.4-7-1c-1.9-.7-3-1.7-3-2.5V9.3c0-.8 1.1-1.8 3-2.5 1.8-.6 4.3-1 7-1m-7.6 2c-.9.4-1.4.9-1.4 1.2s.5.8 1.4 1.2c1.6.6 3.9.9 6.4.9h1.2c2.5 0 4.8-.3 6.4-.9.9-.4 1.4-.9 1.4-1.2s-.5-.8-1.4-1.2c-1.6-.6-3.9-.9-6.4-.9h-1.2c-2.5 0-4.8.3-6.4.9M12 2.2c1 0 1.9.6 2.6 1.6.7 1 1.2 2.4 1.4 4 .2 1.7 0 3.5-.5 5.2-.5 1.7-1.3 3.2-2.2 4.3-.9 1.1-1.9 1.7-2.9 1.7s-2-.6-2.9-1.7c-.9-1.1-1.7-2.6-2.2-4.3-.5-1.7-.7-3.5-.5-5.2.2-1.6.7-3 1.4-4C9 2.8 10 2.2 11 2.2z',
  db:    'M12 2c4.4 0 8 1.3 8 3v14c0 1.7-3.6 3-8 3s-8-1.3-8-3V5c0-1.7 3.6-3 8-3m0 2C8.1 4 6 5 6 5.4S8.1 7 12 7s6-1.1 6-1.6S15.9 4 12 4M6 8.4V12c0 .5 2.1 1.6 6 1.6s6-1.1 6-1.6V8.4C16.5 9.4 14.3 10 12 10s-4.5-.6-6-1.6m0 6V18c0 .5 2.1 1.6 6 1.6s6-1.1 6-1.6v-3.6c-1.5 1-3.7 1.6-6 1.6s-4.5-.6-6-1.6',
  tools: 'M22.7 19 13.6 9.9a5.99 5.99 0 0 0-7.6-7.6l3.6 3.6-2.8 2.8-3.6-3.6a6 6 0 0 0 7.6 7.6l9.1 9.1a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 0 0-1.4',
};

export const SOCIAL_SVG = `
  <a href="https://github.com/amir-hammar" target="_blank" rel="noreferrer noopener" title="GitHub" aria-label="GitHub">
    <svg viewBox="0 0 24 24"><path d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 0 1 .64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 0 1 0-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 0 1 0 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0 0 12 1.27"/></svg>
  </a>
  <a href="https://www.linkedin.com/in/amirhammar/" target="_blank" rel="noreferrer noopener" title="LinkedIn" aria-label="LinkedIn">
    <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0"/></svg>
  </a>`;
