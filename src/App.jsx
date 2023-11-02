import "./App.css";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
	const allImages = [
		"../src/assets/images/image-11.jpeg",
		"../src/assets/images/image-3.webp",
		"../src/assets/images/image-2.webp",
		"../src/assets/images/image-7.webp",
		"../src/assets/images/image-5.webp",
		"../src/assets/images/image-9.webp",
		"../src/assets/images/image-10.jpeg",
		"../src/assets/images/image-4.webp",
		"../src/assets/images/image-8.webp",
		"../src/assets/images/image-1.webp",
		"../src/assets/images/image-6.webp",
	];
	const [images, setImages] = useState(allImages);
	const [checked, setChecked] = useState(Array(allImages.length).fill(false));

	const moveImage = (dragIndex, hoverIndex) => {
		const draggedImage = images[dragIndex];
		const draggedChecked = checked[dragIndex];
		setImages((prevImages) => {
			const updatedImages = prevImages.filter(
				(img, index) => index !== dragIndex
			);
			updatedImages.splice(hoverIndex, 0, draggedImage);
			return updatedImages;
		});

		setChecked((prevChecked) => {
			const updatedChecked = prevChecked.filter(
				(_, index) => index !== dragIndex
			);
			updatedChecked.splice(hoverIndex, 0, draggedChecked);
			return updatedChecked;
		});
	};

	const handleChecked = (index) => {
		const newState = checked.map((item, i) => (i === index ? !item : item));
		setChecked(newState);
	};

	const handleDelete = () => {
		const newImages = images.filter((_, index) => !checked[index]);
		setImages(newImages);
		setChecked(Array(newImages.length).fill(false));
	};

	const handleSetFeatureImage = (index) => {
		const newImages = [...images];
		const [firstImage] = newImages.splice(index, 1);
		newImages.unshift(firstImage);
		setImages(newImages);
		console.log(checked);
		if (checked[0] === true) {
			checked[0] = false;
			handleChecked(1);
		}
	};

	const count = checked.reduce((accumulator, currentValue) => {
		return currentValue === true ? accumulator + 1 : accumulator;
	}, 0);

	const ImageItem = ({ index, image }) => {
		const [{ isDragging }, drag] = useDrag({
			type: "IMAGE",
			item: { index },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		});

		const [, drop] = useDrop({
			accept: "IMAGE",
			hover(item) {
				if (item.index !== index) {
					moveImage(item.index, index);
					item.index = index;
				}
			},
		});

		return (
			<div
				ref={(node) => drag(drop(node))}
				className={`gallery-img ${index === 0 ? "col-span-2 row-span-2" : ""}`}
				draggable>
				<div
					className={`gallery-img-hover bg-opacity-60 ${
						checked[index] ? "bg-white h-[100%]" : "bg-black"
					}`}>
					<input
						type='checkbox'
						onChange={() => handleChecked(index)}
						checked={checked[index]}
						className={`h-5 w-5 m-5 ${checked[index] ? "text-blue-500" : ""}`}
					/>
					{checked[index] || index === 0 ? (
						""
					) : (
						<button
							className='featured-button bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 transition-all'
							onClick={() => handleSetFeatureImage(index)}>
							Set Featured
						</button>
					)}
				</div>

				<img src={image} alt='' />
			</div>
		);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='bg-slate-200 p-12'>
				<div className='bg-white px-10 py-5 border border-gray-300 shadow-md rounded-t-xl flex justify-between items-center'>
					{checked.includes(true) ? (
						<h3 className='font-bold text-2xl'>
							<input type='checkbox' checked className='mr-5 h-5 w-5' />
							{count} {count > 1 ? "Files" : "File"} Selected
						</h3>
					) : (
						<h3 className='font-bold text-2xl'>Gallery</h3>
					)}

					<div
						onClick={handleDelete}
						className={`text-red-600 font-semibold hover:underline cursor-pointer ${
							checked.includes(true) ? "visible" : "hidden"
						}`}>
						Delete {count > 1 ? "Files" : "File"}
					</div>
				</div>
				<div className='bg-white p-10 border border-gray-300 shadow-md rounded-b-xl'>
					<div className='grid grid-cols-5 gap-5'>
						{images.map((image, index) => (
							<ImageItem key={index} index={index} image={image} />
						))}
					</div>
				</div>
			</div>
		</DndProvider>
	);
}

export default App;
