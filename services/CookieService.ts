class CookieService {
  setAuthCookie() {
    document.cookie = "isAuth=true; Max-Age=259200;";
  }
  deleteAuthCookie() {
    document.cookie = "isAuth=false; Max-Age=-999;";
  }
}

export default new CookieService();
