import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  tags?: string[];
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  githubUrl,
  liveUrl,
  tags = [],
}: ProjectCardProps) {
  return (
    <article className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/50">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={`Capture d'ecran du projet ${title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiB2aWV3Qm94PSIwIDAgODAwIDQ1MCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiMyYTJhMmEiLz48L3N2Zz4="
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            aria-label={`Voir le code du projet ${title} sur GitHub`}
          >
            <FaGithub className="w-5 h-5" />
            <span>Code</span>
          </Link>

          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              aria-label={`Voir la demo en ligne du projet ${title}`}
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
