import { Theme, type UserWithRangeType } from "shared/model";
import FlexBox from "shared/ui/FlexBox";
import Item from "shared/ui/Item";
import { defaultColors, defaultTheme } from "shared/lib";
import { getInitials } from "shared/lib";
import classNames from "classnames";
import styles from "app/styles/timeline.module.css";

type BodySideBarProps = {
  userWithRange: UserWithRangeType[];
  theme?: Theme;
  opened: boolean;
};

function BodySideBar(props: BodySideBarProps) {
  const { userWithRange, theme = defaultTheme, opened } = props;
  return (
    <FlexBox className={styles.bodySidebar}>
      {/* List of users*/}
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
          {opened && (
            <div>
              <div
                data-testid={"user-item"}
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
          {!opened && (
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
