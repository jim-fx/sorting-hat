import localStorageStore from "./localStorageStore";

export const userData = localStorageStore("user-data", {
  name: "",
  confidence: "",
  house: ""
}) 
