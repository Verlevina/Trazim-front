import jsSHA from "jssha";
import { Filter } from "../server/types";

export const getShortName = (name: string, surname: string, login: string) =>
  name?.length > 0
    ? `${name[0]}${surname.length > 0 ? surname[0] : ""}`
    : login?.length > 0
    ? login[0]
    : "NA";

export const hidePassword = (val: string) => {
  var hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
  hashObj.update(val);
  var hash = hashObj.getHash("HEX");
  return hash;
};
export const emptyFilter = {
  id: null,
  title: null,
  originalLanguageId: null,
  pictureExisting: null,
  locationId: null,
  isArchived: null,
  userId: null,

  // Ordering
  orderBy: "created",
  orderDescending: true,

  // Paging
  pageSize: 12,
  pageNumber: 0,
} as Filter;
export const getFilterFromUrl = () => {
  try {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params1 = urlSearchParams.entries();
    const params = Object.fromEntries(params1);
    debugger;
    const initFilter: Filter = {
      id: params?.id !== undefined ? JSON.parse(params?.id) : null,
      title: params?.title !== undefined ? JSON.parse(params?.title) : null,
      originalLanguageId:
        params?.originalLanguageId !== undefined
          ? JSON.parse(params?.originalLanguageId)
          : 1,
      pictureExisting:
        params?.originalLanguageId !== undefined
          ? JSON.parse(params?.pictureExisting)
          : null,
      locationId:
        params?.locationId !== undefined
          ? JSON.parse(params?.locationId)
          : null,
      isArchived:
        params?.isArchived !== undefined
          ? JSON.parse(params?.isArchived)
          : null,
      userId: !!params?.userId ? +params?.userId : null,
      // Ordering
      orderBy: params?.orderBy ?? "title",
      orderDescending: !!params?.orderDescending ?? true,
      // Paging
      pageNumber: !!params?.pageNumber ? +params?.pageNumber : 0,
      pageSize: !!params?.pageCount
        ? +params?.pageCount
        : +params?.pageCount > 0
        ? +params?.pageCount
        : 12,
    } as Filter;
    return initFilter;
  } catch {}
  return emptyFilter;
};
