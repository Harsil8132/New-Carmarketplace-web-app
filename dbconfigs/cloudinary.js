import { v2 as cloudinary } from 'cloudinary';
import { conf } from '@/conf/conf';

// Configure Cloudinary
cloudinary.config({
  cloud_name: conf.CLOUDINARY_CLOUD_NAME,
  api_key: conf.CLOUDINARY_API_KEY,
  api_secret: conf.CLOUDINARY_API_SECRET,
});

export default cloudinary;
