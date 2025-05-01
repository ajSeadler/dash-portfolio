import { useState } from 'react';
import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';
import projectData, { Project } from 'src/data/projectData';
import ProjectModal from 'src/components/ProjectModal';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="bg-white dark:bg-darkgray rounded-xl shadow-md p-6 w-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-secondary text-gray-800 p-3 rounded-md">
            <Icon icon="solar:case-outline" height={24} />
          </div>
          <h2 className="text-lg font-semibold text-primary">Portfolio</h2>
        </div>

        <SimpleBar className="max-h-[600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projectData.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-darkgray border border-border dark:border-darkborder rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img src={project.img} alt={project.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary">{project.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{project.owner}</p>
                  <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>

                  <a
                    href={project.link}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-sm mt-3 hover:underline"
                  >
                    <Icon icon="mdi:link-variant" height={18} />
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </SimpleBar>
      </div>

      <ProjectModal
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
};

export default Portfolio;
