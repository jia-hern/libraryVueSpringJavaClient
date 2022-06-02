import { BASE_API_URL } from "../common/Constants";
import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "./baseService";

const API_URL = BASE_API_URL + "/api/book";

class BookService {
  saveBook(book) {
    const request = axios.post(API_URL, book, { headers: authHeader() });
    return handleResponseWithLoginCheck(request);
  }
  deleteBook(book) {
    const request = axios.delete(API_URL + "/" + book.id, {
      headers: authHeader(),
    });
    return handleResponseWithLoginCheck(request);
  }
  getAllBooks() {
    return axios.get(API_URL);
  }
}
export default new BookService();
