import type { UserWithRangeType } from "entities/user";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";
import FlexBox from "shared/ui/FlexBox";
import ListDays from "../../Day/ListDays";
import styles from "app/styles/timeline.module.css";
import classNames from "classnames";

type BodyContentProps = {
  userWithRange: UserWithRangeType[];
  events?: EventType[];
  statuses?: StatusType[];
};

const BodyContent = ({ userWithRange, events, statuses }: BodyContentProps) => {
  return (
    <FlexBox
      type="flex"
      direction="column"
      className={classNames("timeline-content-body", styles.bodyContent)}
    >
      <ListDays
        userWithRange={userWithRange}
        events={events}
        statuses={statuses}
      />
    </FlexBox>
  );
};

export default BodyContent;
