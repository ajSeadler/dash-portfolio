import { Badge, Table } from 'flowbite-react';
import seshImage from 'src/assets/images/skate-social.png';
import okcsImage from 'src/assets/images/okcs.png';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react/dist/iconify.js';

const ProductRevenue = () => {
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
      img: seshImage,
      name: 'Admin Panel',
      owner: 'Emily Johnson',
      process: '80%',
      statusColor: 'text-error',
      statusBg: 'bg-lighterror',
      statusText: 'Critical',
    },
  ];

  return (
    <div className="rounded-xl shadow-md bg-white dark:bg-darkgray pt-6 px-0 w-full">
      <div className="flex items-center gap-4 mb-8 px-6">
        <div className="bg-lightsuccess text-gray-800 p-3 rounded-md">
          <Icon icon="solar:case-outline" height={24} />
        </div>
        <p className="text-lg font-semibold text-dark">Portfolio</p>
      </div>
      <SimpleBar className="max-h-[450px]">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-4">Project</Table.HeadCell>
              <Table.HeadCell className="hidden md:table-cell p-4">Progress</Table.HeadCell>
              <Table.HeadCell className="hidden md:table-cell p-4">Priority</Table.HeadCell>
              <Table.HeadCell className="hidden md:table-cell p-4">Budget</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {projectData.map((item, index) => (
                <Table.Row key={index} className="text-sm sm:text-base">
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
                  <Table.Cell className="hidden md:table-cell p-4">
                    <p>{item.process}</p>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell p-4">
                    <Badge className={`${item.statusBg} ${item.statusColor}`}>
                      {item.statusText}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell p-4">
                    <h4>$5k</h4>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ProductRevenue;
