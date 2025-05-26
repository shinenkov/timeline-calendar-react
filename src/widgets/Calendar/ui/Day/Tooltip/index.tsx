import dayjs from "dayjs";
import { Locale, Theme } from "shared/model";
import { defaultColors, defaultTheme } from "shared/lib";
import { locale } from "shared/lib";
import classNames from "classnames";
import styles from "app/timeline.module.css";

type TooltipContentProps = {
  name: string;
  eventLabel?: string;
  eventColor?: string;
  startDate: string | Date;
  endDate: string | Date;
  statusColor?: string;
  statusLabel?: string;
  theme?: Theme;
  lang: Locale;
};

const TooltipContent = (props: TooltipContentProps) => {
  const {
    name,
    eventLabel,
    eventColor,
    startDate,
    endDate,
    statusColor,
    statusLabel,
    theme,
    lang,
  } = props;
  return (
    <>
      <div className={classNames(styles.text, styles.subtitle)}>{name}:</div>
      <div
        className={classNames(styles.text, styles.subtitle)}
        style={{ color: eventColor }}
      >
        {eventLabel}
      </div>
      <div
        className={classNames(styles.text, styles.subtitle)}
        style={{ color: defaultColors[theme ?? defaultTheme].textSecondary }}
      >
        {locale[lang].from} {dayjs(startDate).format("DD.MM.YYYY")}{" "}
        {locale[lang].to} {dayjs(endDate).format("DD.MM.YYYY")}
      </div>
      {statusLabel && (
        <div
          className={classNames(styles.text, styles.subtitle)}
          style={{ color: statusColor }}
        >
          {locale[lang].status}: {statusLabel}
        </div>
      )}
    </>
  );
};
export default TooltipContent;
