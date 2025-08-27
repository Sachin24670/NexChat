import axios, { Axios } from "axios";
import { HOST } from "./constants"; 

export const apiClient = axios.create({
  baseURL: HOST
})