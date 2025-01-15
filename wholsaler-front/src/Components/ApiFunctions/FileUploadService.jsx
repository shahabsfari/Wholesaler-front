import axios from 'axios';

class FileUploadService {
    async uploadFile(selectedFile, token, description) {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        // Adding description to formData
        formData.append('description', description);

            return await axios.post('/api/filehandler/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });


    }
}

export default new FileUploadService();