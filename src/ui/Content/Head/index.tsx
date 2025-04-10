import dayjs from 'dayjs';
import { defaultTheme } from '../../../utils';
import { Item } from '../../../components/Item';
import { Locale, Theme } from '../../../types';
import { FlexBox } from '../../../components/FlexBox';
import { getDaysArray } from '../utils';
import classNames from 'classnames';
import styles from '../../../timeline.module.css';

type HeadContentProps = {
  currentDate: string;
  thRef: React.RefObject<HTMLDivElement | null>;
  theme?: Theme;
  cellSize?: string;
  lang: Locale;
};

function HeadContent(props: HeadContentProps) {
  const { currentDate, thRef, theme = defaultTheme, cellSize, lang } = props;

  return (
    <FlexBox ref={thRef} type="flex" className={styles.headContent}>
      {/* Output of month numbers with days of the week */}
      {getDaysArray(currentDate, lang).map((day, i) => (
        <FlexBox
          key={i}
          pxSize={cellSize}
          size={12 / dayjs(currentDate).daysInMonth()}
        >
          <Item theme={theme}>
            <div className={classNames(styles.text, styles.bodyText)}>
              {i + 1}
            </div>
            <div className={classNames(styles.text, styles.caption)}>{day}</div>
          </Item>
        </FlexBox>
      ))}
    </FlexBox>
  );
}

export default HeadContent;
