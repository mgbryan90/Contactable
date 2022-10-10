import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

async function createUser(credentials = { email, password }) {
  const { token, ...user } = await apiFetch("signup", { body: credentials });
  sessionStorage.setItem(tokenKey, token);
}

export { createUser };
