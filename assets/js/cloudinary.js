import { cloudinaryConfig } from '../../firebase.js';
export async function uploadToCloudinary(file, folder='mariki'){
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', cloudinaryConfig.uploadPreset);
  fd.append('folder', folder);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`,{
    method:'POST', body:fd
  });
  if(!res.ok) throw new Error('Cloudinary upload failed');
  const data = await res.json();
  return { url:data.secure_url, publicId:data.public_id, type:data.resource_type, bytes:data.bytes };
}
