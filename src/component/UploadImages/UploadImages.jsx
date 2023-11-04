// UploadImages.jsx
import React from "react";
// import gallery image icon for image uploading block from react-icons
import { IoImage } from "react-icons/io5";

const UploadImages = ({ images, setImages, setChecked }) => {
    // Image Uploading function
	const handleImageUpload = (event) => {
		const newImages = [...images];
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			reader.onloadend = () => {
				newImages.push(reader.result);
				setImages(newImages);
				setChecked((prev) => [...prev, false]);
			};
			if (file) {
				reader.readAsDataURL(file);
			}
		}
	};
    return (
        <div className="relative border-2 border-dashed border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition-colors ease-linear">

            <input
              type="file"
              multiple //can add multiple images at a time
              accept=".png, .webp, .jpg" //only accept these extension's file
              name="images"
              id="images"
              className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
              title="Try to upload photos" //onhover text
              onChange={handleImageUpload} //function call when any change occurs
            />

             <div className="h-full w-full flex flex-col justify-center items-center xs:gap-y-4 gap-y-2 xxs:py-5 py-3">

                {/* Featured image icon */}
                <IoImage className="text-xl"/> 
                <span className="whitespace-nowrap xxs:text-base text-sm">Add Images</span>

            </div>
        </div>
    );
};

export default UploadImages;