import axios from 'axios';
const API_BASE_URL = "/api";

class FileUploadService {
    uploadFile(file , user) {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "token" : user.token
            },
        });
    }
}

export default new FileUploadService();