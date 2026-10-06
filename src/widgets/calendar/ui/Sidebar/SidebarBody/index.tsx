import FlexBox from "shared/ui/FlexBox";
import Item from "shared/ui/Item";
import { defaultColors, getInitials } from "shared/lib";
import { useCalendarConfig, useCalendarUI } from "shared/context";
import type { UserWithRangeType } from "entities/user";
import classNames from "classnames";
import styles from "app/styles/timeline.module.css";

type BodySideBarProps = {
  userWithRange: UserWithRangeType[];
};

function BodySideBar({ userWithRange }: BodySideBarProps) {
  const { theme } = useCalendarConfig();
  const { openSidebar } = useCalendarUI();

  return (
    <FlexBox
      className={classNames("timeline-sidebar-body", styles.bodySidebar)}
    >
      {userWithRange.map((user) => (
        <Item
          theme={theme}
          key={user.id}
          sx={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {openSidebar && (
            <div>
              <div
                data-testid="user-item"
                className={classNames(styles.text, styles.bodyTitle)}
              >
                {user.name}
              </div>
              {user.department && (
                <div
                  style={{ opacity: 0.7 }}
                  className={classNames(styles.text, styles.subtitle)}
                >
                  {user.department}
                </div>
              )}
            </div>
          )}
          {!openSidebar && (
            <FlexBox style={{ flexBasis: "10%" }}>
              <div
                className={styles.avatar}
                style={{
                  background: defaultColors[theme].avatarBg,
                  color: defaultColors[theme].avatarColor,
                }}
              >
                {getInitials(user.name)}
              </div>
            </FlexBox>
          )}
        </Item>
      ))}
    </FlexBox>
  );
}

export default BodySideBar;
