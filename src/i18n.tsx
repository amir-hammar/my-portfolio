import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          main: {
            role: "Software Engineer Student",
            footer: "A portfolio built by Amir Hammar",
          },

          navigation: {
            expertise: "Expertise",
            career: "Career",
            projects: "Projects",
            contact: "Contact",
            talk: "Let's talk",
          },

          expertise: {
            title: "Expertise",
            programming: {
              title: "Programming",
              skills: {
                python: "Python",
                java: "Java",
                c: "C",
                cpp: "C++",
                csharp: "C#",
                javascript: "JavaScript",
                typescript: "TypeScript",
                apiIntegration: "API Integration",
                objectOrientedProgramming: "Object-Oriented Programming",
              },
            },
            webDevelopment: {
              title: "Web Development",
              skills: {
                reactjs: "React.js",
                nodejs: "Node.js",
                html: "HTML",
                css: "CSS",
                jquery: "JQuery",
                maven: "Maven",
              },
            },
            data: {
              title: "Data",
              skills: {
                etl: "ETL",
                json: "JSON",
                bigquery: "BigQuery",
                sqlQuery: "SQL Query",
                mysql: "MySQL",
                postgresql: "PostgreSQL",
                mariadb: "MariaDB",
                pandas: "Pandas",
                numpy: "NumPy",
                statisticalAnalysis: "Statistical Analysis",
              },
            },
            tools: {
              title: "Development Tools & Environments",
              skills: {
                github: "GitHub",
                docker: "Docker",
                azure: "Azure",
                visualStudioCode: "Visual Studio Code",
                pycharm: "PyCharm",
                intellijIdea: "IntelliJ IDEA",
                ubuntu: "Ubuntu",
                windowsServer: "Windows Server",
                bash: "Bash",
                matlab: "Matlab",
              },
            },
          },

          career: {
            title: "Career History",
            stingray: {
              date: "Jan 2025 - Present",
              title: "Software Developer",
              company: "Stingray",
              city: "Montreal, QC, CA",
              tasks: {
                title: "Tasks",
                list: [
                  "Worked with <b>ETL</b> pipelines on <b>Google Cloud Platform (GCP)</b>, processing <b>20+ GB</b> of data daily using <b>Apache Beam</b>",
                  "Contributed approximately <b>3,000+ lines</b> of <b>Java</b> production code across multiple repositories",
                  "Processed and analyzed datasets containing <b>50+ million</b> rows across <b>30+ BigQuery tables</b>",
                  "Wrote <b>500+ lines</b> of <b>Python</b> scripts for data analysis, validation, and troubleshooting",
                  "Contributed to <b>18+ JIRA tickets</b> across multiple data engineering projects",
                  "Created and implemented <b>40+ unit tests</b> to ensure code quality and data integrity",
                  "Improved data quality for analytics platforms serving <b>10+ million users</b>",
                  "Developed an automated monitoring solution for 5 different data sources that sends daily status reports via Microsoft Teams, providing real-time visibility into ETL pipeline performance"
                ]
              },
              technologies: {
                title: "Stack",
                stack: [
                  "ETL",
                  "Google BigQuery",
                  "Google Cloud Platform",
                  "Apache Beam",
                  "Java",
                  "Python",
                  "SQL",
                  "GitLab"
                ]
              }
            },
            ssc: {
              date: "May 2024 - Dec 2024",
              title: "Data Analyst",
              company: "Shared Services Canada",
              city: "Montreal, QC, CA",
              tasks: {
                title: "Tasks",
                list: [
                  "Built a <b>Python-based</b> solution automating the extraction, verification, and updating of <b>5,000+ rows</b> of email data across multiple Excel files, using <b>customTkinter</b> for the GUI",
                  "Automated <b>15+ recurring</b> data update processes using <b>Power Automate</b>",
                  "Migrated a consolidated Excel dataset covering <b>10+ services</b> to an <b>Azure SQL Server</b> using <b>SSMS</b>",
                  "Imported, transformed, and visualized data in <b>Power BI</b>, enhancing <b>5+ existing reports</b> with <b>20+ new visuals</b>"
                ]
              },
              technologies: {
                title: "Stack",
                stack: [
                  "Python",
                  "SQL",
                  "Tkinter",
                  "User Interface",
                  "Azure SQL",
                  "AI Hub",
                  "Power Automate",
                  "Power BI",
                  "Power Query"
                ]
              }
            },
            matrox: {
              date: "Jan 2023 - Aug 2023",
              title: "R&D Technician",
              company: "Matrox",
              city: "Montreal, QC, CA",
              tasks: {
                title: "Tasks",
                list: [
                  "Developed and enhanced <b>10+ features</b> in an existing <b>C project</b>",
                  "Resolved <b>15+ bugs</b> impacting the integration of new features",
                  "Configured an <b>Ubuntu virtual machine</b> from scratch to meet specific project requirements",
                  "Performed 50+ HDMI protocol tests on various devices using an oscilloscope to verify compliance and performance"
                ]
              },
              technologies: {
                title: "Stack",
                stack: [
                  "C/C++",
                  "MATLAB",
                  "Ubuntu",
                  "Oscilloscope",
                  "Electronics",
                  "Raspberry Pi"
                ]
              }
            },
            addatech: {
              date: "June 2022 - Aug 2022",
              title: "Technical Support Technician",
              company: "Addatech",
              city: "Laval, QC, CA",
              tasks: {
                title: "Tasks",
                list: [
                  "Responded to <b>30+ technical support requests</b> via email and phone",
                  "Provided written solutions and troubleshooting steps to resolve <b>10+</b> user issues, improving resolution time",
                  "Used remote control software to assist <b>5+</b> users in troubleshooting and resolving technical issues",
                  "Assisted with the installation and configuration of software for <b>10+</b> users"
                ]
              },
              technologies: {
                title: "Stack",
                stack: [
                  "SQL"
                ]
              }
            }
          },

          projects: {
            title: "Projects",
            digiclipse: {
              title: "DigiClipse",
              description:
                "Ensure the availability of parts by automating the extraction and verification of part numbers through Excel files and the Digikey API, while managing human errors using <b>Pandas</b>, <b>Python</b>, <b>Docker</b> and <b>APIs</b>.",
            },
            arcade: {
              title: "Arcade",
              description:
                "Built an <b>arcade game</b> from scratch, designing both the <b>hardware</b> and <b>software</b>. Programmed <b>gameplay</b>, <b>UI</b>, <b>menus</b>, and <b>settings</b> while optimizing performance for a smooth experience. Applied skills in <b>game programming</b>, <b>Arduino</b>, <b>UI design</b>, <b>controller integration</b>, and <b>electronics</b>.",
            },
            aspire: {
              title: "Aspire",
              description:
                "Develop a <b>voice assistant</b> named <b>Aspire</b> (still under development) for <b>computer control</b>. It enables users to <b>open applications</b>, <b>navigate the web</b>, and ask questions to <b>ChatGPT</b>. The project leverages <b>OpenAI GPT-3</b> and <b>Python</b>, utilizes <b>APIs</b> for integration, and incorporates <b>audio file management</b>.",
            },
            database: {
              title: "Web Database Interface",
              description:
                "Set up a <b>web database interface</b> on a <b>Raspberry Pi</b> server with a <b>web interface</b> that simplifies <b>displaying</b>, <b>entering</b>, and <b>manipulating data</b>. Leveraging <b>web development</b> best practices, the project integrates <b>SQL</b> capabilities with a user-friendly <b>user interface</b> and utilizes <b>MariaDB</b> for robust database management.",
            },
            voiceTranslator: {
              title: "Voice Translator",
              description:
                "Developed a <b>Python-powered</b> voice translator that converts <b>speech to text</b> using <b>OpenAI Whisper</b> and <b>NumPy</b> for processing, translates the extracted text into Japanese via an <b>external API</b>, and synthesizes the translated text back into <b>speech</b> using advanced speech processing techniques.",
            },
            dataUpdater: {
              title: "Data Updater Application",
              description:
                "<b>Automate</b> the extraction, verification, and updating of email <b>data</b> in Excel based on selected dates and subjects, as part of my work at Shared Services Canada, using <b>Python</b>, <b>customTkinter</b> for the <b>GUI</b>, and <b>Excel query libraries</b> for seamless data integration.",
            },
            classManagement: {
              title: "Class Management System",
              description:
                "Developed a <b>Class Management System</b> for the LOG210 course, engineered to <b>streamline</b> the management of <b>courses</b>, <b>students</b>, and other academic activities. Built with <b>TypeScript</b>, <b>Pug</b> and <b>CSS</b>.",
            },
            portfolio: {
              title: "Portfolio Website",
              description:
                "Developed a personal website to showcase projects, skills, and experiences using <b>React</b>. Built with <b>TypeScript</b> on <b>HTML5</b> and styled with <b>SASS</b> to ensure a robust, responsive, and interactive design.",
            },
          },

          contact: {
            title: "Contact Me",
            description: "Got a project waiting to be realized? Let's collaborate and make it happen!",
            button: "Send me an email"
          },
        },
      },

      fr: {
        translation: {
          main: {
            role: "Étudiant en Génie Logiciel",
            footer: "Un portfolio construit par Amir Hammar",
          },

          navigation: {
            expertise: "Expertise",
            career: "Carrière",
            projects: "Projets",
            contact: "Contact",
            talk: "Discutons",
          },

          expertise: {
            title: "Expertise",
            programming: {
              title: "Programmation",
              skills: {
                python: "Python",
                java: "Java",
                c: "C",
                cpp: "C++",
                csharp: "C#",
                javascript: "JavaScript",
                typescript: "TypeScript",
                apiIntegration: "Intégration d'API",
                objectOrientedProgramming: "Programmation Orientée Objet",
              },
            },
            webDevelopment: {
              title: "Développement Web",
              skills: {
                reactjs: "React.js",
                nodejs: "Node.js",
                html: "HTML",
                css: "CSS",
                jquery: "JQuery",
                maven: "Maven",
              },
            },
            data: {
              title: "Données",
              skills: {
                etl: "ETL",
                json: "JSON",
                bigquery: "BigQuery",
                sqlQuery: "Requêtes SQL",
                mysql: "MySQL",
                postgresql: "PostgreSQL",
                mariadb: "MariaDB",
                pandas: "Pandas",
                numpy: "NumPy",
                statisticalAnalysis: "Analyse Statistique",
              },
            },
            tools: {
              title: "Outils et Environnements de Développement",
              skills: {
                github: "GitHub",
                docker: "Docker",
                azure: "Azure",
                visualStudioCode: "Visual Studio Code",
                pycharm: "PyCharm",
                intellijIdea: "IntelliJ IDEA",
                ubuntu: "Ubuntu",
                windowsServer: "Windows Server",
                bash: "Bash",
                matlab: "Matlab",
              },
            },
          },

          career: {
            title: "Parcours Professionnel",
            stingray: {
              date: "Jan 2025 - Présent",
              title: "Développeur Logiciel",
              company: "Stingray",
              city: "Montréal, QC, CA",
              tasks: {
                title: "Tâches",
                list: [
                  "Travaillé sur des pipelines <b>ETL</b> sur <b>Google Cloud Platform (GCP)</b>, traitant <b>plus de 20 Go</b> de données par jour avec <b>Apache Beam</b>",
                  "Contribué à plus de <b>3 000 lignes</b> de code <b>Java</b> en production réparties sur plusieurs dépôts",
                  "Traité et analysé des ensembles de données contenant plus de <b>50 millions</b> de lignes réparties sur plus de <b>30 tables BigQuery</b>",
                  "Écrit plus de <b>500 lignes</b> de scripts <b>Python</b> pour l'analyse, la validation et le dépannage des données",
                  "Contribué à plus de <b>18 tickets JIRA</b> à travers plusieurs projets d'ingénierie de données",
                  "Créé et mis en œuvre plus de <b>40 tests unitaires</b> pour assurer la qualité du code et l'intégrité des données",
                  "Amélioré la qualité des données pour des plateformes d'analytique desservant plus de <b>10 millions d'utilisateurs</b>",
                  "Développé une solution de surveillance automatisée pour 5 sources de données, envoyant des rapports quotidiens via Microsoft Teams pour une visibilité en temps réel sur la performance des pipelines ETL"
                ]
              },
              technologies: {
                title: "Technologies",
                stack: [
                  "ETL",
                  "Google BigQuery",
                  "Google Cloud Platform",
                  "Apache Beam",
                  "Java",
                  "Python",
                  "SQL",
                  "GitLab"
                ]
              }
            },
            ssc: {
              date: "Mai 2024 - Déc 2024",
              title: "Analyste de Données",
              company: "Services Partagés Canada",
              city: "Montréal, QC, CA",
              tasks: {
                title: "Tâches",
                list: [
                  "Développé une solution basée sur <b>Python</b> automatisant l'extraction, la vérification et la mise à jour de plus de <b>5 000 lignes</b> de données d'emails à travers plusieurs fichiers Excel, en utilisant <b>customTkinter</b> pour l'interface graphique",
                  "Automatisé plus de <b>15 processus</b> de mise à jour de données récurrents avec <b>Power Automate</b>",
                  "Migré un jeu de données consolidé provenant de Excel couvrant plus de <b>10 services</b> vers un <b>serveur SQL Azure</b> en utilisant <b>SSMS</b>",
                  "Importé, transformé et visualisé des données dans <b>Power BI</b>, en améliorant plus de <b>5 rapports</b> existants avec <b>20+ nouvelles visualisations</b>"
                ]
              },
              technologies: {
                title: "Technologies",
                stack: [
                  "Python",
                  "SQL",
                  "Tkinter",
                  "Interface Utilisateur",
                  "Azure SQL",
                  "AI Hub",
                  "Power Automate",
                  "Power BI",
                  "Power Query"
                ]
              }
            },
            matrox: {
              date: "Jan 2023 - Août 2023",
              title: "Technicien R&D",
              company: "Matrox",
              city: "Montréal, QC, CA",
              tasks: {
                title: "Tâches",
                list: [
                  "Développé et amélioré plus de <b>10 fonctionnalités</b> dans un <b>projet C</b> existant",
                  "Résolu plus de <b>15 bogues</b> affectant l'intégration des nouvelles fonctionnalités",
                  "Configuré une <b>machine virtuelle Ubuntu</b> depuis zéro pour répondre aux besoins spécifiques du projet",
                  "Effectué plus de <b>50 tests</b> du protocole HDMI sur divers appareils à l'aide d'un oscilloscope pour vérifier la conformité et la performance"
                ]
              },
              technologies: {
                title: "Technologies",
                stack: [
                  "C/C++",
                  "MATLAB",
                  "Ubuntu",
                  "Oscilloscope",
                  "Electronics",
                  "Raspberry Pi"
                ]
              }
            },
            addatech: {
              date: "Juin 2022 - Août 2022",
              title: "Technicien Support Technique",
              company: "Addatech",
              city: "Laval, QC, CA",
              tasks: {
                title: "Tâches",
                list: [
                  "Répondu à plus de <b>30</b> demandes de support technique par email et téléphone",
                  "Fournit des solutions écrites et des étapes de dépannage pour résoudre plus de <b>10 problèmes</b> utilisateurs, améliorant ainsi le temps de résolution",
                  "Utilisé des logiciels de prise en main à distance pour aider plus de <b>5 utilisateurs</b> dans le dépannage et la résolution de problèmes techniques",
                  "Assisté dans l'installation et la configuration de logiciels pour plus de <b>10 utilisateurs</b>"
                ]
              },
              technologies: {
                title: "Technologies",
                stack: [
                  "SQL"
                ]
              }
            }
          },

          projects: {
            title: "Projets",
            digiclipse: {
              title: "DigiClipse",
              description:
                "Assurer la disponibilité des pièces en automatisant l'extraction et la vérification des numéros de pièces via des fichiers Excel et l'API Digikey, tout en gérant les erreurs humaines à l'aide de <b>Pandas</b>, <b>Python</b>, <b>Docker</b> et des <b>APIs</b>.",
            },
            arcade: {
              title: "Arcade",
              description:
                "Création d'un <b>jeu d'arcade</b> à partir de rien, conception du <b>matériel</b> et du <b>logiciel</b>. Programmation du <b>gameplay</b>, de l'<b>interface utilisateur</b>, des <b>menus</b> et des <b>paramètres</b> tout en optimisant les performances. Application des compétences en <b>programmation de jeux</b>, <b>Arduino</b>, <b>conception d'interface</b>, <b>intégration de contrôleur</b> et <b>électronique</b>.",
            },
            aspire: {
              title: "Aspire",
              description:
                "Développement d'un <b>assistant vocal</b> nommé <b>Aspire</b> (en cours de développement) pour le <b>contrôle d'ordinateur</b>. Il permet aux utilisateurs d'<b>ouvrir des applications</b>, de <b>naviguer sur le web</b> et de poser des questions à <b>ChatGPT</b>. Le projet utilise <b>OpenAI GPT-3</b> et <b>Python</b>, des <b>APIs</b> pour l'intégration, et la gestion de <b>fichiers audio</b>.",
            },
            database: {
              title: "Interface de Base de Données Web",
              description:
                "Mise en place d'une <b>interface de base de données web</b> sur un serveur <b>Raspberry Pi</b> avec une <b>interface web</b> qui simplifie l'<b>affichage</b>, la <b>saisie</b> et la <b>manipulation des données</b>. Utilisation des meilleures pratiques de <b>développement web</b>, intégration des capacités <b>SQL</b> avec une <b>interface utilisateur</b> conviviale et utilisation de <b>MariaDB</b> pour une gestion robuste de la base de données.",
            },
            voiceTranslator: {
              title: "Traducteur Vocal",
              description:
                "Développement d'un traducteur vocal alimenté par <b>Python</b> qui convertit la <b>parole en texte</b> à l'aide d'<b>OpenAI Whisper</b> et <b>NumPy</b> pour le traitement, traduit le texte extrait en japonais via une <b>API externe</b>, et synthétise le texte traduit en <b>parole</b> en utilisant des techniques avancées de traitement de la parole.",
            },
            dataUpdater: {
              title: "Application de Synchronisation des Données",
              description:
                "<b>Automatisation</b> de l'extraction, de la vérification et de la mise à jour des <b>données</b> d'emails dans Excel en fonction des dates et sujets sélectionnés, dans le cadre de mon travail à Services Partagés Canada, en utilisant <b>Python</b>, <b>customTkinter</b> pour l'<b>interface graphique</b> et des <b>bibliothèques de requêtes Excel</b> pour une intégration transparente des données.",
            },
            classManagement: {
              title: "Système de Gestion de Classe",
              description:
                "Développement d'un <b>Système de Gestion de Classe</b> pour le cours LOG210, conçu pour <b>simplifier</b> la gestion des <b>cours</b>, des <b>étudiants</b> et d'autres activités académiques. Construit avec <b>TypeScript</b>, <b>Pug</b> et <b>CSS</b>.",
            },
            portfolio: {
              title: "Site Web Portfolio",
              description:
                "Développement d'un site web personnel pour présenter mes projets, compétences et expériences en utilisant <b>React</b>. Construit avec <b>TypeScript</b> sur <b>HTML5</b> et stylisé avec <b>SASS</b> pour assurer une conception robuste, responsive et interactive.",
            },
          },

          contact: {
            title: "Me Contacter",
            description: "Vous avez un projet en attente de réalisation ? Collaborons pour le concrétiser !",
            button: "Envoyez-moi un email"
          },

        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
