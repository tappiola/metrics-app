import { Metric, User } from '@prisma/client';

export const METRICS: Metric[] = [
  {
    id: 'e1.1.1',
    type: 'NUMBER',
    description: 'Scope 1 Emissions (tCO2e)',
  },
  {
    id: 'e1.2.1',
    type: 'NUMBER',
    description: 'Scope 2 Emissions (tCO2e)',
  },
  {
    id: 'e1.3.1',
    type: 'NUMBER',
    description: 'Scope 3 Emissions (tCO2e)',
  },
  {
    id: 'e1.4.1',
    type: 'BOOLEAN',
    description: 'Net-Zero Target',
  },
  {
    id: 'e1.5.1',
    type: 'STRING',
    description: 'Primary emissions source',
  },
];

// Password for this user is NovataPass
export const NORMAL_USER_1: User = {
  uuid: 'c09713f3-5a2a-484d-9d3b-a3c74db70048',
  email: 'test@test.com',
  passwordHash: '$2a$10$E.L3BDn0jFp1WWYaY8z3fOT.1S66tjCJcesCXXIveohBEhmVi1.o2',
};

// Password for this user is LondonEye
export const NORMAL_USER_2: User = {
  uuid: 'b5faa046-44ae-49d2-8a2c-4441c58688ac',
  email: 'test2@test.com',
  passwordHash: '$2a$10$DhqI5vkKpK1b3.iSSK7SSucb834tjKgb8flpTkGGEaJIw/4HsK/QC',
};

// Password for this user is London2024
export const USER_WITHOUT_REPORTS: User = {
  uuid: '2136bb85-0ea5-4382-8484-aeb2449f43f0',
  email: 'test3@test.com',
  passwordHash: '$2a$10$XWNUNcAKdebxKmAuW8GrsOMV4oMtleFtTNDW1OiuHsHfT6h7xxfg2',
};
