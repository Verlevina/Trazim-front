import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setFilter } from "../../store/filter/filter";
import { Filter } from "../../server/types";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { CurrentLanguageContext } from "../../App";
import { TranslationKeys } from "../../Translation/TranslationComponent";
import { LangugeArray } from "../../constants/languages";
import { emptyFilter } from "../../utils/utils";

const FilterComponent = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const updateFilter = (filter: Filter) => {
    dispatch(setFilter({ ...filter }));
  };

  return <FilterDrawer filter={filter} updateFilter={updateFilter} />;
};

interface FilterDrawerProps {
  filter: Filter;
  updateFilter: (filter: Filter) => void;
}

const FilterDrawer = ({ filter, updateFilter }: FilterDrawerProps) => {
  const [localFilter, setLocalFilter] = useState<Filter>(filter);
  const translationContext = React.useContext(CurrentLanguageContext);
  return (
    <Box
      component="form"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newFilter = {
          ...emptyFilter,
          title: localFilter.title,
          originalLanguageId: localFilter.originalLanguageId,
          isArchived: localFilter.isArchived,
          pictureExisting: localFilter.pictureExisting,
        } as Filter;
        updateFilter(newFilter);
      }}
      noValidate
      sx={{ mt: 1, mb: 1, ml: 1, mr: 1 }}
    >
      <Grid container xs={12} direction={"column"} spacing={2}>
        <Grid item>
          <TextField
            name="title"
            id="outlined-basic"
            label={translationContext(TranslationKeys.Title)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setLocalFilter({ ...localFilter, title: event.target.value })
            }
            variant="outlined"
            value={localFilter.title}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="languagePicker">Language</InputLabel>
            <Select
              name="language"
              labelId="languagePicker"
              id="languagePicker"
              value={localFilter.originalLanguageId ?? -1}
              label="Language"
              onChange={(event: SelectChangeEvent<number>) =>
                setLocalFilter({
                  ...localFilter,
                  originalLanguageId:
                    +event.target.value >= 0 ? +event.target.value : null,
                })
              }
            >
              <MenuItem key={`language_item-${-1}`} value={-1}>
                {`<not selected>`}
              </MenuItem>
              {LangugeArray.map((lang, i) => (
                <MenuItem key={`language_item-${i}`} value={i}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                name="picture"
                checked={localFilter.pictureExisting ?? false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setLocalFilter({
                    ...localFilter,
                    pictureExisting: event.target.checked,
                  })
                }
              />
            }
            label="With picture"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                name="archived"
                checked={localFilter.isArchived ?? false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setLocalFilter({
                    ...localFilter,
                    isArchived: event.target.checked,
                  })
                }
              />
            }
            label="Archived"
          />
        </Grid>
        <Grid item>
          <MockArea text="categoties area" />
        </Grid>
        <Grid item>
          <MockArea text="tags area" />
        </Grid>
        <Grid item>
          <MockArea text="location area" />
        </Grid>
        <Grid item>
          <Button type="submit">Search</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default FilterComponent;
interface mockProps {
  text: string;
}
const MockArea = ({ text }: mockProps) => (
  <div
    style={{
      height: "200px",
      border: "1px solid grey",
      borderRadius: "5px",
      textAlign: "center",
    }}
  >
    <div style={{ height: "20%" }}>
      <Typography>{text}</Typography>{" "}
    </div>
    <Divider />
    <div
      style={{
        background:
          "repeating-linear-gradient(45deg, transparent, transparent 5px, #ccc 5px, #ccc 10px",
        height: "79%",
        borderRadius: "0 0 5px 5px",
      }}
    ></div>
  </div>
);
