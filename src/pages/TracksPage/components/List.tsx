//hooks
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks.ts";
import { useGetTracksQuery } from "../../../app/api.ts";
//components
import { ListItem } from "./ListItem/ListItem.tsx";
import { Pagination, PaginationItem, CircularProgress, Alert } from '@mui/material';

export const List: React.FC = () => {
  const navigate = useNavigate();
  const { page = "1" } = useParams();
  const genre = useAppSelector((state) => state.filter.genre);
  const search = useAppSelector((state) => state.filter.search);
  const sort = useAppSelector((state) => state.filter.sort);
  const order = useAppSelector((state) => state.filter.order);

  const { data, isLoading, isError } = useGetTracksQuery({sort, order, page: +page, search, genre});

  if(isLoading)
    return <div className="text-center py-10"><CircularProgress data-testid="loading-tracks"/></div>;
  if(isError || !data)
    return <div className="flex justify-center py-10"><Alert severity="error">Something went wrong!</Alert></div>;
  if(data.data.length === 0)
    return <p className="text-center py-10">The track list is empty</p>;

  return (<section>
      <div className="container">
        <ul className="grid gap-[20px]">
          { data.data.map(track => <ListItem track={track} key={track.id}/>) }
        </ul>
        <div className="grid place-items-center">
          {
            data.meta.totalPages > 1 &&
            <Pagination
              data-testid="pagination"
              className="mt-[40px]"
              page={+page}
              count={data.meta.totalPages}
              onChange={(_, page) => {
                navigate(`/tracks/${page}`);
              }}
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  data-testid={
                    item.type === 'next'
                      ? 'pagination-next'
                      : item.type === 'previous'
                        ? 'pagination-prev'
                        : undefined
                  }
                />
              )}
            />
          }
        </div>
      </div>
  </section>);
};