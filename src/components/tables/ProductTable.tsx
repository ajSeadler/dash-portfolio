import { Badge, Dropdown, Progress } from 'flowbite-react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from '@iconify/react';

import seshImage from '/src/assets/images/skate-social.png';
import okcsImage from '/src/assets/images/okcs.png';
import cImage from 'src/assets/images/C.png';

const projectData = [
  {
    img: seshImage,
    name: 'sesh.',
    owner: 'React Native | Express.js | Postgres',
    process: '100%',
    statusColor: 'text-success',
    statusBg: 'bg-lightsuccess',
    statusText: 'Complete',
  },
  {
    img: okcsImage,
    name: 'OK Clean Skateparks',
    owner: 'React | Tailwind | Vite',
    process: '100%',
    statusColor: 'text-success',
    statusBg: 'bg-lightsuccess',
    statusText: 'Complete',
  },
  {
    img: seshImage,
    name: 'Circle of Fifths Viewer',
    owner: 'React.js',
    process: '75%',
    statusColor: 'text-secondary',
    statusBg: 'bg-lightsecondary',
    statusText: 'In Progress',
  },
  {
    img: cImage,
    name: 'Password Generator',
    owner: 'C#',
    process: '100%',
    statusColor: 'text-success',
    statusBg: 'bg-lightsuccess',
    statusText: 'Finished Program',
    link: '#',
  },
];

const actionItems = [
  {
    icon: 'solar:link-circle-outline',
    label: 'View Project',
  },
  {
    icon: 'solar:pen-new-square-broken',
    label: 'Edit Details',
  },
  {
    icon: 'solar:trash-bin-minimalistic-outline',
    label: 'Delete',
  },
];

const ProductTable = () => {
  return (
    <section className="w-full px-4 py-10">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">My Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="relative group rounded-2xl bg-white dark:bg-darkgray shadow-sm transition hover:shadow-lg p-5 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={project.img}
                alt={project.name}
                className="w-16 h-16 rounded-md object-cover border border-gray-200"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-neutral-900">{project.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{project.owner}</p>
              </div>
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                    <HiOutlineDotsVertical size={20} />
                  </span>
                )}
              >
                {actionItems.map((action, i) => (
                  <Dropdown.Item key={i} className="flex gap-3 items-center">
                    <Icon icon={action.icon} height={18} />
                    <span>{action.label}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span className="text-neutral-800">{project.process}</span>
              </div>
              <Progress progress={parseInt(project.process)} size="sm" className="rounded-full" />
              <div className="mt-2">
                <Badge
                  color={project.statusBg}
                  className={`${project.statusColor} font-medium text-sm`}
                >
                  {project.statusText}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { ProductTable };
