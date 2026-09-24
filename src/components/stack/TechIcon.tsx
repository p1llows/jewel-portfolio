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
      return <SiHtml5 className={`${className} text-[#E34F26]`} />;
    case "css":
    case "css3":
      return <SiCss className={`${className} text-[#1572B6]`} />;
    case "javascript":
    case "js":
      return <SiJavascript className={`${className} text-[#F7DF1E]`} />;
    case "react":
      return <SiReact className={`${className} text-[#61DAFB]`} />;
    case "vue":
    case "vue.js":
      return <SiVuedotjs className={`${className} text-[#4FC08D]`} />;
    case "next.js":
    case "nextjs":
      return <SiNextdotjs className={`${className} text-foreground`} />;
    case "typescript":
    case "ts":
      return <SiTypescript className={`${className} text-[#3178C6]`} />;
    case "tailwind css":
    case "tailwindcss":
      return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
    case "quasar":
      return <SiQuasar className={`${className} text-[#1976D2]`} />;
    case "vite":
      return <SiVite className={`${className} text-[#646CFF]`} />;
    case "node.js":
    case "nodejs":
      return <SiNodedotjs className={`${className} text-[#339933]`} />;
    case "php":
      return <SiPhp className={`${className} text-[#777BB4]`} />;
    case "laravel":
      return <SiLaravel className={`${className} text-[#FF2D20]`} />;
    case "express.js":
    case "express":
      return <SiExpress className={`${className} text-foreground`} />;
    case "rest apis":
    case "rest api":
      return <Globe className={`${className} text-[#38BDF8]`} />;
    case "mysql":
      return <SiMysql className={`${className} text-[#4479A1]`} />;
    case "postgresql":
    case "postgres":
      return <SiPostgresql className={`${className} text-[#4169E1]`} />;
    case "mongodb":
      return <SiMongodb className={`${className} text-[#47A248]`} />;
    case "mariadb":
      return <SiMariadb className={`${className} text-[#003545]`} />;
    case "git":
      return <SiGit className={`${className} text-[#F05032]`} />;
    case "github":
      return <SiGithub className={`${className} text-foreground`} />;
    case "vs code":
    case "vscode":
      return <VscVscode className={`${className} text-[#007ACC]`} />;
    case "figma":
      return <SiFigma className={`${className} text-[#F24E1E]`} />;
    case "docker":
      return <SiDocker className={`${className} text-[#2496ED]`} />;
    case "ui/ux design":
    case "ui/ux":
      return <Layout className={`${className} text-[#A855F7]`} />;
    case "wireframing":
      return <Frame className={`${className} text-[#EC4899]`} />;
    case "prototyping":
      return <Layers className={`${className} text-[#6366F1]`} />;
    case "responsive design":
      return <Monitor className={`${className} text-[#10B981]`} />;
    case "chart.js":
      return <SiChartdotjs className={`${className} text-[#FF6384]`} />;
    case "local llm integration":
    case "llm":
      return <Cpu className={`${className} text-[#10B981]`} />;
    case "sql":
      return <Database className={`${className} text-[#F59E0B]`} />;
    case "basic python":
    case "python":
      return <SiPython className={`${className} text-[#3776AB]`} />;
    case "redis":
      return <SiRedis className={`${className} text-[#DC382D]`} />;
    case "lm studio":
      return <Bot className={`${className} text-[#A855F7]`} />;
    case "ci/cd":
    case "cicd":
      return <Workflow className={`${className} text-[#38BDF8]`} />;
    case "vercel":
      return <SiVercel className={`${className} text-foreground`} />;
    case "cloudflare pages":
    case "cloudflare":
      return <SiCloudflare className={`${className} text-[#F38020]`} />;
    case "supabase":
      return <SiSupabase className={`${className} text-[#3ECF8E]`} />;
    case "firebase":
      return <SiFirebase className={`${className} text-[#FFCA28]`} />;
    case "netlify":
      return <SiNetlify className={`${className} text-[#00C7B7]`} />;
    case "github actions":
    case "github action":
      return <SiGithubactions className={`${className} text-[#2088FF]`} />;
    case "aws s3":
    case "aws":
    case "s3":
      return <FaAws className={`${className} text-[#FF9900]`} />;
    case "google workspace":
      return <SiGoogle className={`${className} text-[#4285F4]`} />;
    case "google cloud":
    case "gcp":
      return <SiGooglecloud className={`${className} text-[#4285F4]`} />;
    case "playwright":
      return <TestTube className={`${className} text-[#45BA4B]`} />;
    case "postman":
      return <SiPostman className={`${className} text-[#FF6C37]`} />;
    case "nestjs":
    case "nest.js":
      return <SiNestjs className={`${className} text-[#E0234E]`} />;
    case "gitlab":
      return <SiGitlab className={`${className} text-[#FC6D26]`} />;
    case "shadcn":
    case "shadcn/ui":
    case "shadcn ui":
      return <SiShadcnui className={`${className} text-foreground`} />;
    case "mui":
    case "material ui":
    case "material-ui":
      return <SiMui className={`${className} text-[#007FFF]`} />;
    case "kubernetes":
    case "k8s":
      return <SiKubernetes className={`${className} text-[#326CE5]`} />;
    case "npm":
      return <SiNpm className={`${className} text-[#CB3837]`} />;
    case "nginx":
      return <SiNginx className={`${className} text-[#009639]`} />;
    case "gsap":
      return <SiGsap className={`${className} text-[#88CE02]`} />;
    case "framer motion":
    case "framer":
      return <SiFramer className={`${className} text-[#0055FF]`} />;
    case "webgl":
      return <SiWebgl className={`${className} text-[#990000]`} />;
    default:
      return <Code2 className={`${className} text-secondary`} />;
  }
}
