# Timeline calendar react

Description: ...


### Installation

Add timeline-calendar-react to your project by executing
`npm install timeline-calendar-react` 

## Usage

```tsx
import TimelineCalendar from 'timeline-calendar-react';
// ....
type User = {
  id: number;
  name: string;
}

type RangeType = {
  id: number | string;
  startDate: string;
  endDate: string;
  userId: number | string;
};

export const mockUsers = [
  { id: 1, name: 'John Doe', department: 'Sales' },
  { id: 2, name: 'Jane Smith', department: undefined },
];

export const mockRanges = [
  {
    id: 1,
    userId: 1,
    eventType: 1,
    statusType: 1,
    startDate: '2025-04-01',
    endDate: '2025-04-05',
  },
  {
    id: 2,
    userId: 2,
    eventType: 2,
    statusType: 2,
    startDate: '2025-04-10',
    endDate: '2025-04-15',
  },
];

export const mockEvents = [
  { id: 1, label: 'Vacation' },
  { id: 2, label: 'Sick leave' },
];

export const mockStatuses = [
  { id: 1, label: 'Approved' },
  { id: 2, label: 'Pending' },
];


const App = () => {
  return (
    // ....
    <TimelineCalendar
      users={mockUsers as User[]}
      ranges={mockRanges as RangeType[]}
      // not required
      events={mockEvents}
      statuses={mockStatuses}
    />
    // ....
  )
};

```


### Another props:


```tsx
type User = {
  id: number;
  name: string;
  // if specified, then displayed under the user name
  department?: string | number;
};

type RangeType = {
  id: number | string;
  startDate: string;
  endDate: string;
  userId: number | string;
  eventType?: string | number;
  statusType?: string | number;
  // TODO: now not visible
  comment?: string;
};

type EventType = {
  id: number;
  label: string; 
  // TODO: now not visible
  icon?: JSX.Element | string;
  // background color of event in table
  color?: string;
};

type StatusType = {
  id: number;
  label: string;
  // TODO: now not visible
  icon?: JSX.Element | string;
  // background color of status in tooltip
  color?: string;
};

type Department = {
  id: number;
  manager: string;
  name: string;
};

type TimelineCalendarProps = {
  ranges: RangeType[];
  users: User[];
  // if specified, then displayed under the user name
  departments?: Department[];
  // if specified, then displayed instead of the base colors with the specified labels
  events?: EventType[] | string[];
  // if specified, then displayed instead of the base colors with the specified labels
  statuses?: StatusType[] | string[];
  theme?: Theme; // 'dark' | 'light'  [default: 'light']
  cellSize?: string; // f.e. '40px' [default: flexible]
  accentColor?: string; // '#FF0000' [default: '#a7bac3']
  sidebarWidth?: number; // 240 [default: 200]
  lang: Locale; // 'en' | 'ru' [default: 'en']
  currentDate?: string; // '2020-12-30' [default: today]
  openedSidebar: boolean; // true | false  [default: true]
};

```