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
                c: "C",
                cpp: "C++",
                csharp: "C#",
                dotnet: ".NET",
                rust: "Rust",
                javascript: "JavaScript",
                typescript: "TypeScript",
                html: "HTML",
                css: "CSS",
              },
            },
            aiTools: {
              title: "AI Tools",
              skills: {
                claudeCode: "Claude Code",
                githubCopilot: "GitHub Copilot",
                cursor: "Cursor",
                replit: "Replit",
              },
            },
            concepts: {
              title: "Concepts",
              skills: {
                restfulApi: "RESTful APIs",
                apiIntegration: "API Integration",
                objectOrientedProgramming: "Object Oriented Programming",
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
                entityFramework: "Entity Framework",
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
            types: {
              freelance: "Startup Project",
              school: "School Project",
              involvement: "Club Involvement",
              personal: "Personal Project",
              professional: "Internship Project",
            },
            coeurSolidaire: {
              title: "CoeurSolidaire",
              date: "Jun 2026 – Present",
              description:
                "A platform for home care cooperatives, serving three kinds of user at once: coordinators who plan the visits, caregivers who carry them out on the road, and families who want to know how their relative is doing. Each role sees only what it should, enforced by the database itself rather than by the interface. It keeps working when the connection drops, which matters when caregivers spend the day moving between apartments.",
              roles: {
                dashboard: "Coordination",
                calendar: "Family",
                route: "Caregiver",
              },
              themeToggle: "Toggle app theme",
            },
            marketFlipper: {
              title: "Market Flipper",
              date: "Jul 2026 – Present",
              description:
                "A phone app that watches the second hand marketplaces so you do not have to. You save the searches you care about, and it keeps checking new listings across Craigslist, eBay, Kijiji and Facebook Marketplace, with more platforms planned. The matching runs on a schedule in the background, so an alert can reach you before you think to look.",
              wipBadge: "In development",
              wipEta: "Aiming for a store release in November 2026",
            },
            canBankX: {
              title: "CanBankX",
              date: "Winter 2026",
              description:
                "A banking web app built around real OAuth login, mandatory two factor setup, and identity verification before an account becomes active. Once approved, customers open chequing and savings accounts and send money to other users, all backed by independent services that keep balances consistent behind the scenes.",
              roles: {
                landing: "Landing",
                mfa: "MFA",
                home: "Home",
                accounts: "Accounts",
                transfer: "Transfer",
              },
            },
            digiclipse: {
              title: "DigiClipse",
              date: "Dec 2023",
              description:
                "A tool for a student engineering team that checks whether the electronic parts they plan to order can actually be bought. It reads the team's own part lists, queries the supplier, and reports back every day instead of someone looking each reference up by hand. It was built to survive messy spreadsheets, since dozens of people filled those lists in.",
            },
            arcade: {
              title: "Arcade",
              date: "Fall 2022",
              description:
                "An arcade machine built from nothing: the cabinet electronics, the controls, and the game running on them. The whole loop is custom, from reading the physical buttons through to the menus and the gameplay. It was as much an electronics project as a software one.",
            },
            portfolio: {
              title: "Portfolio Website",
              date: "2025 – Present",
              description:
                "The site you are on right now. It presents my background, skills and projects as one continuous scene rather than a set of separate pages, with the camera travelling through space as you scroll. Everything on it is available in both English and French.",
            },
            stingray: {
              title: "Data Pipeline Monitoring",
              date: "Jan 2025 – Apr 2025",
              description:
                "A set of automated pipelines that clean and validate data before it reaches a media company's analytics platforms, built during my time at Stingray. It processes tens of gigabytes a day across dozens of tables, catching inconsistencies before they spread downstream. A monitoring layer watches several data sources at once and reports pipeline health automatically, so problems get noticed before anyone has to go looking.",
              confidential: "Confidential",
              confidentialNote: "Built under NDA, so no screenshots to show here.",
            },
            dataUpdater: {
              title: "Data Updater Application",
              date: "Fall 2024",
              description:
                "An internal tool built during my time at Shared Services Canada, where keeping contact data current meant opening several spreadsheets and checking them against each other by hand. It pulls the relevant emails, verifies each entry, and writes the corrections back on its own. It replaced a recurring manual chore and stayed in use by the team.",
            },
            freeEats: {
              title: "FreeEaTS",
              date: "Oct 2024",
              description:
                "A tool for ÉTS students that keeps track of campus events handing out free food, so nobody has to check every club's page by hand. It scans for new listings and syncs the matches straight into a shared Google Calendar. It has no interface of its own, since the calendar is the whole point.",
              noInterface: "No interface",
            },
            aspire: {
              title: "Aspire",
              date: "Jun 2022",
              description:
                "A voice assistant for driving a computer by talking to it: opening applications, browsing the web, and answering questions out loud. It listens continuously, works out whether a phrase was meant for it, and acts only on the ones that were. Still an ongoing experiment rather than a finished product.",
            },
            database: {
              title: "Web Database Interface",
              date: "Winter 2023",
              description:
                "A small web interface running on a home server that makes a database usable by people who do not write queries. Records can be browsed, added and edited from any browser on the network. The exercise was putting a friendly surface over something that normally lives on a command line.",
            },
            voiceTranslator: {
              title: "Voice Translator",
              date: "Dec 2022",
              description:
                "A translator that works entirely by voice: you speak in one language and it answers out loud in another. It transcribes what it hears, translates the text, then synthesises the result back into speech. The goal was keeping the round trip quick enough to hold an actual conversation.",
            },
            classManagement: {
              title: "Class Management System",
              date: "Fall 2024",
              description:
                "A system for managing the academic side of a university course: the courses themselves, the students, and the schedules tying them together. It was a school project built for one of my classes.",
            },
          },

          contact: {
            title: "Get in Touch",
            description: "Got an internship, a project, or just want to say hi? Send me a message, I actually reply.",
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
                c: "C",
                cpp: "C++",
                csharp: "C#",
                dotnet: ".NET",
                rust: "Rust",
                javascript: "JavaScript",
                typescript: "TypeScript",
                html: "HTML",
                css: "CSS",
              },
            },
            aiTools: {
              title: "Outils IA",
              skills: {
                claudeCode: "Claude Code",
                githubCopilot: "GitHub Copilot",
                cursor: "Cursor",
                replit: "Replit",
              },
            },
            concepts: {
              title: "Concepts",
              skills: {
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
                entityFramework: "Entity Framework",
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
            types: {
              freelance: "Projet startup",
              school: "Projet scolaire",
              involvement: "Implication étudiante",
              personal: "Projet personnel",
              professional: "Projet de stage",
            },
            coeurSolidaire: {
              title: "CoeurSolidaire",
              date: "Juin 2026 – Présent",
              description:
                "Une plateforme pour les coopératives de soins à domicile, pensée pour trois publics à la fois : les coordonnateurs qui planifient les visites, les intervenants qui les réalisent sur la route, et les familles qui veulent savoir comment va leur proche. Chaque rôle ne voit que ce qui le concerne, une règle appliquée par la base de données elle-même et non par l'interface. L'application continue de fonctionner quand la connexion tombe, ce qui compte quand on passe la journée d'un appartement à l'autre.",
              roles: {
                dashboard: "Coordination",
                calendar: "Famille",
                route: "Intervenant",
              },
              themeToggle: "Changer le thème de l'application",
            },
            marketFlipper: {
              title: "Market Flipper",
              date: "Juil. 2026 – Présent",
              description:
                "Une application mobile qui surveille les marchés d'occasion à votre place. Vous enregistrez les recherches qui vous intéressent, et elle vérifie en continu les nouvelles annonces sur Craigslist, eBay, Kijiji et Facebook Marketplace, d'autres plateformes étant prévues. La mise en correspondance tourne en arrière-plan à intervalle régulier, si bien qu'une alerte peut vous parvenir avant même que vous pensiez à regarder.",
              wipBadge: "En développement",
              wipEta: "Sortie visée sur les stores en novembre 2026",
            },
            canBankX: {
              title: "CanBankX",
              date: "Hiver 2026",
              description:
                "Une application bancaire construite autour d'une vraie connexion OAuth, d'une double authentification obligatoire et d'une vérification d'identité avant qu'un compte ne devienne actif. Une fois approuvés, les clients ouvrent des comptes chèque et épargne et envoient de l'argent à d'autres utilisateurs, le tout appuyé par des services indépendants qui gardent les soldes cohérents en coulisses.",
              roles: {
                landing: "Accueil",
                mfa: "MFA",
                home: "Tableau de bord",
                accounts: "Comptes",
                transfer: "Virement",
              },
            },
            digiclipse: {
              title: "DigiClipse",
              date: "Déc. 2023",
              description:
                "Un outil pour une équipe étudiante en génie qui vérifie si les composants électroniques qu'elle compte commander sont réellement disponibles. Il lit les listes de pièces de l'équipe, interroge le fournisseur et rend son rapport chaque jour, au lieu qu'une personne cherche chaque référence à la main. Il a été conçu pour encaisser des tableurs désordonnés, puisque des dizaines de personnes les remplissaient.",
            },
            arcade: {
              title: "Arcade",
              date: "Automne 2022",
              description:
                "Une borne d'arcade construite à partir de rien : l'électronique du meuble, les contrôles et le jeu qui tourne dessus. Toute la boucle est faite maison, de la lecture des boutons physiques jusqu'aux menus et au jeu lui-même. C'était autant un projet d'électronique que de logiciel.",
            },
            portfolio: {
              title: "Site Portfolio",
              date: "2025 – Présent",
              description:
                "Le site sur lequel vous êtes. Il présente mon parcours, mes compétences et mes projets comme une seule scène continue plutôt qu'une suite de pages séparées, la caméra traversant l'espace au fil du défilement. Tout y est disponible en français et en anglais.",
            },
            stingray: {
              title: "Surveillance de pipelines de données",
              date: "Janv. 2025 – Avr. 2025",
              description:
                "Un ensemble de pipelines automatisés qui nettoient et valident les données avant qu'elles n'atteignent les plateformes d'analyse d'une entreprise médiatique, développés lors de mon passage chez Stingray. Ils traitent des dizaines de gigaoctets par jour répartis sur des dizaines de tables, en repérant les incohérences avant qu'elles ne se propagent en aval. Une couche de surveillance observe plusieurs sources de données à la fois et rapporte automatiquement l'état des pipelines, pour que les problèmes soient remarqués avant que quelqu'un ait à les chercher.",
              confidential: "Confidentiel",
              confidentialNote: "Développé sous NDA, donc aucune capture d'écran à montrer ici.",
            },
            dataUpdater: {
              title: "Application de Mise à Jour des Données",
              date: "Automne 2024",
              description:
                "Un outil interne développé lors de mon passage à Services partagés Canada, où maintenir les coordonnées à jour voulait dire ouvrir plusieurs tableurs et les recouper à la main. Il récupère les courriels concernés, vérifie chaque entrée et réécrit les corrections tout seul. Il a remplacé une corvée récurrente et est resté utilisé par l'équipe.",
            },
            freeEats: {
              title: "FreeEaTS",
              date: "Oct. 2024",
              description:
                "Un outil pour les étudiants de l'ÉTS qui repère les événements sur le campus offrant de la nourriture gratuite, pour éviter d'avoir à vérifier la page de chaque club à la main. Il détecte les nouvelles annonces et synchronise les correspondances directement dans un agenda Google Calendar partagé. Il n'a pas d'interface propre, puisque l'agenda est tout l'intérêt de la chose.",
              noInterface: "Aucune interface",
            },
            aspire: {
              title: "Aspire",
              date: "Juin 2022",
              description:
                "Un assistant vocal pour piloter un ordinateur en lui parlant : ouvrir des applications, naviguer sur le web et répondre à des questions à voix haute. Il écoute en continu, détermine si une phrase lui était adressée, et n'agit que sur celles qui le sont. Encore une expérimentation en cours plutôt qu'un produit fini.",
            },
            database: {
              title: "Interface de Base de Données Web",
              date: "Hiver 2023",
              description:
                "Une petite interface web hébergée sur un serveur maison qui rend une base de données utilisable par des gens qui n'écrivent pas de requêtes. Les enregistrements se consultent, s'ajoutent et se modifient depuis n'importe quel navigateur du réseau. L'exercice consistait à poser une surface accueillante sur ce qui vit normalement en ligne de commande.",
            },
            voiceTranslator: {
              title: "Traducteur Vocal",
              date: "Déc. 2022",
              description:
                "Un traducteur qui fonctionne entièrement à la voix : vous parlez dans une langue et il répond à voix haute dans une autre. Il transcrit ce qu'il entend, traduit le texte, puis synthétise le résultat en parole. L'objectif était de garder l'aller-retour assez rapide pour tenir une vraie conversation.",
            },
            classManagement: {
              title: "Système de Gestion de Classe",
              date: "Automne 2024",
              description:
                "Un système pour gérer le volet académique d'un cours universitaire : les cours eux-mêmes, les étudiants et les horaires qui les relient. C'était un projet scolaire réalisé pour un de mes cours.",
            },
          },

          contact: {
            title: "Me Contacter",
            description: "Un stage, un projet, ou juste envie de dire allo ? Écrivez-moi, je réponds vraiment.",
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
