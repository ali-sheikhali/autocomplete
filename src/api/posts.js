import { apiUrl } from "./config";

async function getPosts() {
  return fetch(`${apiUrl}/posts`).then((res) => res.json());
}
export {getPosts};