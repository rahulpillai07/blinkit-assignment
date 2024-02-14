"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function ImageUpload() {
  const router = useRouter();
  const handleUpload = async () => {
    try {
      const isUserVerified = await axios.get("/api/VerifyUser");
      if (isUserVerified.status === 200) {
        toast.success("Image uploaded successfully!");
        console.log("File uploaded successfully");
      } else {
        toast.error("User is not logged in!");
        console.log("User is not authenticated");
      }
    } catch (error) {
      // Handle axios request errors
      toast.error("User not logged in,Please try again after logging in ");
      console.error("Error uploading image:", error);
      router.push("/login");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-md bg-slate-200 p-4 shadow-xl">
        <h1 className="mb-4 text-2xl font-semibold">Upload Picture</h1>
        <div className="grid gap-2">
          <Label htmlFor="picture" className="text-gray-700">
            Picture
          </Label>
          <Input
            id="picture"
            type="file"
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </div>
    </div>
  );
}
export { ImageUpload };
