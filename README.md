# Timeline Calendar React

![ScreenShot](https://i.postimg.cc/qqm4P6Ng/timeline.png)

![CI](https://github.com/shinenkov/timeline-calendar-react/actions/workflows/ci.yml/badge.svg)

`timeline-calendar-react` is a customizable React library for displaying timeline-based calendars. It supports features like user ranges, events, statuses, and more, with a flexible and responsive design.

---

## [Demo on vercel](https://timeline-calendar-react-demo.vercel.app/)

## Installation

Install the library using npm:

```bash
npm install timeline-calendar-react
```

[npm package](https://www.npmjs.com/package/timeline-calendar-react)

**Peer dependencies:** `react@^18 || ^19`, `react-dom@^18 || ^19`.

---

## Usage

Here is an example of how to use the `TimelineCalendar` component in your project:

```tsx
import TimelineCalendar from "timeline-calendar-react";
// ....
export const mockUsers = [
  { id: 1, name: "John Doe", department: "Sales" },
  { id: 2, name: "Jane Smith", department: undefined },
];

export const mockRanges = [
  {
    id: 1,
    userId: 1,
    eventType: 1,
    statusType: 1,
    startDate: "2025-04-01",
    endDate: "2025-04-05",
  },
  {
    id: 2,
    userId: 2,
    eventType: 2,
    statusType: 2,
    startDate: "2025-04-10",
    endDate: "2025-04-15",
  },
];

export const mockEvents = [
  { id: 1, label: "Vacation" },
  { id: 2, label: "Sick leave" },
];

export const mockStatuses = [
  { id: 1, label: "Approved" },
  { id: 2, label: "Pending" },
];

const App = () => {
  return (
    <TimelineCalendar
      ranges={mockRanges}
      users={mockUsers}
      events={mockEvents}
      statuses={mockStatuses}
    />
  );
};

export default App;
```

---

## Props

### `TimelineCalendarProps`

| Prop Name     | Type                       | Required | Default     | Description                                                 |
| ------------- | -------------------------- | -------- | ----------- | ----------------------------------------------------------- |
| `ranges`      | `RangeType[]`              | Yes      | -           | Array of ranges to display on the calendar.                 |
| `users`       | `User[]`                   | Yes      | -           | Array of users to display in the sidebar.                   |
| `departments` | `Department[]`             | No       | `undefined` | Array of departments to display under user names.           |
| `events`      | `EventType[] or string[]`  | No       | `undefined` | Array of events to display with custom labels and colors.   |
| `statuses`    | `StatusType[] or string[]` | No       | `undefined` | Array of statuses to display with custom labels and colors. |
| `options`     | `TimelineOptions`          | No       | `undefined` | render Options                                              |

---

### `TimelineOptions`

| Prop Name               | Type                           | Required | Default                                  | Description                                                           |
| ----------------------- | ------------------------------ | -------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `theme`                 | `"dark" or "light"`            | No       | `"light"`                                | Theme of the calendar.                                                |
| `cellSize`              | `string`                       | No       | undefined                                | Size of each calendar cell (e.g., `'40px'`). If undefined is Flexible |
| `accentColor`           | `string`                       | No       | `'#455a64'` (light) / `'#a7bac3'` (dark) | Accent color for buttons and highlights.                              |
| `sidebarWidth`          | `number`                       | No       | `200`                                    | Width of the sidebar in pixels.                                       |
| `lang`                  | `"en" or "ru"`                 | No       | `"en"`                                   | Language for the calendar (English or Russian).                       |
| `currentDate`           | `string (format "YYYY-MM-DD")` | No       | `today`                                  | Current date to display (e.g., `'2025-04-01'`).                       |
| `openedSidebar`         | `boolean`                      | No       | `true`                                   | Whether the sidebar is open by default.                               |
| `hideFilters`           | `boolean`                      | No       | `false`                                  | Whether to hide the filters section.                                  |
| `onCurrentDateChange`   | `(date: string) => void`       | No       | undefined                                | Called when the user navigates between months.                        |
| `onOpenedSidebarChange` | `(opened: boolean) => void`    | No       | undefined                                | Called when the user toggles the sidebar.                             |

---

## Controlled vs uncontrolled behavior

`currentDate` and `openedSidebar` work in two modes:

### Uncontrolled (default)

Don't pass the option — the library manages state internally and works out of the box:

```tsx
<TimelineCalendar users={mockUsers} ranges={mockRanges} />
```

### Fully controlled

Pass both the value and the change handler. The parent owns the state:

```tsx
const [date, setDate] = useState("2025-04-01");
const [sidebar, setSidebar] = useState(true);

<TimelineCalendar
  users={mockUsers}
  ranges={mockRanges}
  options={{
    currentDate: date,
    onCurrentDateChange: setDate,
    openedSidebar: sidebar,
    onOpenedSidebarChange: setSidebar,
  }}
/>;
```

### Partial control

Pass `currentDate` without `onCurrentDateChange` if you only want to seed an initial value — the library will still let the user navigate, but the parent will not be notified. This is valid but discouraged for two-way sync scenarios.

---

## Types

### `TimelineCalendarProps`

```typescript
type TimelineCalendarProps = {
  ranges: RangeType[];
  users: User[];
  // if specified, then displayed under the user name
  departments?: Department[];
  // if specified, then displayed instead of the base colors with the specified labels
  events?: EventType[] | string[];
  // if specified, then displayed instead of the base colors with the specified labels
  statuses?: StatusType[] | string[];
  options?: TimelineOptions;
};
```

### `RangeType`

```typescript
type RangeType = {
  id: number | string;
  startDate: string;
  endDate?: string;
  userId: number | string;
  eventType?: string | number;
  statusType?: string | number;
  comment?: string;
};
```

### `User`

```typescript
type User = {
  id: number;
  name: string;
  department?: string | number;
};
```

### `Department`

```typescript
type Department = {
  id: number;
  manager?: string;
  name: string;
};
```

### `EventType`

```typescript
type EventType = {
  id: number;
  label: string;
  // TODO: will appear in the future
  icon?: JSX.Element | string;
  color?: string;
};
```

### `StatusType`

```typescript
type StatusType = {
  id: number;
  label: string;
  // TODO: will appear in the future
  icon?: JSX.Element | string;
  color?: string;
};
```

### `TimelineOptions`

```typescript
type TimelineOptions = {
  theme?: Theme; // 'dark' | 'light' [default: 'light']
  cellSize?: string; // f.e. '40px' [default: flexible]
  lang?: Locale; // 'en' | 'ru' [default: 'en']
  accentColor?: string; // f.e. '#FF0000' [default: '#455a64' light / '#a7bac3' dark]
  sidebarWidth?: number; // f.e. 240 [default: 200]
  openedSidebar?: boolean; // true | false [default: true]
  currentDate?: string; // f.e. '2020-12-30' [default: today]
  hideFilters?: boolean; // true | false [default: false]
  onCurrentDateChange?: (date: string) => void;
  onOpenedSidebarChange?: (opened: boolean) => void;
};
```

---

## Features

- **Customizable Themes**: Choose between light and dark themes.
- **Event and Status Management**: Display events and statuses with custom labels and colors.
- **Responsive Design**: Adjust cell sizes and sidebar widths for different screen sizes.
- **Localization**: Supports English (`en`) and Russian (`ru`) languages.
- **Controlled or Uncontrolled**: Optionally control `currentDate` and `openedSidebar` from the outside, or let the library manage them internally.

---

## Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/shinenkov/timeline-calendar-react.git
cd timeline-calendar-react
npm install
```

### Scripts

| Command                 | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| `npm run dev`           | Run Vite dev server.                                                      |
| `npm run build`         | Build the library (`dist/` with `.es.js`, `.umd.js`, `.d.mts`, `.d.cts`). |
| `npm run typecheck`     | Run TypeScript checks.                                                    |
| `npm run lint`          | Run ESLint.                                                               |
| `npm run lint:fix`      | Auto-fix ESLint issues.                                                   |
| `npm run format`        | Format with Prettier.                                                     |
| `npm run test`          | Run Vitest once.                                                          |
| `npm run test:watch`    | Run Vitest in watch mode.                                                 |
| `npm run test:coverage` | Run tests with coverage report.                                           |

### Pre-commit hooks

The project uses **Husky** + **lint-staged**. On every commit, staged `.ts`/`.tsx` files are automatically linted and formatted. If ESLint finds non-fixable errors, the commit is blocked.

### CI

Every push and PR to `master` runs the full pipeline: **lint → typecheck → test with coverage → build**. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

### Local testing in another project

For local development against a consumer project, use [`yalc`](https://github.com/wclr/yalc):

```bash
# In the library
npm run build
yalc publish

# In the consumer
yalc add timeline-calendar-react
npm install

# After library changes
npm run build
yalc push
```

`yalc` avoids Windows symlink issues that `npm link` or `file:` dependencies often hit.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

Before submitting a PR:

1. `npm run lint` — must be clean.
2. `npm run typecheck` — must be clean.
3. `npm run test` — must be green.

---

## Support

If you encounter any issues, feel free to open an issue on the [GitHub repository](https://github.com/shinenkov/timeline-calendar-react).
