import { writable } from "svelte/store";
import localStorageStore from "./localStorageStore";

export const userData = localStorageStore("user-data", {
  name: "",
  confidence: "",
  house: ""
}) 


export const finished = writable(false);
