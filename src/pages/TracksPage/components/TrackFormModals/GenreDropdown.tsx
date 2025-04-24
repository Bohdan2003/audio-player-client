//hooks
import { useState } from 'react';
import { useGetGenresQuery } from "../../../../app/api.ts";
//components
import {Alert, Button, CircularProgress, Menu, MenuItem} from '@mui/material';

type TGenreDropdownProps = {
  setGenre: (genre: string) => void;
};

export const GenreDropdown: React.FC<TGenreDropdownProps> = ({ setGenre }) => {
  const { data: genres, isLoading, isError } = useGetGenresQuery(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if(isLoading) return <CircularProgress/>;
  if(!genres || isError) return <Alert severity="error">Something went wrong!</Alert>;

  return (
    <>
      <Button
        color="secondary"
        size="small"
        className="max-w-4"
        variant="outlined"
        loading={isLoading}
        data-loading={isLoading}
        disabled={isLoading}
        aria-disabled={isLoading}
        onClick={event => {
          setAnchorEl(event.currentTarget);
        }}
        data-testid="genre-selector"
      >
        +
      </Button>
      <Menu
        className="test"
        data-testid="genre-selector"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {setAnchorEl(null);}}
      >
        {genres.map((genre) => (
          <MenuItem
            key={genre}
            onClick={() => {
              setGenre(genre);
              setAnchorEl(null);
            }}
          >
            {genre}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
