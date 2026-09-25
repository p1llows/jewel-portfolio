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
  SiGsap,
  SiFramer,
  SiWebgl,
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
} from "lucide-react";

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "w-4 h-4" }: TechIconProps) {
  const normalizedName = name.toLowerCase().trim();

  switch (normalizedName) {
    case "html":
    case "html5":
      return <SiHtml5 className={className} />;
    case "css":
    case "css3":
      return <SiCss className={className} />;
    case "javascript":
    case "js":
      return <SiJavascript className={className} />;
    case "react":
      return <SiReact className={className} />;
    case "vue":
    case "vue.js":
      return <SiVuedotjs className={className} />;
    case "next.js":
    case "nextjs":
      return <SiNextdotjs className={className} />;
    case "typescript":
    case "ts":
      return <SiTypescript className={className} />;
    case "tailwind css":
    case "tailwindcss":
      return <SiTailwindcss className={className} />;
    case "quasar":
      return <SiQuasar className={className} />;
    case "vite":
      return <SiVite className={className} />;
    case "node.js":
    case "nodejs":
      return <SiNodedotjs className={className} />;
    case "php":
      return <SiPhp className={className} />;
    case "laravel":
      return <SiLaravel className={className} />;
    case "express.js":
    case "express":
      return <SiExpress className={className} />;
    case "rest apis":
    case "rest api":
      return <Globe className={className} />;
    case "mysql":
      return <SiMysql className={className} />;
    case "postgresql":
    case "postgres":
      return <SiPostgresql className={className} />;
    case "mongodb":
      return <SiMongodb className={className} />;
    case "mariadb":
      return <SiMariadb className={className} />;
    case "git":
      return <SiGit className={className} />;
    case "github":
      return <SiGithub className={className} />;
    case "vs code":
    case "vscode":
      return <VscVscode className={className} />;
    case "figma":
      return <SiFigma className={className} />;
    case "docker":
      return <SiDocker className={className} />;
    case "ui/ux design":
    case "ui/ux":
      return <Layout className={className} />;
    case "wireframing":
      return <Frame className={className} />;
    case "prototyping":
      return <Layers className={className} />;
    case "responsive design":
      return <Monitor className={className} />;
    case "chart.js":
      return <SiChartdotjs className={className} />;
    case "local llm integration":
    case "llm":
      return <Cpu className={className} />;
    case "sql":
      return <Database className={className} />;
    case "basic python":
    case "python":
      return <SiPython className={className} />;
    case "redis":
      return <SiRedis className={className} />;
    case "lm studio":
      return <Bot className={className} />;
    case "ci/cd":
    case "cicd":
      return <Workflow className={className} />;
    case "vercel":
      return <SiVercel className={className} />;
    case "cloudflare pages":
    case "cloudflare":
      return <SiCloudflare className={className} />;
    case "supabase":
      return <SiSupabase className={className} />;
    case "firebase":
      return <SiFirebase className={className} />;
    case "netlify":
      return <SiNetlify className={className} />;
    case "github actions":
    case "github action":
      return <SiGithubactions className={className} />;
    case "aws s3":
    case "aws":
    case "s3":
      return <FaAws className={className} />;
    case "google workspace":
      return <SiGoogle className={className} />;
    case "google cloud":
    case "gcp":
      return <SiGooglecloud className={className} />;
    case "playwright":
      return <TestTube className={className} />;
    case "postman":
      return <SiPostman className={className} />;
    case "nestjs":
    case "nest.js":
      return <SiNestjs className={className} />;
    case "gitlab":
      return <SiGitlab className={className} />;
    case "shadcn":
    case "shadcn/ui":
    case "shadcn ui":
      return <SiShadcnui className={className} />;
    case "mui":
    case "material ui":
    case "material-ui":
      return <SiMui className={className} />;
    case "kubernetes":
    case "k8s":
      return <SiKubernetes className={className} />;
    case "npm":
      return <SiNpm className={className} />;
    case "nginx":
      return <SiNginx className={className} />;
    case "gsap":
      return <SiGsap className={className} />;
    case "framer motion":
    case "framer":
      return <SiFramer className={className} />;
    case "webgl":
      return <SiWebgl className={className} />;
    default:
      return <Code2 className={className} />;
  }
}

