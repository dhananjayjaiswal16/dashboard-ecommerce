import app from '../../firebase';
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const imgUploadToFirebase = (imgFile) => {
  const fileName = new Date().getTime() + imgFile.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          console.log('Some Error');
          break;
      }
    },
    (error) => {
      console.log("Error in file upload with error", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const product = { ...inputs, img: downloadURL, categories: category };
        return product;
      });
    }
  );
}