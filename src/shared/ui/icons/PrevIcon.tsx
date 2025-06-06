import { Theme } from "shared/model";
import { defaultColors } from "shared/lib";

type IconProps = {
  fill?: string;
  height?: string;
  width?: string;
  theme: Theme;
};
export function PrevIcon(props: IconProps) {
  const { fill, width, height, theme } = props;
  const currentColor =
    fill && fill.length > 3 ? fill : defaultColors[theme].buttonBg;

  return (
    <svg
      fill={currentColor}
      height={width ? width : "32px"}
      width={height ? height : "32px"}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 55.752 55.752`}
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M12.745,23.915c0.283-0.282,0.59-0.52,0.913-0.727L35.266,1.581c2.108-2.107,5.528-2.108,7.637,0.001
          c2.109,2.108,2.109,5.527,0,7.637L24.294,27.828l18.705,18.706c2.109,2.108,2.109,5.526,0,7.637
          c-1.055,1.056-2.438,1.582-3.818,1.582s-2.764-0.526-3.818-1.582L13.658,32.464c-0.323-0.207-0.632-0.445-0.913-0.727
          c-1.078-1.078-1.598-2.498-1.572-3.911C11.147,26.413,11.667,24.994,12.745,23.915z"
        />
      </g>
    </svg>
  );
}
