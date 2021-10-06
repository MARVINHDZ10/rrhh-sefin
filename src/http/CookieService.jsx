import jwt from "jwt-simple";
import Cookies from 'js-cookie'

class CookieService {

    async saveToken(token) {
        var token1 = jwt.encode(token, "secret")
        Cookies.set('ACCESS_TOKEN', token1, { path: '' })
        /*cookies.set("ACCESS_TOKEN", token1, {
            path: '/',
            httpOnly: false,
            sameSite: "strict"
        });*/
    }

    async getToken() {
        var tokenEncrip = Cookies.get('ACCESS_TOKEN') //cookies.get("ACCESS_TOKEN");
        var decoded = jwt.decode(tokenEncrip, "secret")
        return Promise.resolve(decoded)
    }

    async deleteCookies() {
        Cookies.remove('ACCESS_TOKEN', { path: '' })
        console.log(Cookies.get("ACCESS_TOKEN"))
    }
}

export default new CookieService();