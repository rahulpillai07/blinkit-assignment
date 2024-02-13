import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Image =
  mongoose.models.Image || mongoose.model("Image", imageSchema);
