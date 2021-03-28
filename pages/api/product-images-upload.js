import multer from "multer";
import nextConnect from "next-connect";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./tmp/images/product",
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method Not Allowed` });
  },
});

apiRoute.use(upload.array("files"));

apiRoute.post((req, res) => {
  res.status(200).json({"data": req.files});
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
