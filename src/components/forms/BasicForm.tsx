import { Icon } from '@iconify/react';
import { Card } from 'flowbite-react';

const careerData = [
  {
    role: 'Telecommunication Technician',
    company: 'SCC',
    duration: '2017 – 2019',
    description:
      'Installed and maintained voice and data cabling systems for business clients, ensuring reliable network infrastructure.',
    icon: 'solar:case-outline',
  },
  {
    role: 'Bookseller',
    company: 'Half Price Books',
    duration: '2020',
    description:
      'Assisted customers with product selection and maintained inventory organization in a fast-paced retail environment.',
    icon: 'solar:book-bold',
  },
  {
    role: 'Technical Support Specialist',
    company: 'Community Pathways, LLC',
    duration: '2021 – Present',
    description:
      'Provide daily IT support for internal systems, troubleshoot hardware/software issues, and maintain secure access for remote teams.',
    icon: 'solar:monitor-smartphone-outline',
  },
];

const BasicForm = () => {
  return (
    <div className="rounded-xl shadow-md bg-white dark:bg-darkgray p-6 w-full">
      <h5 className="text-xl font-semibold mb-6 text-dark">Career History</h5>
      <div className="flex flex-col gap-6">
        {careerData.map((job, index) => (
          <Card key={index} className="p-4 shadow-sm border border-border dark:border-darkborder">
            <div className="flex items-start gap-4">
              <div className="text-primary bg-primary/10 p-3 rounded-md">
                <Icon icon={job.icon} width={24} height={24} />
              </div>
              <div>
                <h6 className="font-semibold text-dark">{job.role}</h6>
                <p className="text-sm text-gray-500">
                  {job.company} • <span>{job.duration}</span>
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{job.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BasicForm;
