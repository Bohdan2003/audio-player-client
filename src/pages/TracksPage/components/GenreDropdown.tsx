//hooks
import { useState } from 'react';
import { useGetGenresQuery } from "../../../app/api.ts";
//components
import { Button, Menu, MenuItem } from '@mui/material';

type TGenreDropdownProps = {
  setGenre: (genre: string) => void;
};

export const GenreDropdown: React.FC<TGenreDropdownProps> = ({ setGenre }) => {
  const { data: genres, isLoading, isError } = useGetGenresQuery(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if(isLoading) return <p>Loading...</p>;
  if(!genres || isError) return <p>Loading...</p>;

  return (
    <>
      <Button variant="outlined" onClick={event => {
        setAnchorEl(event.currentTarget);
      }}>
        +
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => {setAnchorEl(null);}}>
        {genres.map((genre) => (
          <MenuItem key={genre} onClick={() => {
            setGenre(genre);
            setAnchorEl(null);
          }}>
            {genre}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
