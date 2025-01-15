import React, { useState } from 'react';
import FileUploadService from './FileUploadService';
import AuthContext from '../../AuthContext';
import { useContext } from 'react';

const FileUploadComponent = () => {
    const {user , loading} = useContext(AuthContext)
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await FileUploadService.uploadFile(selectedFile , user);
            setMessage(response.data.message);
            console.log(response.data)
        } catch (error) {
            setMessage('File upload failed!');
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gray-800 text-white text-center py-2">File Upload</div>
                        <div className="p-5">
                            {message && <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4">{message}</div>}
                            <form onSubmit={handleFileUpload}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Choose file</label>
                                    <input
                                        type="file"
                                        className="w-full px-3 py-2 border border-gray-300 rounded mt-2"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 mt-3">
                                    Upload
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FileUploadComponent;