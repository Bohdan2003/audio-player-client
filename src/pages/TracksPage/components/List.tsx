//hooks
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks.ts";
import { useGetTracksQuery } from "../../../app/api.ts";
//components
import { ListItem } from "./ListItem.tsx";
import { Pagination } from "../../../components/Pagination.tsx";

export const List: React.FC = () => {
  const { page = "1" } = useParams();
  const genre = useAppSelector((state) => state.filter.genre);
  const search = useAppSelector((state) => state.filter.search);
  const sort = useAppSelector((state) => state.filter.sort);
  const order = useAppSelector((state) => state.filter.order);

  const { data, isLoading, isError } = useGetTracksQuery({sort, order, page: +page, search, genre});

  if(isLoading) return <p>Loading...</p>;
  if(isError || !data) return <p>Error</p>;

  return (<section>
      <div className="container">
        <ul className="grid gap-[20px]">
          { data.data.map(track => <ListItem {...track} key={track.id}/>) }
        </ul>
        <Pagination
          className="mt-[40px]"
          url={"/tracks"}
          page={+page}
          totalPages={data.meta.totalPages}
        />
      </div>
  </section>);
};