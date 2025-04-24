import { Chip, FormHelperText, Typography } from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {GenreDropdown} from "./GenreDropdown.tsx";
import React from "react";

export const FormGenresSelect: React.FC = () => {
  const { control } = useFormContext();

  return (<Controller
      name="genres"
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Typography variant="subtitle1">Genres</Typography>

          <div className="flex gap-2 flex-wrap mt-2 mb-2">
            {field.value.map((genre: string, index: number) => (
              <Chip
                key={index}
                label={genre}
                onDelete={() =>
                  field.onChange(field.value.filter((g: string) => g !== genre))
                }
              />
            ))}
          </div>
          <div>
            <GenreDropdown
              setGenre={(genre: string) => {
                if (genre && !field.value.includes(genre)) {
                  field.onChange([...field.value, genre]);
                }
              }}
              data-testid="genre-selector"
            />

            {fieldState.error?.message && (
              <FormHelperText
                data-testid="error-genre"
                error
              >{fieldState.error.message}</FormHelperText>
            )}
          </div>
        </div>
      )}
    />
  )
}