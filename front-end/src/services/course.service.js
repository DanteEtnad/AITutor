import http from "../http-common";

class CourseDataService {


    uploadCourse(data, teacherId) {
        return http.post(`/courses/upload?teacherId=${teacherId}`, data);
    }

    getAllCourseByStudentId(studentId)  {
        return http.get(`/course-history/student?studentId=${studentId}`);
    }
    getCoursesByTeacherId(teacherId) {
        return http.get(`/courses/teacher?teacherId=${teacherId}`);
    }
    // Get user info by username
    getUserInfo(username) {
        return http.get(`/users/info?username=${username}`);
    }
    getAllCourse() {
        return http.get("/courses/all");
    }
    selectCourse(studentId, courseId) {
        return http.post(`/course-history/select?studentId=${studentId}&courseId=${courseId}`);
    }
    interactWithChatGPT(studentId, courseId, message) {
        return http.post(`/course-history/interact?studentId=${studentId}&courseId=${courseId}&message=${message}`);
    }
}

export default new CourseDataService();
