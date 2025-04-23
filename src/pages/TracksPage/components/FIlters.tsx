//hooks
import { useMemo, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useGetGenresQuery } from "../../../app/api.ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
//components
import { BaseTextField } from "../../../components/BaseTextField.tsx";
import { BaseSelect } from "../../../components/BaseSelect.tsx";
//actions
import { 
  setSearch, 
  setSortField, 
  setSortOrder, 
  setGenre 
} from "../../../slices/filterSlice.ts";
//utils
import { debounce } from "../../../utils/debounce.ts";
//types
import { TTrack } from "../../../utils/types/track.ts";

type TOption = { label: string, value: keyof TTrack }

const sortOptions: TOption[] = [
  { label: 'Title', value: 'title' },
  { label: 'Artist', value: 'artist' },
  { label: 'Album', value: 'album' },
  { label: 'Created At', value: 'createdAt' },
];

const orderOptions = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

export const Filters: React.FC = () => {
  const { data: genres, isLoading } = useGetGenresQuery(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const genre = useAppSelector((state) => state.filter.genre);
  const sort = useAppSelector((state) => state.filter.sort);
  const order = useAppSelector((state) => state.filter.order);

  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearch(value));
        navigate(`/tracks`);
      }, 400),
    [dispatch, navigate]
  );

  const genreOptions = useMemo(() => {
    return genres
      ? [{ label: 'All Genres', value: '' }, ...genres.map((g) => ({ label: g, value: g }))]
      : [];
  }, [genres]);

  return (
    <div className="py-[20px] mt-[40px]">
      <div className="container flex gap-[40px] justify-between">
        <div className="flex gap-[20px]">
          <BaseTextField
            className="w-[280px]"
            value={searchValue}
            label="Search"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setSearchValue(value);
              debouncedSearch(value);
            }}
          />
          <BaseSelect
            className="w-[200px]"
            id="sort-field"
            label="Sort Field"
            value={sort}
            options={sortOptions}
            onChange={value => {
              dispatch(setSortField(value));
              navigate(`/tracks`);
            }}
          />
          <BaseSelect
            className="w-[200px]"
            id="sort-order"
            label="Sort Order"
            value={order}
            options={orderOptions}
            onChange={ value => {
              dispatch(setSortOrder(value));
              navigate(`/tracks`);
            }}
          />
        </div>
        {isLoading
          ? <p>Loading...</p>
          : <BaseSelect
              className="w-[200px]"
              id="filter-genre"
              label="Filter by genre"
              value={genre}
              options={genreOptions}
              onChange={value => {
                dispatch(setGenre(value));
                navigate(`/tracks`);
              }}
            />
        }
      </div>
    </div>
  );
};
