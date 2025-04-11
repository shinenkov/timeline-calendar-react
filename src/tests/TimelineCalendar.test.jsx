import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import TimelineCalendar from "../TimelineCalendar";
import { mockUsers, mockRanges, mockEvents, mockStatuses } from "./mockData";

describe("TimelineCalendar", () => {
  const defaultProps = {
    users: mockUsers,
    ranges: mockRanges,
    events: mockEvents,
    statuses: mockStatuses,
    openedSidebar: true,
    theme: "light",
    lang: "en",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders without crashing", () => {
    render(<TimelineCalendar {...defaultProps} />);
    expect(screen.getByTestId("timeline-calendar")).toBeInTheDocument();
    const ranges = screen.getAllByTestId("range-item");
    expect(ranges.length).toBe(mockRanges.length);
  });

  //TODO: add test to check default props

  it("renders with custom props", () => {
    const props = {
      theme: "dark",
      cellSize: "20px",
      lang: "ru",
      accentColor: "#333",
      sidebarWidth: 300,
      currentDate: "2023-10-22",
    };
    const currentProps = {
      ...defaultProps,
      ...props,
    };
    render(<TimelineCalendar {...defaultProps} {...props} />);

    const sidebarHead = screen.getByTestId("sidebar-head");
    expect(sidebarHead.style.backgroundColor).toBe("rgb(30, 33, 35)"); // dark

    const dayContainer = screen.getAllByTestId("day-container");
    expect(dayContainer[0].style._values[dayContainer[0].style[0]]).toBe(
      "20px",
    ); // cellSize

    expect(screen.getByText("Текущий месяц")).toBeInTheDocument(); // lang

    const nextMonthButton = screen.getByTestId("next-button");
    expect(nextMonthButton.style.backgroundColor).toBe("rgb(51, 51, 51)"); // accentColor

    const sidebarWrapper = screen.getByTestId("sidebar-wrapper");
    expect(sidebarWrapper.style._values[sidebarWrapper.style[0]]).toBe("300px"); // sidebarWidth

    expect(screen.getByText("октябрь 2023")).toBeInTheDocument(); // currentDate
  });

  it("shows loading state when changing date", async () => {
    render(<TimelineCalendar {...defaultProps} />);

    const nextMonthButton = screen.getByTestId("next-button");
    act(() => {
      fireEvent.click(nextMonthButton);
    });
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    }, 600);
  });

  it("filters data based on search term", async () => {
    render(<TimelineCalendar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search");
    await act(() => {
      userEvent.type(searchInput, "John");
    });
    waitFor(() => {
      const filteredUsers = screen.getAllByTestId("user-item");
      expect(filteredUsers.length).toBeLessThan(mockUsers.length);
    });
  });

  it("toggles sidebar when clicking toggle button", () => {
    render(<TimelineCalendar {...defaultProps} />);

    const toggleButton = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggleButton);

    expect(screen.getByTestId("sidebar")).toHaveClass("closed");
  });

  it("updates current date when selecting different month", () => {
    render(<TimelineCalendar {...defaultProps} />);

    const nextMonthButton = screen.getByTestId("next-button");
    act(() => {
      fireEvent.click(nextMonthButton);
    });

    const currentMonth = dayjs().add(1, "month").format("MMMM YYYY");
    expect(screen.getByText(currentMonth)).toBeInTheDocument();
  });

  it("handles event selection", async () => {
    render(<TimelineCalendar {...defaultProps} />);
    const eventSelect = screen.getByTestId("event-select");
    await act(() => {
      fireEvent.click(eventSelect);
    });
    const eventOption = screen.getAllByText(mockEvents[0].label);
    await act(() => {
      fireEvent.click(eventOption[0]);
    });

    const filteredRanges = screen.getAllByTestId("range-item");
    expect(filteredRanges.length).toBeLessThan(mockRanges.length);
  });

  it("handles status selection", async () => {
    render(<TimelineCalendar {...defaultProps} />);
    const statusSelect = screen.getByTestId("status-select");
    act(() => {
      fireEvent.click(statusSelect);
    });
    const statusOption = screen.getAllByText(mockStatuses[0].label);
    act(() => {
      fireEvent.click(statusOption[0]);
    });

    const filteredRanges = screen.getAllByTestId("range-item");
    expect(filteredRanges.length).toBeLessThan(mockRanges.length);
  });

  it("check tooltip", async () => {
    render(<TimelineCalendar {...defaultProps} />);
    const rangeItem = screen.getAllByTestId("range-item")[0];
    userEvent.hover(rangeItem);

    waitFor(
      () => {
        const tooltipContent = screen.getByText(
          "status: " + mockStatuses[0].label,
        );
        expect(tooltipContent).toBeInTheDocument();
      },
      { timeout: 100 },
    );
  });
});
