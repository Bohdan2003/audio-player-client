import { TIcon} from "../../utils/types/icon.ts";
import { cn } from "../../utils/cn.ts";

const ArrowIcon: React.FC<TIcon> = ({ className, pathClassName }) => {
  return (<svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className={cn('fill-white stroke-white', pathClassName)}
      d="M14.5267 17C14.4009 17.0005 14.2802 16.9552 14.1919 16.8741L9.13855 12.2978C8.95382 12.1303 8.95382 11.859 9.13855 11.6915L14.1919 7.11515C14.3785 6.95763 14.6694 6.96228 14.8498 7.12566C15.0303 7.28904 15.0354 7.55247 14.8615 7.72151L10.1429 11.9946L14.8615 16.2678C15.0462 16.4353 15.0462 16.7066 14.8615 16.8741C14.7731 16.9552 14.6524 17.0005 14.5267 17Z"
    />
  </svg>
  );
};

export {ArrowIcon};