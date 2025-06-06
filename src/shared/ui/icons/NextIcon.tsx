import { Theme } from "shared/model";
import { defaultColors } from "shared/lib";

type IconProps = {
  fill?: string;
  height?: string;
  width?: string;
  theme: Theme;
};
export function NextIcon(props: IconProps) {
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
          d="M43.006,23.916c-0.28-0.282-0.59-0.52-0.912-0.727L20.485,1.581c-2.109-2.107-5.527-2.108-7.637,0.001
          c-2.109,2.108-2.109,5.527,0,7.637l18.611,18.609L12.754,46.535c-2.11,2.107-2.11,5.527,0,7.637c1.055,1.053,2.436,1.58,3.817,1.58
          s2.765-0.527,3.817-1.582l21.706-21.703c0.322-0.207,0.631-0.444,0.912-0.727c1.08-1.08,1.598-2.498,1.574-3.912
          C44.605,26.413,44.086,24.993,43.006,23.916z"
        />
      </g>
    </svg>
  );
}
