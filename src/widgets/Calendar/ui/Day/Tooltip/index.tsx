import dayjs from "dayjs";
import { defaultColors, locale } from "shared/lib";
import { useCalendarConfig } from "shared/context";
import classNames from "classnames";
import styles from "app/styles/timeline.module.css";

type TooltipContentProps = {
  name: string;
  eventLabel?: string;
  eventColor?: string;
  startDate: string | Date;
  endDate: string | Date;
  statusColor?: string;
  statusLabel?: string;
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
  } = props;

  const { theme, lang } = useCalendarConfig();
  const stylesSubtitle = classNames(styles.text, styles.subtitle);

  return (
    <>
      <div className={stylesSubtitle}>{name}:</div>
      <div className={stylesSubtitle} style={{ color: eventColor }}>
        {eventLabel}
      </div>
      <div
        className={stylesSubtitle}
        style={{ color: defaultColors[theme].textSecondary }}
      >
        {locale[lang].from} {dayjs(startDate).format("DD.MM.YYYY")}{" "}
        {locale[lang].to} {dayjs(endDate).format("DD.MM.YYYY")}
      </div>
      {statusLabel && (
        <div className={stylesSubtitle} style={{ color: statusColor }}>
          {locale[lang].status}: {statusLabel}
        </div>
      )}
    </>
  );
};

export default TooltipContent;
