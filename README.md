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

const exampleUsers = 

const App = () => {
  return (
    // ....
    <TimelineCalendar
      users={users as User[]}
      ranges={ranges as RangeType[]}
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