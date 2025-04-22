import { TIcon} from "../../utils/types/icon.ts";
import { cn } from "../../utils/cn.ts";

export const DeleteIcon: React.FC<TIcon> = ({ className, pathClassName }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className={cn('stroke-white', pathClassName)}
      d="M4 5L5.80232 21.2209C5.91486 22.2337 6.77099 23 7.79009 23H16.2099C17.229 23 18.0851 22.2337 18.1977 21.2209L20 5M4 5H3M4 5H9M20 5H21M20 5H15M10 10V18M14 10V18M9 5V3C9 1.89543 9.89543 1 11 1H13C14.1046 1 15 1.89543 15 3V5M9 5H15"
      strokeLinecap="round"/>
  </svg>
)