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

          hud: {
            invite: "Drop a like if you like what you see! 👀",
            thanks: "Thanks for the star! 🙏",
            protest1: "Too late, no takebacks! 😄",
            protest2: "Wait, please reconsider... 🥺",
            protest3: "Okay, I am begging you now. 😭",
            surrendered: "Fine. It is gone. I am fine. 💔",
            failed: "signal lost"
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
                cpp: "C++",
                csharp: "C#",
                dotnet: ".NET",
                rust: "Rust",
                javascript: "JavaScript",
                typescript: "TypeScript",
                html: "HTML",
                css: "CSS",
                entityFramework: "Entity Framework",
                claudeCode: "Claude Code",
                githubCopilot: "GitHub Copilot",
                restfulApi: "RESTful APIs",
                apiIntegration: "API Integration",
                objectOrientedProgramming: "Object-Oriented Programming",
                cleanArchitecture: "Clean Architecture",
                microservices: "Microservices",
              },
            },
            frameworks: {
              title: "Frameworks & Libraries",
              skills: {
                reactjs: "React.js",
                reactNative: "React Native",
                tkinter: "Tkinter",
                kafka: "Kafka",
                nodejs: "Node.js",
                expo: "Expo",
                jquery: "JQuery",
                nginx: "NGINX",
                krakend: "KrakenD",
              },
            },
            data: {
              title: "Data",
              skills: {
                etl: "ETL",
                json: "JSON",
                bigquery: "BigQuery",
                sqlQuery: "SQL Query",
                nosql: "NoSQL",
                mysql: "MySQL",
                powerbi: "Power BI",
                postgresql: "PostgreSQL",
                mariadb: "MariaDB",
                redis: "Redis",
                apacheBeam: "Apache Beam",
                pandas: "Pandas",
                numpy: "NumPy",
                statisticalAnalysis: "Statistical Analysis",
              },
            },
            tools: {
              title: "Development Tools & Environments",
              skills: {
                github: "GitHub",
                gitlab: "GitLab",
                jira: "Jira",
                docker: "Docker",
                kubernetes: "Kubernetes",
                gcp: "Google Cloud Platform",
                azure: "Azure",
                visualStudioCode: "Visual Studio Code",
                pycharm: "PyCharm",
                intellijIdea: "IntelliJ IDEA",
                ubuntu: "Ubuntu",
                windowsServer: "Windows Server",
                bash: "Bash",
                matlab: "Matlab",
                maven: "Maven",
              },
            },
            observability: {
              title: "Observability & Monitoring",
              skills: {
                prometheus: "Prometheus",
                grafana: "Grafana",
                opentelemetry: "OpenTelemetry",
                tempo: "Tempo",
                loki: "Loki",
              },
            },
            testing: {
              title: "Testing",
              skills: {
                junit: "JUnit",
                xunit: "xUnit",
                mockito: "Mockito",
                k6: "k6",
              },
            },
          },

          career: {
            title: "Career History",
            stingray: {
              date: "Jan 2025 to Apr 2025",
              title: "Software Developer",
              company: "Stingray",
              city: "Montreal, QC, CA",
              tasks: {
                title: "Tasks",
                list: [
                  "<b>ETL</b> pipelines on <b>GCP</b>: <b>20+ GB</b> daily via <b>Apache Beam</b>",
                  "<b>3,000+ lines</b> of production <b>Java</b>",
                  "<b>50M+ rows</b> across <b>30+ BigQuery</b> tables",
                  "<b>500+ lines</b> of <b>Python</b>: analysis, validation, debugging",
                  "<b>18+ JIRA tickets</b> delivered",
                  "<b>40+ unit tests</b> authored",
                  "Analytics data quality for <b>10M+ users</b>",
                  "Automated monitoring: <b>5 sources</b>, daily <b>Teams</b> reports"
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
              date: "May 2024 to Dec 2024",
              title: "Data Analyst",
              company: "Shared Services Canada",
              city: "Montreal, QC, CA",
              tasks: {
                title: "Tasks",
                list: [
                  "<b>Python</b> + <b>customTkinter</b> tool for <b>5,000+ rows</b> of email data",
                  "<b>15+ recurring processes</b> automated with <b>Power Automate</b>",
                  "Excel to <b>Azure SQL</b> migration across <b>10+ services</b>",
                  "<b>Power BI</b>: <b>5+ reports</b> extended, <b>20+ new visuals</b>"
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
              date: "Jan 2023 to Aug 2023",
              title: "R&D Technician",
              company: "Matrox",
              city: "Montreal, QC, CA",
              tasks: {
                title: "Tasks",
                list: [
                  "<b>10+ features</b> built in an existing <b>C</b> codebase",
                  "<b>15+ bugs</b> resolved",
                  "<b>Ubuntu VM</b> configured from scratch",
                  "<b>50+ HDMI</b> protocol tests via oscilloscope"
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
              date: "June 2022 to Aug 2022",
              title: "Technical Support Technician",
              company: "Addatech",
              city: "Laval, QC, CA",
              tasks: {
                title: "Tasks",
                list: [
                  "<b>30+ support requests</b> by email and phone",
                  "<b>10+ user issues</b> resolved with written troubleshooting",
                  "<b>5+ users</b> assisted over remote control",
                  "Software install and configuration for <b>10+ users</b>"
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
                "Develop a <b>voice assistant</b> named <b>Aspire</b> (still under development) for <b>computer control</b>. It enables users to <b>open applications</b>, <b>navigate the web</b>, and ask questions to <b>ChatGPT</b>. The project leverages <b>OpenAI GPT 3</b> and <b>Python</b>, utilizes <b>APIs</b> for integration, and incorporates <b>audio file management</b>.",
            },
            database: {
              title: "Web Database Interface",
              description:
                "Set up a <b>web database interface</b> on a <b>Raspberry Pi</b> server with a <b>web interface</b> that simplifies <b>displaying</b>, <b>entering</b>, and <b>manipulating data</b>. Leveraging <b>web development</b> best practices, the project integrates <b>SQL</b> capabilities with a clear <b>user interface</b> and utilizes <b>MariaDB</b> for robust database management.",
            },
            voiceTranslator: {
              title: "Voice Translator",
              description:
                "Developed a voice translator <b>built in Python</b> that converts <b>speech to text</b> using <b>OpenAI Whisper</b> and <b>NumPy</b> for processing, translates the extracted text into Japanese via an <b>external API</b>, and synthesizes the translated text back into <b>speech</b> using advanced speech processing techniques.",
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
            title: "Get in Touch",
            description: "Have a project in mind, a role to fill, or just want to talk shop? Reach out whichever way suits you. I read both.",
            linkedinButton: "Message me on LinkedIn",
            emailButton: "Send an email",
            feedbackLead: "No message needed. Tap whatever fits, and thanks for stopping by.",
            feedbackHint: "Tap again to undo",
            reactions: {
              design: "Great design",
              animations: "Loved the animations",
              projects: "Impressive projects",
              collab: "Would work with you",
              bugs: "Found a bug",
              confusing: "A bit confusing"
            }
          },
        },
      },

      fr: {
        translation: {
          main: {
            role: "Étudiant en Génie Logiciel",
            footer: "Un portfolio construit par Amir Hammar",
          },

          hud: {
            invite: "Laissez un like si ça vous plaît ! 👀",
            thanks: "Merci pour l'étoile ! 🙏",
            protest1: "Trop tard, on ne reprend pas ! 😄",
            protest2: "Attendez, réfléchissez bien... 🥺",
            protest3: "Là je supplie. Vraiment. 😭",
            surrendered: "Bon. C'est retiré. Tout va bien. 💔",
            failed: "signal perdu"
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
                cpp: "C++",
                csharp: "C#",
                dotnet: ".NET",
                rust: "Rust",
                javascript: "JavaScript",
                typescript: "TypeScript",
                html: "HTML",
                css: "CSS",
                entityFramework: "Entity Framework",
                claudeCode: "Claude Code",
                githubCopilot: "GitHub Copilot",
                restfulApi: "APIs RESTful",
                apiIntegration: "Intégration d'API",
                objectOrientedProgramming: "Programmation Orientée Objet",
                cleanArchitecture: "Clean Architecture",
                microservices: "Microservices",
              },
            },
            frameworks: {
              title: "Frameworks et Bibliothèques",
              skills: {
                reactjs: "React.js",
                reactNative: "React Native",
                tkinter: "Tkinter",
                kafka: "Kafka",
                nodejs: "Node.js",
                expo: "Expo",
                jquery: "JQuery",
                nginx: "NGINX",
                krakend: "KrakenD",
              },
            },
            data: {
              title: "Données",
              skills: {
                etl: "ETL",
                json: "JSON",
                bigquery: "BigQuery",
                sqlQuery: "Requêtes SQL",
                nosql: "NoSQL",
                mysql: "MySQL",
                powerbi: "Power BI",
                postgresql: "PostgreSQL",
                mariadb: "MariaDB",
                redis: "Redis",
                apacheBeam: "Apache Beam",
                pandas: "Pandas",
                numpy: "NumPy",
                statisticalAnalysis: "Analyse Statistique",
              },
            },
            tools: {
              title: "Outils et Environnements de Développement",
              skills: {
                github: "GitHub",
                gitlab: "GitLab",
                jira: "Jira",
                docker: "Docker",
                kubernetes: "Kubernetes",
                gcp: "Google Cloud Platform",
                azure: "Azure",
                visualStudioCode: "Visual Studio Code",
                pycharm: "PyCharm",
                intellijIdea: "IntelliJ IDEA",
                ubuntu: "Ubuntu",
                windowsServer: "Windows Server",
                bash: "Bash",
                matlab: "Matlab",
                maven: "Maven",
              },
            },
            observability: {
              title: "Observabilité et Supervision",
              skills: {
                prometheus: "Prometheus",
                grafana: "Grafana",
                opentelemetry: "OpenTelemetry",
                tempo: "Tempo",
                loki: "Loki",
              },
            },
            testing: {
              title: "Tests",
              skills: {
                junit: "JUnit",
                xunit: "xUnit",
                mockito: "Mockito",
                k6: "k6",
              },
            },
          },

          career: {
            title: "Parcours Professionnel",
            stingray: {
              date: "Janv 2025 à Avril 2025",
              title: "Développeur Logiciel",
              company: "Stingray",
              city: "Montréal, QC, CA",
              tasks: {
                title: "Tâches",
                list: [
                  "Pipelines <b>ETL</b> sur <b>GCP</b> : <b>20+ Go</b> par jour via <b>Apache Beam</b>",
                  "<b>3 000+ lignes</b> de <b>Java</b> en production",
                  "<b>50M+ lignes</b> sur <b>30+ tables BigQuery</b>",
                  "<b>500+ lignes</b> de <b>Python</b> : analyse, validation, dépannage",
                  "<b>18+ tickets JIRA</b> livrés",
                  "<b>40+ tests unitaires</b> écrits",
                  "Qualité des données pour <b>10M+ utilisateurs</b>",
                  "Surveillance automatisée : <b>5 sources</b>, rapports <b>Teams</b> quotidiens"
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
              date: "Mai 2024 à Déc 2024",
              title: "Analyste de Données",
              company: "Services Partagés Canada",
              city: "Montréal, QC, CA",
              tasks: {
                title: "Tâches",
                list: [
                  "Outil <b>Python</b> + <b>customTkinter</b> pour <b>5 000+ lignes</b> de données courriel",
                  "<b>15+ processus récurrents</b> automatisés avec <b>Power Automate</b>",
                  "Migration Excel vers <b>SQL Azure</b> sur <b>10+ services</b>",
                  "<b>Power BI</b> : <b>5+ rapports</b> enrichis, <b>20+ visualisations</b>"
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
              date: "Jan 2023 à Août 2023",
              title: "Technicien R&D",
              company: "Matrox",
              city: "Montréal, QC, CA",
              tasks: {
                title: "Tâches",
                list: [
                  "<b>10+ fonctionnalités</b> dans un projet <b>C</b> existant",
                  "<b>15+ bogues</b> résolus",
                  "<b>VM Ubuntu</b> configurée depuis zéro",
                  "<b>50+ tests</b> du protocole HDMI à l'oscilloscope"
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
              date: "Juin 2022 à Août 2022",
              title: "Technicien Support Technique",
              company: "Addatech",
              city: "Laval, QC, CA",
              tasks: {
                title: "Tâches",
                list: [
                  "<b>30+ demandes</b> de support par courriel et téléphone",
                  "<b>10+ problèmes</b> résolus avec procédures écrites",
                  "<b>5+ utilisateurs</b> assistés en prise en main à distance",
                  "Installation et configuration logicielle pour <b>10+ utilisateurs</b>"
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
                "Développement d'un <b>assistant vocal</b> nommé <b>Aspire</b> (en cours de développement) pour le <b>contrôle d'ordinateur</b>. Il permet aux utilisateurs d'<b>ouvrir des applications</b>, de <b>naviguer sur le web</b> et de poser des questions à <b>ChatGPT</b>. Le projet utilise <b>OpenAI GPT 3</b> et <b>Python</b>, des <b>APIs</b> pour l'intégration, et la gestion de <b>fichiers audio</b>.",
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
            description: "Un projet en tête, un poste à pourvoir, ou simplement envie d'échanger ? Choisissez le canal qui vous convient, je lis les deux.",
            linkedinButton: "M'écrire sur LinkedIn",
            emailButton: "Envoyer un courriel",
            feedbackLead: "Pas besoin d'écrire. Cliquez ce qui vous parle, et merci du passage.",
            feedbackHint: "Cliquez à nouveau pour annuler",
            reactions: {
              design: "Beau design",
              animations: "Super animations",
              projects: "Projets impressionnants",
              collab: "Envie de collaborer",
              bugs: "J'ai trouvé un bug",
              confusing: "Un peu confus"
            }
          },

        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
