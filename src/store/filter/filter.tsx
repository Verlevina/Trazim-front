import { createSlice } from "@reduxjs/toolkit";
import { Filter } from "../../server/types";
import { emptyFilter, getFilterFromUrl } from "../../utils/utils";

const initialState: Filter = getFilterFromUrl();
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filter: Filter = {
        id: action.payload.id ?? initialState.id,
        isArchived: action.payload.isArchived ?? initialState.isArchived,
        locationId: action.payload.locationId ?? initialState.locationId,
        orderBy: action.payload.orderBy ?? initialState.orderBy,
        orderDescending:
          action.payload.orderDescending ?? initialState.orderDescending,
        originalLanguageId:
          action.payload.originalLanguageId ?? initialState.originalLanguageId,
        pageNumber: action.payload.pageNumber ?? initialState.pageNumber,
        pageSize: action.payload.pageSize ?? initialState.pageSize,
        pictureExisting:
          action.payload.pictureExisting ?? initialState.pictureExisting,
        title: action.payload.title ?? initialState.title,
        userId:
          +action.payload.userId ??
          +action.payload.userId ??
          initialState.userId,
      } as Filter;
      return filter;
    },
    setInitFilter: (state) => {
      return { ...emptyFilter };
    },
  },
});

export const { setFilter, setInitFilter } = filterSlice.actions;
export default filterSlice.reducer;
