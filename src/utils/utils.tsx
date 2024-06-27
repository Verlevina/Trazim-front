import jsSHA from "jssha";

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
