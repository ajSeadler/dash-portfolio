import { Badge, Table } from 'flowbite-react';
import { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';

import projectData, { Project } from 'src/data/projectData';
import ProjectModal from 'src/components/ProjectModal';

const ProductRevenue = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="rounded-xl shadow-md bg-white dark:bg-darkgray pt-6 px-0 w-full">
        <div className="flex items-center gap-4 mb-8 px-6">
          <div className="bg-secondary text-gray-800 p-3 rounded-md">
            <Icon icon="solar:case-outline" height={24} />
          </div>
          <p className="text-lg font-semibold text-primary">Portfolio</p>
        </div>
        <SimpleBar className="max-h-[450px]">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-4">Project</Table.HeadCell>
                <Table.HeadCell className="hidden md:table-cell p-4">Progress</Table.HeadCell>
                <Table.HeadCell className="hidden md:table-cell p-4">Status</Table.HeadCell>
                <Table.HeadCell className="hidden md:table-cell p-4">Link</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border dark:divide-darkborder">
                {projectData.map((item, index) => (
                  <Table.Row
                    key={index}
                    className="text-sm sm:text-base cursor-pointer"
                    onClick={() => setSelectedProject(item)}
                  >
                    <Table.Cell className="whitespace-nowrap p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <img
                          src={item.img}
                          alt="Project"
                          className="h-12 w-12 sm:h-[60px] sm:w-[60px] rounded-md"
                        />
                        <div className="max-w-[12rem] sm:max-w-none">
                          <h6 className="font-medium">{item.name}</h6>
                          <p className="text-xs text-gray-500">{item.owner}</p>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell p-4">{item.process}</Table.Cell>
                    <Table.Cell className="hidden md:table-cell p-4">
                      <Badge className={`${item.statusBg} ${item.statusColor}`}>
                        {item.statusText}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell p-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="mdi:link-variant" height={20} />
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
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

export default ProductRevenue;
