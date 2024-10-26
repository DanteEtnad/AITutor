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
        // Create URL query parameters
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        return http.post("/users/login?" + params.toString()); // Send POST request to login endpoint
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


    // Get user info by username
    getUserInfo(username) {
        return http.get(`/users/info?username=${username}`);
    }


    // Withdraw balance
    withdrawBalance(userId, amount) {
        return http.post(`/users/withdraw?userId=${userId}&amount=${amount}`);
    }

    // Recharge balance
    recharge(userId, amount) {
        return http.post(`/users/recharge?userId=${userId}&amount=${amount}`);
    }
}

export default new UserDataService();
