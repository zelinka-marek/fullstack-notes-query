import axios from "axios";

export function getNotes() {
  return axios
    .get("http://localhost:3001/notes")
    .then((response) => response.data);
}
