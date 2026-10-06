import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TimelineCalendar from "app/index";
import { mockUsers, mockRanges, mockEvents, mockStatuses } from "./mockData";
import dayjs from "dayjs";

const CURRENT = "2025-04-01";

const requiredProps = {
  users: mockUsers,
  ranges: mockRanges,
};

const fullProps = {
  ...requiredProps,
  events: mockEvents,
  statuses: mockStatuses,
  options: { currentDate: CURRENT },
};

describe("TimelineCalendar", () => {
  describe("rendering", () => {
    it("renders with only the required props", () => {
      render(<TimelineCalendar {...requiredProps} />);
      expect(screen.getByTestId("timeline-calendar")).toBeInTheDocument();
    });

    it("renders ranges for the given month", () => {
      render(<TimelineCalendar {...fullProps} />);
      expect(screen.getAllByTestId("range-item")).toHaveLength(2);
    });

    it("does not render filters when hideFilters: true", () => {
      render(
        <TimelineCalendar
          {...requiredProps}
          options={{ currentDate: CURRENT, hideFilters: true }}
        />,
      );
      expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
      expect(screen.queryByTestId("search-input")).not.toBeInTheDocument();
    });

    it("renders filters by default", () => {
      render(<TimelineCalendar {...fullProps} />);
      expect(screen.getByTestId("next-button")).toBeInTheDocument();
      expect(screen.getByTestId("search-input")).toBeInTheDocument();
    });

    it("supports functional updates to currentDate via navigation", async () => {
      render(<TimelineCalendar {...fullProps} />);
      fireEvent.click(screen.getByTestId("next-button"));
      await waitFor(() => {
        expect(screen.getByText(/May 2025/i)).toBeInTheDocument();
      });
      fireEvent.click(screen.getByTestId("next-button"));
      await waitFor(() => {
        expect(screen.getByText(/June 2025/i)).toBeInTheDocument();
      });
    });
  });

  describe("sidebar", () => {
    it("renders opened by default and toggles to closed on click", () => {
      render(<TimelineCalendar {...fullProps} />);
      const sidebar = screen.getByTestId("sidebar");
      expect(sidebar.className).toContain("opened");

      fireEvent.click(screen.getByTestId("sidebar-toggle"));
      expect(sidebar.className).toContain("closed");
    });

    it("respects openedSidebar: false option", () => {
      render(
        <TimelineCalendar
          {...requiredProps}
          options={{ currentDate: CURRENT, openedSidebar: false }}
        />,
      );
      expect(screen.getByTestId("sidebar").className).toContain("closed");
    });

    it("calls onOpenedSidebarChange when the user toggles", () => {
      const handleChange = vi.fn();
      render(
        <TimelineCalendar
          {...requiredProps}
          options={{
            currentDate: CURRENT,
            onOpenedSidebarChange: handleChange,
          }}
        />,
      );
      fireEvent.click(screen.getByTestId("sidebar-toggle"));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe("month navigation", () => {
    it("shows loading when navigating to another month", async () => {
      render(<TimelineCalendar {...fullProps} />);
      fireEvent.click(screen.getByTestId("next-button"));
      expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

      await waitFor(
        () => {
          expect(
            screen.queryByTestId("loading-indicator"),
          ).not.toBeInTheDocument();
        },
        { timeout: 2000 },
      );
    });

    it("navigates forward to the next month", async () => {
      render(<TimelineCalendar {...fullProps} />);
      expect(screen.getByText(/April 2025/i)).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("next-button"));
      await waitFor(() => {
        expect(screen.getByText(/May 2025/i)).toBeInTheDocument();
      });
    });

    it("navigates backward to the previous month", async () => {
      render(<TimelineCalendar {...fullProps} />);
      fireEvent.click(screen.getByTestId("prev-button"));
      await waitFor(() => {
        expect(screen.getByText(/March 2025/i)).toBeInTheDocument();
      });
    });

    it("calls onCurrentDateChange when navigating", () => {
      const handleChange = vi.fn();
      render(
        <TimelineCalendar
          {...requiredProps}
          options={{
            currentDate: CURRENT,
            onCurrentDateChange: handleChange,
          }}
        />,
      );
      fireEvent.click(screen.getByTestId("next-button"));

      expect(handleChange).toHaveBeenCalledTimes(1);

      const received = handleChange.mock.calls[0][0];
      expect(dayjs(received).format("YYYY-MM")).toBe("2025-05");
    });

    it("does not fire onCurrentDateChange when current month is already selected", () => {
      const handleChange = vi.fn();
      const today = dayjs().toString();

      render(
        <TimelineCalendar
          {...requiredProps}
          options={{
            currentDate: today,
            onCurrentDateChange: handleChange,
          }}
        />,
      );

      fireEvent.click(screen.getByText(/current month/i));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("search", () => {
    it("filters users by name", async () => {
      render(<TimelineCalendar {...fullProps} />);
      expect(screen.getAllByTestId("user-item")).toHaveLength(3);

      fireEvent.change(screen.getByTestId("search-input"), {
        target: { value: "John" },
      });

      await waitFor(
        () => {
          const items = screen.getAllByTestId("user-item");
          expect(items).toHaveLength(1);
          expect(items[0]).toHaveTextContent("John Doe");
        },
        { timeout: 2000 },
      );
    });

    it("restores users when search is cleared", async () => {
      render(<TimelineCalendar {...fullProps} />);
      const input = screen.getByTestId("search-input");

      fireEvent.change(input, { target: { value: "John" } });
      await waitFor(() => {
        expect(screen.getAllByTestId("user-item")).toHaveLength(1);
      });

      fireEvent.change(input, { target: { value: "" } });
      await waitFor(() => {
        expect(screen.getAllByTestId("user-item")).toHaveLength(3);
      });
    });
  });

  describe("event filter", () => {
    it("filters ranges when selecting a single event", async () => {
      render(<TimelineCalendar {...fullProps} />);
      expect(screen.getAllByTestId("range-item")).toHaveLength(2);

      fireEvent.click(screen.getByTestId("event-select"));

      const option = document.querySelector(
        'li[data-name="Vacation"]',
      ) as HTMLElement | null;
      expect(option).not.toBeNull();
      fireEvent.click(option!);

      await waitFor(() => {
        expect(screen.getAllByTestId("range-item")).toHaveLength(1);
      });
    });
  });

  describe("status filter", () => {
    it("filters ranges when selecting a single status", async () => {
      render(<TimelineCalendar {...fullProps} />);
      expect(screen.getAllByTestId("range-item")).toHaveLength(2);

      fireEvent.click(screen.getByTestId("status-select"));

      const option = document.querySelector(
        'li[data-name="Approved"]',
      ) as HTMLElement | null;
      expect(option).not.toBeNull();
      fireEvent.click(option!);

      await waitFor(() => {
        expect(screen.getAllByTestId("range-item")).toHaveLength(1);
      });
    });
  });
  describe.skip("tooltip", () => {
    // jsdom не поддерживает позиционирование react-tooltip:
    // hover не триггерит отображение тултипа в этой среде.
    // Поведение проверяется вручную в браузере.
    it("shows tooltip content on range hover", () => {});
    it("shows range dates in the tooltip", () => {});
  });
});
