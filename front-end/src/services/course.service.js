import http from "../http-common"; // 导入 HTTP 配置

class CourseDataService {

    // 上传课程
    uploadCourse(data, teacherId) {
        return http.post(`/courses/upload?teacherId=${teacherId}`, data);
    }

}

export default new CourseDataService();
