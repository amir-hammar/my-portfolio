import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChartLine,
  faCubesStacked,
  faCode,
  faCubes,
  faDatabase,
  faDiagramProject,
  faGaugeHigh,
  faLayerGroup,
  faPlug,
  faPuzzlePiece,
  faRightLeft,
  faScrewdriverWrench,
  faSitemap,
  faTableColumns,
  faVial,
} from "@fortawesome/free-solid-svg-icons";

// Brand marks come from `devicon` rather than `simple-icons`: simple-icons has
// dropped Java, C#, VS Code, MATLAB, Azure and Windows over trademark policy,
// and those are six of the skills listed here. devicon carries all of them.
// Vite resolves these to URLs (devicon publishes no `exports` map, so deep
// paths are fine).
import azureLogo from "devicon/icons/azure/azure-original.svg";
import bashLogo from "devicon/icons/bash/bash-original.svg";
// Six marks that no icon set carries. Pulled from each project's own repo or
// the CNCF Landscape, at the user's request.
import beamLogo from "../assets/images/logos/tech/apache-beam.svg";
import krakendLogo from "../assets/images/logos/tech/krakend.svg";
import lokiLogo from "../assets/images/logos/tech/grafana-loki.svg";
import mockitoLogo from "../assets/images/logos/tech/mockito.png";
import tempoLogo from "../assets/images/logos/tech/grafana-tempo.svg";
import xunitLogo from "../assets/images/logos/tech/xunit.png";
import bigqueryLogo from "devicon/icons/googlecloud/googlecloud-original.svg";
import cppLogo from "devicon/icons/cplusplus/cplusplus-original.svg";
import csharpLogo from "devicon/icons/csharp/csharp-original.svg";
import cssLogo from "devicon/icons/css3/css3-original.svg";
import dockerLogo from "devicon/icons/docker/docker-original.svg";
import efLogo from "devicon/icons/entityframeworkcore/entityframeworkcore-original.svg";
import dotnetLogo from "devicon/icons/dotnetcore/dotnetcore-original.svg";
import gcpLogo from "devicon/icons/googlecloud/googlecloud-original.svg";
import githubLogo from "devicon/icons/github/github-original.svg";
import gitlabLogo from "devicon/icons/gitlab/gitlab-original.svg";
import grafanaLogo from "devicon/icons/grafana/grafana-original.svg";
import htmlLogo from "devicon/icons/html5/html5-original.svg";
import intellijLogo from "devicon/icons/intellij/intellij-original.svg";
import jiraLogo from "devicon/icons/jira/jira-original.svg";
import javaLogo from "devicon/icons/java/java-original.svg";
import javascriptLogo from "devicon/icons/javascript/javascript-original.svg";
import jqueryLogo from "devicon/icons/jquery/jquery-original.svg";
import jsonLogo from "devicon/icons/json/json-original.svg";
import junitLogo from "devicon/icons/junit/junit-original.svg";
import k6Logo from "devicon/icons/k6/k6-original.svg";
import kafkaLogo from "devicon/icons/apachekafka/apachekafka-original.svg";
import kubernetesLogo from "devicon/icons/kubernetes/kubernetes-original.svg";
import mariadbLogo from "devicon/icons/mariadb/mariadb-original.svg";
import matlabLogo from "devicon/icons/matlab/matlab-original.svg";
import mavenLogo from "devicon/icons/maven/maven-original.svg";
import mysqlLogo from "devicon/icons/mysql/mysql-original.svg";
// Power BI isn't in devicon either (same Microsoft trademark story as Azure and
// Windows). Taken from Microsoft's own PowerBI-Icons repo.
import powerbiLogo from "../assets/images/logos/tech/powerbi.svg";
import nginxLogo from "devicon/icons/nginx/nginx-original.svg";
import nodejsLogo from "devicon/icons/nodejs/nodejs-original.svg";
import numpyLogo from "devicon/icons/numpy/numpy-original.svg";
import opentelemetryLogo from "devicon/icons/opentelemetry/opentelemetry-original.svg";
import pandasLogo from "devicon/icons/pandas/pandas-original.svg";
import postgresqlLogo from "devicon/icons/postgresql/postgresql-original.svg";
import prometheusLogo from "devicon/icons/prometheus/prometheus-original.svg";
import pycharmLogo from "devicon/icons/pycharm/pycharm-original.svg";
import pythonLogo from "devicon/icons/python/python-original.svg";
import reactLogo from "devicon/icons/react/react-original.svg";
// devicon ships a dedicated React Native file, though it is the same atom as
// React's - the two products share a mark, so the tiles look alike by design.
import reactNativeLogo from "devicon/icons/reactnative/reactnative-original.svg";
import redisLogo from "devicon/icons/redis/redis-original.svg";
import rustLogo from "devicon/icons/rust/rust-original.svg";
import typescriptLogo from "devicon/icons/typescript/typescript-original.svg";
import ubuntuLogo from "devicon/icons/ubuntu/ubuntu-original.svg";
import vscodeLogo from "devicon/icons/vscode/vscode-original.svg";
import windowsLogo from "devicon/icons/windows11/windows11-original.svg";

