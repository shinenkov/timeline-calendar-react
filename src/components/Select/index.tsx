import { CSSProperties, useEffect, useState, useId } from "react";
import { StatusType, EventType, Theme } from "../../types";
import { defaultColors } from "../../utils";
import { useSelectContext } from "./context/index";
import classNames from "classnames";
import styles from "./select.module.css";

type SelectProps = {
  theme: Theme;
  defaultText: string;
  defaultAll: string;
  optionsList: EventType[] | StatusType[];
  multiselect?: boolean;
  selectedOptions?: EventType[] | StatusType[];
  className?: string;
  style?: CSSProperties;
  accentColor: string;
  dataTestid?: string;
  onOptionSelect?: (selectedOption: (EventType | StatusType)[]) => void;
};

function Select(props: SelectProps) {
  const selectId = useId(); // Generate unique ID for this select
  const { activeSelectId, setActiveSelectId } = useSelectContext();
  const {
    theme,
    defaultText,
    optionsList,
    multiselect = false,
    selectedOptions = [],
    onOptionSelect,
    defaultAll,
    className,
    style,
    dataTestid,
    accentColor,
  } = props;
  const [defaultSelectText, setDefaultSelectText] = useState(defaultText);
  const [selected, setSelected] = useState<EventType[] | StatusType[]>(
    selectedOptions,
  );

  const isOpen = activeSelectId === selectId;

  const handleClickOutside = (e: MouseEvent) => {
    if (
      e?.target instanceof HTMLElement &&
      !e?.target?.classList?.contains(styles.selectContainer) &&
      !e?.target?.classList?.contains(styles.selectOption) &&
      !e?.target?.classList?.contains(styles.checkmark) &&
      !e?.target?.classList?.contains(styles.selectedText)
    ) {
      setActiveSelectId(null);
    }
  };

  useEffect(() => {
    setSelected(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    if (selectedOptions.length === optionsList.length) {
      setDefaultSelectText(defaultAll);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleListDisplay = () => {
    setActiveSelectId(isOpen ? null : selectId);
  };

  const handleOptionClick = (option: EventType | StatusType) => {
    if (multiselect) {
      const newSelected = [...selected];
      const optionIndex = newSelected.indexOf(option);
      if (optionIndex === -1) {
        newSelected.push(option);
      } else {
        newSelected.splice(optionIndex, 1);
      }
      setSelected(newSelected);
      if (newSelected.length > 0) {
        if (newSelected.length === optionsList.length) {
          setDefaultSelectText(defaultAll);
        } else {
          setDefaultSelectText(newSelected.map((opt) => opt.label).join(", "));
        }
      } else {
        setDefaultSelectText(defaultText);
      }
      if (onOptionSelect) {
        onOptionSelect(newSelected);
      }
    } else {
      setDefaultSelectText(option.label);
      setActiveSelectId(null);
      if (onOptionSelect) {
        onOptionSelect([option]);
      }
    }
  };

  return (
    <div
      className={classNames(styles.selectContainer, className)}
      style={style}
    >
      <div
        className={classNames(
          styles.selectedText,
          isOpen && styles.selectedTextActive,
        )}
        data-testid={dataTestid}
        onClick={handleListDisplay}
        style={{
          color: defaultColors[theme].textPrimary,
          ...(isOpen && { borderColor: accentColor }),
        }}
      >
        {defaultSelectText}
      </div>
      {isOpen && (
        <ul className={styles.selectOptions}>
          {optionsList.map((option) => {
            const isSelected = selected.some(
              (item: EventType | StatusType) => item.id === option.id,
            );
            const liStyle = {
              "--hover-checkmark": defaultColors[theme].hoverCheckmark,
              background: isSelected
                ? defaultColors[theme].checkmark
                : defaultColors[theme].bgPrimary,
              color: defaultColors[theme].textPrimary,
            } as React.CSSProperties;
            return (
              <li
                className={
                  styles.selectOption +
                  (isSelected ? " " + styles.selected : "")
                }
                data-name={option.label}
                key={option.id}
                style={liStyle}
                onClick={() => handleOptionClick(option)}
              >
                <input
                  onChange={() => {
                    handleOptionClick(option);
                  }}
                  type="checkbox"
                  checked={isSelected}
                />
                <span
                  className={styles.checkmark}
                  style={{
                    background: defaultColors[theme].checkmark,
                    ...(isSelected && { background: accentColor }),
                  }}
                ></span>
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Select;
