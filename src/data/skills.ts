import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChartLine,
  faCode,
  faCubes,
  faDatabase,
  faDiagramProject,
  faPlug,
  faScrewdriverWrench,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";

// Brand marks come from `devicon` rather than `simple-icons`: simple-icons has
// dropped Java, C#, VS Code, MATLAB, Azure and Windows over trademark policy,
// and those are six of the skills listed here. devicon carries all of them.
// Vite resolves these to URLs (devicon publishes no `exports` map, so deep
// paths are fine).
import azureLogo from "devicon/icons/azure/azure-original.svg";
import bashLogo from "devicon/icons/bash/bash-original.svg";
import bigqueryLogo from "devicon/icons/googlecloud/googlecloud-original.svg";
import cLogo from "devicon/icons/c/c-original.svg";
import cppLogo from "devicon/icons/cplusplus/cplusplus-original.svg";
import csharpLogo from "devicon/icons/csharp/csharp-original.svg";
import cssLogo from "devicon/icons/css3/css3-original.svg";
import dockerLogo from "devicon/icons/docker/docker-original.svg";
import githubLogo from "devicon/icons/github/github-original.svg";
import htmlLogo from "devicon/icons/html5/html5-original.svg";
import intellijLogo from "devicon/icons/intellij/intellij-original.svg";
import javaLogo from "devicon/icons/java/java-original.svg";
import javascriptLogo from "devicon/icons/javascript/javascript-original.svg";
import jqueryLogo from "devicon/icons/jquery/jquery-original.svg";
import jsonLogo from "devicon/icons/json/json-original.svg";
import mariadbLogo from "devicon/icons/mariadb/mariadb-original.svg";
import matlabLogo from "devicon/icons/matlab/matlab-original.svg";
import mavenLogo from "devicon/icons/maven/maven-original.svg";
import mysqlLogo from "devicon/icons/mysql/mysql-original.svg";
import nodejsLogo from "devicon/icons/nodejs/nodejs-original.svg";
import numpyLogo from "devicon/icons/numpy/numpy-original.svg";
import pandasLogo from "devicon/icons/pandas/pandas-original.svg";
import postgresqlLogo from "devicon/icons/postgresql/postgresql-original.svg";
import pycharmLogo from "devicon/icons/pycharm/pycharm-original.svg";
import pythonLogo from "devicon/icons/python/python-original.svg";
import reactLogo from "devicon/icons/react/react-original.svg";
import typescriptLogo from "devicon/icons/typescript/typescript-original.svg";
import ubuntuLogo from "devicon/icons/ubuntu/ubuntu-original.svg";
import vscodeLogo from "devicon/icons/vscode/vscode-original.svg";
import windowsLogo from "devicon/icons/windows11/windows11-original.svg";

/**
 * A skill is drawn either from a real brand mark (`logo`) or, for the handful
 * of entries that are concepts rather than products, a FontAwesome glyph
 * (`glyph`). Never both.
 */
export type Skill =
  | { key: string; logo: string; glyph?: never }
  | { key: string; glyph: IconDefinition; logo?: never };

export type SkillCategory = {
  /** i18n key under `expertise.*` */
  id: string;
  icon: IconDefinition;
  skills: Skill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming",
    icon: faCode,
    skills: [
      { key: "python", logo: pythonLogo },
      { key: "java", logo: javaLogo },
      { key: "c", logo: cLogo },
      { key: "cpp", logo: cppLogo },
      { key: "csharp", logo: csharpLogo },
      { key: "javascript", logo: javascriptLogo },
      { key: "typescript", logo: typescriptLogo },
      { key: "apiIntegration", glyph: faPlug },
      { key: "objectOrientedProgramming", glyph: faCubes },
    ],
  },
  {
    id: "data",
    icon: faDatabase,
    skills: [
      { key: "etl", glyph: faDiagramProject },
      { key: "json", logo: jsonLogo },
      // devicon has no standalone BigQuery mark; it ships under Google Cloud.
      { key: "bigquery", logo: bigqueryLogo },
      { key: "sqlQuery", glyph: faTableColumns },
      { key: "mysql", logo: mysqlLogo },
      { key: "postgresql", logo: postgresqlLogo },
      { key: "mariadb", logo: mariadbLogo },
      { key: "pandas", logo: pandasLogo },
      { key: "numpy", logo: numpyLogo },
      { key: "statisticalAnalysis", glyph: faChartLine },
    ],
  },
  {
    id: "webDevelopment",
    icon: faReact,
    skills: [
      { key: "reactjs", logo: reactLogo },
      { key: "nodejs", logo: nodejsLogo },
      { key: "html", logo: htmlLogo },
      { key: "css", logo: cssLogo },
      { key: "jquery", logo: jqueryLogo },
      { key: "maven", logo: mavenLogo },
    ],
  },
  {
    id: "tools",
    icon: faScrewdriverWrench,
    skills: [
      { key: "github", logo: githubLogo },
      { key: "docker", logo: dockerLogo },
      { key: "azure", logo: azureLogo },
      { key: "visualStudioCode", logo: vscodeLogo },
      { key: "pycharm", logo: pycharmLogo },
      { key: "intellijIdea", logo: intellijLogo },
      { key: "ubuntu", logo: ubuntuLogo },
      { key: "windowsServer", logo: windowsLogo },
      { key: "bash", logo: bashLogo },
      { key: "matlab", logo: matlabLogo },
    ],
  },
];
