//hooks
import { useState } from 'react';
import { useGetGenresQuery } from "../../../../app/api.ts";
//components
import { Alert, Button, Menu, MenuItem } from '@mui/material';

type TGenreDropdownProps = {
  setGenre: (genre: string) => void;
};

export const GenreDropdown: React.FC<TGenreDropdownProps> = ({ setGenre }) => {
  const { data: genres, isLoading, isError } = useGetGenresQuery(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if(isLoading) return <p>Loading...</p>;
  if(!genres || isError) return <Alert severity="error">Error</Alert>;

  return (
    <>
      <Button
        size="small"
        className="max-w-4"
        variant="outlined"
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
