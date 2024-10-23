import http from "../http-common";

class UserDataService {

    getAll() {
        return http.get("/users");
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post("/users/create", data);
    }

    login(username, password) {
        // 创建 URL 查询参数
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        return http.post("/users/login?" + params.toString()); // 发送 POST 请求到登录接口
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }

    deleteAll() {
        return http.delete(`/users`);
    }

    getUserInfo(username) {
        return http.get(`/users/info?username=${username}`); // 使用 username 查询用户信息
    }

}

export default new UserDataService();
