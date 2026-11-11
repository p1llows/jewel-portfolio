"use client";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiQuasar,
  SiVite,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiMariadb,
  SiGit,
  SiGithub,
  SiFigma,
  SiDocker,
  SiChartdotjs,
  SiPython,
  SiRedis,
  SiVercel,
  SiCloudflare,
  SiSupabase,
  SiFirebase,
  SiNetlify,
  SiGithubactions,
  SiGoogle,
  SiGooglecloud,
  SiPostman,
  SiNestjs,
  SiGitlab,
  SiShadcnui,
  SiMui,
  SiKubernetes,
  SiNpm,
  SiNginx,
  SiGreensock,
  SiFramer,
  SiWebgl,
  SiLivewire,
  SiAlpinedotjs,
  SiTelegram,
  SiReactrouter,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaAws } from "react-icons/fa6";

import {
  Globe,
  Layout,
  Frame,
  Layers,
  Monitor,
  Cpu,
  Database,
  Code2,
  Workflow,
  Bot,
  TestTube,
  Palette,
} from "lucide-react";

// Icons are decorative: the visible label or a wrapper provides the accessible name.
const ICON_A11Y = { "aria-hidden": true, role: "presentation" } as const;

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "w-4 h-4" }: TechIconProps) {
  const normalizedName = name.toLowerCase().trim();

  switch (normalizedName) {
    case "html":
    case "html5":
      return <SiHtml5 className={className} {...ICON_A11Y} />;
    case "css":
    case "css3":
      return <SiCss className={className} {...ICON_A11Y} />;
    case "javascript":
    case "js":
      return <SiJavascript className={className} {...ICON_A11Y} />;
    case "react":
      return <SiReact className={className} {...ICON_A11Y} />;
    case "vue":
    case "vue.js":
      return <SiVuedotjs className={className} {...ICON_A11Y} />;
    case "next.js":
    case "nextjs":
      return <SiNextdotjs className={className} {...ICON_A11Y} />;
    case "typescript":
    case "ts":
      return <SiTypescript className={className} {...ICON_A11Y} />;
    case "tailwind css":
    case "tailwindcss":
      return <SiTailwindcss className={className} {...ICON_A11Y} />;
    case "quasar":
      return <SiQuasar className={className} {...ICON_A11Y} />;
    case "vite":
      return <SiVite className={className} {...ICON_A11Y} />;
    case "node.js":
    case "nodejs":
      return <SiNodedotjs className={className} {...ICON_A11Y} />;
    case "php":
      return <SiPhp className={className} {...ICON_A11Y} />;
    case "laravel":
      return <SiLaravel className={className} {...ICON_A11Y} />;
    case "express.js":
    case "express":
      return <SiExpress className={className} {...ICON_A11Y} />;
    case "rest apis":
    case "rest api":
      return <Globe className={className} {...ICON_A11Y} />;
    case "mysql":
      return <SiMysql className={className} {...ICON_A11Y} />;
    case "postgresql":
    case "postgres":
      return <SiPostgresql className={className} {...ICON_A11Y} />;
    case "mongodb":
      return <SiMongodb className={className} {...ICON_A11Y} />;
    case "mariadb":
      return <SiMariadb className={className} {...ICON_A11Y} />;
    case "git":
      return <SiGit className={className} {...ICON_A11Y} />;
    case "github":
      return <SiGithub className={className} {...ICON_A11Y} />;
    case "vs code":
    case "vscode":
      return <VscVscode className={className} {...ICON_A11Y} />;
    case "figma":
      return <SiFigma className={className} {...ICON_A11Y} />;
    case "docker":
      return <SiDocker className={className} {...ICON_A11Y} />;
    case "ui/ux design":
    case "ui/ux":
      return <Layout className={className} {...ICON_A11Y} />;
    case "wireframing":
      return <Frame className={className} {...ICON_A11Y} />;
    case "prototyping":
      return <Layers className={className} {...ICON_A11Y} />;
    case "responsive design":
      return <Monitor className={className} {...ICON_A11Y} />;
    case "chart.js":
      return <SiChartdotjs className={className} {...ICON_A11Y} />;
    case "local llm integration":
    case "llm":
      return <Cpu className={className} {...ICON_A11Y} />;
    case "sql":
      return <Database className={className} {...ICON_A11Y} />;
    case "basic python":
    case "python":
      return <SiPython className={className} {...ICON_A11Y} />;
    case "redis":
      return <SiRedis className={className} {...ICON_A11Y} />;
    case "lm studio":
      return <Bot className={className} {...ICON_A11Y} />;
    case "ci/cd":
    case "cicd":
      return <Workflow className={className} {...ICON_A11Y} />;
    case "vercel":
      return <SiVercel className={className} {...ICON_A11Y} />;
    case "cloudflare pages":
    case "cloudflare":
      return <SiCloudflare className={className} {...ICON_A11Y} />;
    case "supabase":
      return <SiSupabase className={className} {...ICON_A11Y} />;
    case "firebase":
      return <SiFirebase className={className} {...ICON_A11Y} />;
    case "netlify":
      return <SiNetlify className={className} {...ICON_A11Y} />;
    case "github actions":
    case "github action":
      return <SiGithubactions className={className} {...ICON_A11Y} />;
    case "aws s3":
    case "aws":
    case "s3":
      return <FaAws className={className} {...ICON_A11Y} />;
    case "google workspace":
      return <SiGoogle className={className} {...ICON_A11Y} />;
    case "google cloud":
    case "gcp":
      return <SiGooglecloud className={className} {...ICON_A11Y} />;
    case "playwright":
      return <TestTube className={className} {...ICON_A11Y} />;
    case "postman":
      return <SiPostman className={className} {...ICON_A11Y} />;
    case "nestjs":
    case "nest.js":
      return <SiNestjs className={className} {...ICON_A11Y} />;
    case "gitlab":
      return <SiGitlab className={className} {...ICON_A11Y} />;
    case "shadcn":
    case "shadcn/ui":
    case "shadcn ui":
      return <SiShadcnui className={className} {...ICON_A11Y} />;
    case "mui":
    case "material ui":
    case "material-ui":
      return <SiMui className={className} {...ICON_A11Y} />;
    case "kubernetes":
    case "k8s":
      return <SiKubernetes className={className} {...ICON_A11Y} />;
    case "npm":
      return <SiNpm className={className} {...ICON_A11Y} />;
    case "nginx":
      return <SiNginx className={className} {...ICON_A11Y} />;
    case "gsap":
    case "greensock":
      return <SiGreensock className={className} {...ICON_A11Y} />;
    case "framer motion":
    case "framer":
      return <SiFramer className={className} {...ICON_A11Y} />;
    case "webgl":
      return <SiWebgl className={className} {...ICON_A11Y} />;
    case "livewire":
      return <SiLivewire className={className} {...ICON_A11Y} />;
    case "alpine.js":
    case "alpine":
    case "alpinejs":
      return <SiAlpinedotjs className={className} {...ICON_A11Y} />;
    case "telegram":
      return <SiTelegram className={className} {...ICON_A11Y} />;
    case "react router":
    case "react-router":
      return <SiReactrouter className={className} {...ICON_A11Y} />;
    case "canvas api":
    case "canvas":
      return <Palette className={className} {...ICON_A11Y} />;
    case "filament":
      return <Layers className={className} {...ICON_A11Y} />;
    default:
      return <Code2 className={className} {...ICON_A11Y} />;
  }
}

