import fairyImage from '../assets/projects/fairy-nail-lash.webp';
import himalayaEventsImage from '../assets/projects/himalaya-events.webp';
import matrimonyImage from '../assets/projects/yash-matrimony.webp';
import travelImage from '../assets/projects/happy-travels.webp';
import mtiImage from '../assets/projects/mtieat.webp';
import ymImage from '../assets/projects/ym.webp';
import lpgImage from '../assets/projects/lpg.webp';
import svcetImage from '../assets/projects/svcet.webp';
import etcImage from '../assets/projects/etc.webp';
import adminpanel from '../assets/projects/adminpanel.webp';
import posImage from '../assets/projects/pos.webp';

export type Project = {
  title: string;
  category: string;
  description: string;
  contribution: string;
  image?: string;
  imageAlt?: string;
  links?: { label: string; href: string }[];
  tags: string[];
  visual: 'image' | 'pos' | 'dashboard' | 'education' | 'product';
  featured?: boolean;
  teamProject?: boolean;
  caseStudy?: {
    context: string;
    highlights: string[];
  };
};


export const projects: Project[] = [
  {
    title: 'Fairy of Nail & Lash',
    category: 'Service website',
    description:
      'A beauty studio website designed to introduce salon services, showcase the gallery and make appointment enquiries straightforward.',
    contribution:
      'Independently designed and developed the frontend, including responsive layouts, gallery interactions and a booking flow that directs enquiries to WhatsApp.',
    image: fairyImage,
    imageAlt: 'Fairy of Nail & Lash website homepage',
    links: [
      {
        label: 'Visit live website',
        href: 'https://beauty-studio-website-tau.vercel.app/',
      },
    ],
    tags: ['React', 'Tailwind CSS', 'Responsive UI'],
    visual: 'image',
    featured: true,
  },
  {
    title: 'PastryChef ERP',
    category: 'Retail POS · Desktop application',
    description:
      'An offline-first retail POS and ERP application supporting cashier operations and billing workflows across multiple outlets.',
    contribution:
      'Developed cashier frontend modules as part of the team, including barcode scanning, customer lookup, billing, discount distribution, tax calculations, payment handling, order cancellation, stock-controlled products and offline/online sync status handling.',
    image: posImage,
    imageAlt: 'Illustrative retail POS interface preview',
    tags: ['React', 'TypeScript', 'Electron', 'Offline-First', 'Team Project'],
    visual: 'pos',
    featured: true,
    teamProject: true,
    caseStudy: {
      context: 'PastryChef ERP is an offline-first retail POS/ERP used across multiple outlets. I developed cashier frontend modules as part of the product team; this case study focuses on those modules rather than claiming ownership of the full ERP.',
      highlights: [
        'Implemented cashier UI workflows for billing, barcode scanning, customer lookup, payment selection and order cancellation.',
        'Worked on discount distribution, tax calculations, product variants/add-ons and stock-aware product behavior.',
        'Handled frontend states for offline sales synchronization, including sync status and error feedback.',
        'The wider ERP was used across 3 outlets and handled approximately 100–200 transactions per day.',
      ],
    },
  },
  {
    title: 'ETC Mentors',
    category: 'Examination platform',
    description:
      'An examination management platform supporting student and college registration, exam scheduling, reporting and result management.',
    contribution:
      'Developed administration modules as part of the team, working on registration workflows, exam creation and scheduling, reporting, result management and role-based dashboards.',
    image: etcImage,
    imageAlt: 'Illustrative ETC Mentors examination platform preview',
    tags: ['React', 'Admin Workflows', 'REST APIs', 'Team Project'],
    teamProject: true,
    visual: 'dashboard',
    featured: true,
    caseStudy: {
      context: 'ETC Mentors is an examination management platform. I contributed to administration-side frontend workflows as part of the team.',
      highlights: [
        'Worked on student and college registration interfaces.',
        'Contributed to exam creation and scheduling workflows, reporting and results views.',
        'Worked with role-based dashboard UI and REST API-integrated examination data.',
      ],
    },
  },
  {
    title: 'SVCET',
    category: 'Educational website',
    description:
      'An educational website presenting information for students, prospective applicants and other visitors.',
    contribution:
      'Contributed to frontend development as part of the team, working on responsive content layouts and website interfaces.',
    image: svcetImage,
    imageAlt: 'SVCET educational institution website homepage',
    links: [
      {
        label: 'Visit website',
        href: 'https://svcetedu.org/',
      },
    ],
    tags: ['Education', 'Responsive UI', 'Team Project'],
    teamProject: true,
    visual: 'education',
  },
  {
    title: 'MTI',
    category: 'Educational website',
    description:
      'An educational institution website providing structured access to institutional information and resources.',
    contribution:
      'Contributed to frontend website development as part of the team, focusing on content presentation and responsive layouts.',
    image: mtiImage,
    imageAlt: 'MTI educational institution website homepage',
    links: [
      {
        label: 'Visit website',
        href: 'https://mtieat.org/',
      },
    ],
    tags: ['Education', 'Frontend Development', 'Team Project'],
    teamProject: true,
    visual: 'education',
  },
  {
    title: 'YMTS India',
    category: 'Product website',
    description:
      'A public-facing website presenting the company, its software offerings and business services.',
    contribution:
      'Contributed to frontend development as part of the team, helping build and maintain responsive website interfaces.',
    image: ymImage,
    imageAlt: 'YMTS India website homepage',
    links: [
      {
        label: 'Visit website',
        href: 'https://ymtsindia.com/',
      },
    ],
    tags: ['Frontend Development', 'Responsive UI', 'Team Project'],
    teamProject: true,
    visual: 'product',
  },
  {
    title: 'LPGSoft India',
    category: 'Product website',
    description:
      'A promotional website communicating the company’s software offerings and helping visitors explore its services.',
    contribution:
      'Contributed to frontend development as part of the team, working on public-facing website interfaces and responsive layouts.',
    image: lpgImage,
    imageAlt: 'LPGSoft India website homepage',
    links: [
      {
        label: 'Visit website',
        href: 'https://lpgsoftindia.com/',
      },
    ],
    tags: ['Frontend Development', 'Responsive UI', 'Team Project'],
    teamProject: true,
    visual: 'product',
  },
  {
    title: 'Himalaya Pool Resort',
    category: 'Hospitality website',
    description:
      'A resort website presenting hospitality offerings, café information and event-related details through a structured, visually engaging layout.',
    contribution:
      'Independently developed the static frontend for the client website, including its page layouts and responsive presentation.',
    image: himalayaEventsImage,
    imageAlt: 'Himalaya Pool Resort events page',
    tags: ['Frontend Development', 'Responsive Layout', 'Client Project'],
    visual: 'image',
    featured: true,
  },
  {
    title: 'Happy Travels',
    category: 'Travel website',
    description:
      'A travel agency website designed to introduce the business, present its services and help visitors explore the main offerings.',
    contribution:
      'Independently developed the static frontend, including the navigation, page layouts and image-led presentation.',
    image: travelImage,
    imageAlt: 'Happy Travels website homepage',
    tags: ['Frontend Development', 'Responsive UI', 'Client Project'],
    visual: 'image',
  },
  {
    title: 'YashMatrimony',
    category: 'Matrimony website',
    description:
      'A matrimony website featuring a wedding-inspired visual identity and interfaces for exploring member profiles.',
    contribution:
      'Contributed to frontend development as part of the team, working on website layouts and user-facing interface elements.',
    image: matrimonyImage,
    imageAlt: 'YashMatrimony profile page',
    tags: ['Frontend Development', 'UI Development', 'Team Project'],
    teamProject: true,
    visual: 'image',
  },
  // {
  //   title: 'VEMU',
  //   category: 'Educational website',
  //   description:
  //     'A college website organizing institutional information, resources and important visitor pathways.',
  //   contribution:
  //     'Contributed to frontend development as part of the team, helping implement and maintain website interfaces.',
  //   imageAlt: 'Illustrative placeholder for VEMU educational institution website',
  //   links: [
  //     {
  //       label: 'Visit website',
  //       href: 'http://vemu.org/',
  //     },
  //   ],
  //   tags: ['Education', 'Frontend Development', 'Team Project'],
  //   visual: 'education',
  //   teamProject: true,
  // },
  {
    title: 'Business admin panels',
    category: 'Admin interfaces',
    description:
      'Administrative interfaces supporting content management and operational workflows behind business and educational websites.',
    contribution:
      'Contributed to frontend development as part of the team, working on admin interfaces and content-management features for events, galleries, faculty information, forms and website updates.',
    image: adminpanel,
    imageAlt: 'Illustrative business admin panel interface',
    tags: ['Frontend Development', 'Forms', 'REST APIs', 'Team Project'],
    teamProject: true,
    visual: 'dashboard',
  },
];

