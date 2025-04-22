//hooks
import { useNavigate } from "react-router-dom";
//types
import { TPagination} from "../utils/types/pagination.ts";
//utils
import { cn } from '../utils/cn.ts';
//components
import { ArrowIcon } from './icons/ArrowIcon.tsx';

const getPageNumbers = (totalPages: number) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
};

const Pagination: React.FC<
  Pick<TPagination, 'totalPages' | 'page'> &
  { className?: string, url: string }
> = ({className, url, page, totalPages}) => {
  const navigate = useNavigate();

  if (!totalPages || totalPages <= 1 || !page) return null;
  
  return (
    <div className={cn('flex items-center justify-center gap-[8px]', className)}>
      <button
        className={cn(page === 1 && 'opacity-50')}
        onClick={() => { navigate(`${url}/${page - 1}`) }}
        disabled={page === 1}
      >
        <ArrowIcon/>
      </button>
      <ul className="flex flex-wrap gap-[6px]">
        { getPageNumbers(totalPages).map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={cn(
                'py-[8px] px-[12px]',
                page === pageNumber && 'text-accent'
              )}
              onClick={() => {
                navigate(`${url}/${pageNumber}`);
              }}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={cn( page === totalPages && 'opacity-50', 'rotate-180' )}
        onClick={() => { navigate(`${url}/${page + 1}`) }}
        disabled={page === totalPages}
      >
        <ArrowIcon/>
      </button>
    </div>
  );
};

export { Pagination };
