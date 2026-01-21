import axios from 'axios';
import { db } from '../../../dbconfigs/index';
import { carImages } from '@/db/schema';

const UPLOAD_URL = 'http://localhost:5000/upload';

export const uploadImagestoCloudinary = async (fileList, triggerUploadImages, setLoader) => {
    console.log('cloudinary upload fn', fileList.length, 'files');

    try {
        setLoader(true);
        const uploadPromises = fileList.map(async (file) => {
            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post(UPLOAD_URL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log("file uploaded", response.data);

                await db.insert(carImages).values({
                    imageUrl: response.data.url,
                    carListingId: triggerUploadImages
                });

                return response.data;
            } catch (error) {
                console.log('Upload Error for file:', file.name, error);
                throw error;
            }
        });

        await Promise.all(uploadPromises);
        console.log('All files uploaded successfully');
        setLoader(false);
    } catch (error) {
        console.log('Upload process error:', error);
        setLoader(false);
    }
}

export const deleteImageFromCloudinary = async(imageUrl) => {
    // For now, we'll just log the delete request
    // In a full implementation, you'd need a delete endpoint on the server
    console.log('Delete request for image:', imageUrl);
    // TODO: Implement delete endpoint on server if needed
}
