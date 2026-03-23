import Link from "next/link";
import ProjectCard from "@/app/components/ProjectCard";

// Example projects data - replace with your actual projects
const projects = [
  {
    title: "Hyperion Connect",
    description:
      "Application mobile pour la communauté sportive de l'entreprise Hyperion. Utilisée pour connecter les sportifs avec les coachs, les médecins et les partenaires et permettre à ces derniers de planifier des sessions et de partager des informations",
    imageUrl: "/hyperion-connect-img.jpg",
    githubUrl: "https://github.com/AlexPst-Dev/hyperion-connect-frontend",
    liveUrl: "https://dev.app.hyperion-connect.com",
    tags: ["ReactNative", "Expo", "Express", "MySQL", "Figma"],
  },
  {
    title: "TimeIt",
    description:
      "Application web entièrement codée avec l'IDE Antigravity de Google. Utilisée pour définir les temps d'activité sportive",
    imageUrl: "/timeit-img.jpg",
    githubUrl: "https://github.com/AlexPst-Dev/TimeIt",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Antigravity"],
  },
];

export default function Projects() {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-2">Mes projets</h1>
        <p className="text-gray-400">
          Une collection de mes projets récents et de mes projets personnels
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
