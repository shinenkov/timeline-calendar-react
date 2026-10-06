import type { Theme } from "shared/model";
import { defaultColors, defaultTheme } from "shared/lib";
import styles from "./loading.module.css";

type LoadingProps = {
  dataTestid?: string;
  overlay?: boolean;
  theme?: Theme;
  accentColor?: string;
};

const Loading = ({
  dataTestid,
  overlay = false,
  theme = defaultTheme,
  accentColor,
}: LoadingProps) => {
  const bgColor = defaultColors[theme].bgSecondary;
  const spinColor =
    accentColor && accentColor.length > 3
      ? accentColor
      : defaultColors[theme].buttonBg;

  return (
    <div
      data-testid={dataTestid}
      className={overlay ? styles.overlayContainer : styles.loadingContainer}
    >
      <div
        className={styles.loading}
        style={{
          borderColor: bgColor,
          borderTopColor: spinColor,
        }}
      />
    </div>
  );
};

export default Loading;
