import awsS3 from './aws3';

async function imgUploadFile(file:any) {
  const extensionsallowed = ['jpg', 'png', 'bmp', 'gif', 'tif'];
  const extension = file.originalname.split('.')[1];

  const extensionValid = extensionsallowed.includes(extension);

  if (!extensionValid) {
    return ('File not allowed');
  }

  const uploadFile = await awsS3(file);
  return (uploadFile.Location);
}
export default imgUploadFile;