/**
 * A skill is drawn one of three ways, never more than one:
 *
 *  - `logo`  a real brand mark from devicon.
 *  - `glyph` a FontAwesome icon, for entries that are concepts rather than
 *            products (ETL, NoSQL, OOP...) and so have no logo to show.
 *  - `mark`  a typographic monogram, for real products whose logo simply is
 *            not carried by any icon set. devicon, gilbarbara/logos,
 *            simple-icons, vscode-icons and skill-icons were all checked -
 *            roughly 8,000 icons - and none of them ship Apache Beam, Grafana
 *            Tempo, Grafana Loki, xUnit, Mockito, KrakenD or Tkinter. A
 *            monogram is honest about being a stand-in, where a generic glyph
 *            said nothing and a hand-drawn imitation would be worse.
 */
export type Skill =
  | {
      key: string;
      logo: string;
      /** Wordmark rather than a square mark: needs a wider box to stay legible. */
      wide?: boolean;
      /** Logo is a single dark colour, so the hover colour-reveal has nothing
       *  to reveal - it would just vanish against the panel. Measured: xUnit is
       *  86% dark pixels, mean luminance 35. Render the white knockout only. */
      monochrome?: boolean;
      glyph?: never;
      mark?: never;
    }
  | { key: string; glyph: IconDefinition; logo?: never; mark?: never; wide?: never; monochrome?: never }
  | { key: string; mark: string; logo?: never; glyph?: never; wide?: never; monochrome?: never };

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
      { key: "cpp", logo: cppLogo },
      { key: "csharp", logo: csharpLogo },
      { key: "dotnet", logo: dotnetLogo },
      { key: "rust", logo: rustLogo },
      { key: "javascript", logo: javascriptLogo },
      { key: "typescript", logo: typescriptLogo },
      { key: "html", logo: htmlLogo },
      { key: "css", logo: cssLogo },
      { key: "entityFramework", logo: efLogo },
      { key: "restfulApi", glyph: faRightLeft },
      { key: "apiIntegration", glyph: faPlug },
      { key: "objectOrientedProgramming", glyph: faCubes },
      { key: "cleanArchitecture", glyph: faCubesStacked },
      { key: "microservices", glyph: faSitemap },
    ],
  },
  {
    id: "data",
    icon: faDatabase,
    skills: [
      { key: "etl", glyph: faDiagramProject },
      { key: "apacheBeam", logo: beamLogo },
      // devicon has no standalone BigQuery mark; it ships under Google Cloud.
      { key: "bigquery", logo: bigqueryLogo },
      { key: "pandas", logo: pandasLogo },
      { key: "numpy", logo: numpyLogo },
      { key: "redis", logo: redisLogo },
      { key: "postgresql", logo: postgresqlLogo },
      { key: "mysql", logo: mysqlLogo },
      { key: "powerbi", logo: powerbiLogo },
      { key: "mariadb", logo: mariadbLogo },
      { key: "json", logo: jsonLogo },
      { key: "nosql", glyph: faLayerGroup },
      { key: "sqlQuery", glyph: faTableColumns },
      { key: "statisticalAnalysis", glyph: faChartLine },
    ],
  },
  {
    id: "frameworks",
    icon: faPuzzlePiece,
    skills: [
      { key: "reactjs", logo: reactLogo },
      { key: "reactNative", logo: reactNativeLogo },
      { key: "nodejs", logo: nodejsLogo },
      { key: "kafka", logo: kafkaLogo },
      { key: "nginx", logo: nginxLogo },
      { key: "krakend", logo: krakendLogo },
      // Tkinter is a Python stdlib module and has no logo of its own.
      { key: "tkinter", mark: "Tk" },
      { key: "jquery", logo: jqueryLogo },
    ],
  },
  {
    id: "observability",
    icon: faGaugeHigh,
    skills: [
      { key: "prometheus", logo: prometheusLogo },
      { key: "grafana", logo: grafanaLogo },
      { key: "opentelemetry", logo: opentelemetryLogo },
      // Tempo and Loki are Grafana Labs products without their own devicon
      // marks, so they get glyphs matching what they actually do: traces
      { key: "tempo", logo: tempoLogo, wide: true },
      { key: "loki", logo: lokiLogo, wide: true },
    ],
  },
  {
    id: "testing",
    icon: faVial,
    skills: [
      { key: "junit", logo: junitLogo },
      // xUnit has no devicon mark; a test glyph stands in.
      { key: "xunit", logo: xunitLogo, monochrome: true },
      // Mockito has no devicon mark; theatre masks read as "test doubles".
      { key: "mockito", logo: mockitoLogo, wide: true },
      { key: "k6", logo: k6Logo },
    ],
  },
  {
    id: "tools",
    icon: faScrewdriverWrench,
    skills: [
      { key: "docker", logo: dockerLogo },
      { key: "gcp", logo: gcpLogo },
      { key: "azure", logo: azureLogo },
      { key: "kubernetes", logo: kubernetesLogo },
      { key: "github", logo: githubLogo },
      { key: "gitlab", logo: gitlabLogo },
      { key: "jira", logo: jiraLogo },
      { key: "visualStudioCode", logo: vscodeLogo },
      { key: "pycharm", logo: pycharmLogo },
      { key: "intellijIdea", logo: intellijLogo },
      { key: "ubuntu", logo: ubuntuLogo },
      { key: "windowsServer", logo: windowsLogo },
      { key: "bash", logo: bashLogo },
      { key: "matlab", logo: matlabLogo },
      { key: "maven", logo: mavenLogo },
    ],
  },
];
