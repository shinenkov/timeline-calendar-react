# Timeline calendar react

Description: ...


### Installation

Add timeline-calendar-react to your project by executing
`npm install timeline-calendar-react` 

## Usage

```tsx
import Calendar from 'timeline-calendar-react';
// ....
type User = {
  id: number;
  name: string;
}

type RangeType = {
  id: number | string;
  startDate: string;
  endDate?: string;
  userId: number | string;
};

const exampleUsers = 

const App = () => {
  return (
    // ....
    <Calendar
      type={'timeline'} // 'month' | 'year' | 'timeline'
      users={users as User[]}
      ranges={ranges as RangeType[]}
    />
    // ....
  )
};

```


## Another props:

