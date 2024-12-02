import express from "express";

import { getTrendingTv ,getTvTrailers ,getTvDetails,getSimilarTvs,getTvByCategory,addTvToFavorite,removeTvFromFavorite} from "../controller/tv.controller.js";
const router = express.Router();

router.get("/trending",getTrendingTv) ;
router.get("/:id/trailers",getTvTrailers);
router.get("/:id/similar",getSimilarTvs)
router.get("/:category",getTvByCategory)
router.get("/:id/details",getTvDetails);
router.post("/:tvId/details/addToFavorite",addTvToFavorite);
router.delete("/:tvId/details/removeFromFavorite",removeTvFromFavorite);

export default router;