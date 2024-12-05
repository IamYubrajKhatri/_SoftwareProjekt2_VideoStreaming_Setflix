import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true }, // Link to the video file
    //onjectID is a unique id in mongo db,"User" means it refers to another collection called User"It creats link between two collection
    //now using populate method we can upload a file und include details about who uploaded it
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin ID
    isHidden: { type: Boolean, default: false }, // Visibility status
    createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model("Video", videoSchema);
export default Video;