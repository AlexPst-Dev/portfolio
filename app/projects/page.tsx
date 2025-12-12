import Link from "next/link";
import ProjectCard from "@/app/components/ProjectCard";

// Example projects data - replace with your actual projects
const projects = [
  {
    title: "Hyperion Connect",
    description:
      "A full-stack sporting community app for the company Hyperion. Used to connect sportsmans with coachs, medics and partners and let them planify sessions and share informations",
    imageUrl: "/hyperion-connect-img.jpg",
    githubUrl: "https://github.com/AlexPst-Dev/hyperion-connect-frontend",
    liveUrl: "https://dev.app.hyperion-connect.com",
    tags: ["ReactNative", "Expo", "Express", "MySQL", "Figma"],
  },
  {
    title: "TimeIt",
    description:
      "WebApp entirely code with Antigravity IDE of Google. Used to set sporting activity timers",
    imageUrl: "/timeit-img.jpg",
    githubUrl: "https://github.com/AlexPst-Dev/TimeIt",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Antigravity"],
  },
];

export default function Projects() {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-2">My Projects</h1>
        <p className="text-gray-400">
          A collection of my recent work and side projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}
