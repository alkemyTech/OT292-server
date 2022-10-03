import multer from 'multer';

// setup multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
});

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
