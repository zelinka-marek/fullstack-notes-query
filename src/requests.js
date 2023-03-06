import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

export function getNotes() {
  return axios.get(baseUrl).then((response) => response.data);
}

export function createNote(data) {
  return axios.post(baseUrl, data).then((response) => response.data);
}

export function updateNote(data) {
  return axios
    .put(`${baseUrl}/${data.id}`, data)
    .then((response) => response.data);
}
