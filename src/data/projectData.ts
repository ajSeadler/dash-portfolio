// src/data/projectData.ts
import seshImage from 'src/assets/images/skate-social.png';
import okcsImage from 'src/assets/images/okcs.png';
import cImage from 'src/assets/images/C.png';
import cofImage from 'src/assets/images/cof-desk.png';

export interface Project {
  img: string;
  name: string;
  owner: string;
  process: string;
  statusColor: string;
  statusBg: string;
  statusText: string;
  link: string;
  description?: string; // Optional for modal details
}

const projectData: Project[] = [
  {
    img: seshImage,
    name: 'sesh.',
    owner: 'React Native | Express.js | Postgres',
    process: '100%',
    statusColor: 'text-success',
    statusBg: 'bg-lightsuccess',
    statusText: 'Demo Site',
    link: 'https://github.com/ajSeadler/sesh-app',
    description:
      'sesh. is a social platform designed for skateboarders to connect, share progress on tricks, and discover local skate spots. Users can engage with a dynamic Spot Hunt feature that provides information about nearby skate spots, promoting a sense of community and exploration.',
  },
  {
    img: okcsImage,
    name: 'OK Clean Skateparks',
    owner: 'React | Tailwind | Vite',
    process: '100%',
    statusColor: 'text-success',
    statusBg: 'bg-lightsuccess',
    statusText: 'Live Website',
    link: 'https://okcleanskateparks.org',
    description:
      'An initiative I founded to empower the local community in Oklahoma to maintain and preserve skateparks. We host regular events aimed at keeping skateparks clean and safe for all skaters. Users can subscribe to the newsletter to stay informed about upcoming events or details.',
  },
  {
    img: cofImage,
    name: 'Circle of Fifths Viewer',
    owner: 'React.js',
    process: '75%',
    statusColor: 'text-success',
    statusBg: 'bg-lightsuccess',
    statusText: 'Live Website',
    link: 'https://github.com/ajSeadler/circle-of-fifths',
    description: 'Interactive tool for musicians to explore keys and relationships.',
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
    description:
      'C# program that will generate a random secure password based off the users password length request.',
  },
];

export default projectData;
