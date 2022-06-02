import { BASE_API_URL } from "../common/Constants";
import { authHeader, handleResponseWithLoginCheck } from "./baseService";
import axios from "axios";

const API_URL = BASE_API_URL + "/api/userActivity";

class UserActivityService {
  saveUserActivity(userActivity) {
    const req = axios.post(API_URL, userActivity, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }
  getAllUserActivityOfUser() {
    const req = axios.get(API_URL, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }
  getAllUserActivityOfAllUsers() {
    const req = axios.get(API_URL, { headers: authHeader() });
    return handleResponseWithLoginCheck(req);
  }
}

export default new UserActivityService();
