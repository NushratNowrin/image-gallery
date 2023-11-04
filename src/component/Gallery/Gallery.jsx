// Gallery.jsx
import React, { useState } from "react";

// Importing element for drag and drop
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

// Importing necessary images
import img1 from "../../assets/images/image-11.jpeg";
import img2 from "../../assets/images/image-3.webp";
import img3 from "../../assets/images/image-2.webp";
import img4 from "../../assets/images/image-7.webp";
import img5 from "../../assets/images/image-5.webp";
import img6 from "../../assets/images/image-9.webp";
import img7 from "../../assets/images/image-10.jpeg";
import img8 from "../../assets/images/image-4.webp";
import img9 from "../../assets/images/image-8.webp";
import img10 from "../../assets/images/image-1.webp";
import img11 from "../../assets/images/image-6.webp";

// Importing necessary components
import ImageItem from "../ImageItem/ImageItem";
import UploadImages from "../UploadImages/UploadImages";
import { styles } from "../../style";

// Function to check for touch devices
const isTouchDevice =
	"ontouchstart" in window ||
	navigator.maxTouchPoints > 0 ||
	navigator.msMaxTouchPoints > 0;

// Gallery component
const Gallery = () => {
	// State for images and checked items
	const allImages = [
		img1,
		img2,
		img3,
		img4,
		img5,
		img6,
		img7,
		img8,
		img9,
		img10,
		img11,
	];

	const [images, setImages] = useState(allImages);
	const [checked, setChecked] = useState(Array(allImages.length).fill(false));
	// console.log(images);

	// Function to handle checkbox state
	const handleChecked = (index) => {
		const newState = checked.map((item, i) => (i === index ? !item : item));
		setChecked(newState);
	};

	// Function to uncheck all items
	const handleAllUnchecked = () => {
		const allUnChecked = checked.map((item) => {
			if (item === true) {
				return false;
			}
			return item;
		});
		setChecked(allUnChecked);
	};

	// Function to delete selected images
	const handleDelete = () => {
		const newImages = images.filter((_, index) => !checked[index]);
		setImages(newImages);
		setChecked(Array(newImages.length).fill(false));
	};

	// Counting selected images
	const count = checked.reduce((accumulator, currentValue) => {
		return currentValue === true ? accumulator + 1 : accumulator;
	}, 0);

	return (
		// In Dndprovider, for touch-device like Phone, Tab, use TouchBackend and for others like PC, use HTML5Backend
		<DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
			<div className={`${styles.whiteBG} py-5 rounded-t-xl flex justify-between items-center`} >
				{/* Rendering the header */}
				{checked.includes(true) ? (
					<h3 className='sm:font-bold font-semibold sm:text-2xl text-lg'>
						<input
							type='checkbox'
							defaultChecked
							onChange={() => handleAllUnchecked()}
							className='sm:mr-5 mr-1 sm:h-5 h-4 sm:w-5 w-4'
						/>
						{count} {count > 1 ? "Files" : "File"} Selected
					</h3>
				) : (
					<h3 className='sm:font-bold font-semibold sm:text-2xl text-lg'>
						Gallery
					</h3>
				)}

				{/* Rendering the delete button */}
				<div
					onClick={handleDelete}
					className={`text-red-600 font-semibold sm:text-base text-sm hover:underline cursor-pointer ${
						checked.includes(true) ? "visible" : "hidden"
					}`}>
					Delete {count > 1 ? "Files" : "File"}
				</div>
			</div>

			<div className={`${styles.whiteBG} py-10 rounded-b-xl`}>
				<div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5'>
					{/* Rendering image items */}
					{images.map((image, index) => (
						<ImageItem
							key={index}
							index={index}
							image={image}
							handleChecked={handleChecked}
							setChecked={setChecked}
							checked={checked}
							images={images}
							setImages={setImages}
						/>
					))}

					{/* Rendering the upload image component */}
					<UploadImages
						images={images}
						setImages={setImages}
						setChecked={setChecked}></UploadImages>
				</div>
			</div>
		</DndProvider>
	);
};

export default Gallery;
