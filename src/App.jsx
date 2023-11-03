import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MdFeaturedVideo } from "react-icons/md";
import { IoImage } from "react-icons/io5";
import "./App.css";
import img1 from "../src/assets/images/image-11.jpeg";
import img2 from "../src/assets/images/image-3.webp";
import img3 from "../src/assets/images/image-2.webp";
import img4 from "../src/assets/images/image-7.webp";
import img5 from "../src/assets/images/image-5.webp";
import img6 from "../src/assets/images/image-9.webp";
import img7 from "../src/assets/images/image-10.jpeg";
import img8 from "../src/assets/images/image-4.webp";
import img9 from "../src/assets/images/image-8.webp";
import img10 from "../src/assets/images/image-1.webp";
import img11 from "../src/assets/images/image-6.webp";


function App() {
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
							className="h-5 w-5 m-5"
						/>
						{checked[index] || index === 0 ? (
							""
						) : (
							<button
								className='featured-button text-orange-200 transition-all hover:text-orange-400'
								onClick={() => handleSetFeatureImage(index)} title="Set as Featured Image">
								<MdFeaturedVideo className="lg:text-xl text-lg"/>
							</button>
						)}
				
				</div>

				<img src={image} alt='' />
			</div>
		);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='bg-slate-200 xs:p-12 p-0'>
				<div className='bg-white xxs:px-10 px-2 py-5 border border-gray-300 shadow-md rounded-t-xl flex justify-between items-center'>
					{checked.includes(true) ? (
						<h3 className='sm:font-bold font-semibold sm:text-2xl text-lg'>
							<input type='checkbox' checked className='sm:mr-5 mr-1 sm:h-5 h-4 sm:w-5 w-4' />
							{count} {count > 1 ? "Files" : "File"} Selected
						</h3>
					) : (
						<h3 className='sm:font-bold font-semibold sm:text-2xl text-lg'>Gallery</h3>
					)}

					<div
						onClick={handleDelete}
						className={`text-red-600 font-semibold sm:text-base text-sm hover:underline cursor-pointer ${
							checked.includes(true) ? "visible" : "hidden"
						}`}>
						Delete {count > 1 ? "Files" : "File"}
					</div>
				</div>
				<div className='bg-white xxs:px-10 px-2 py-10 border border-gray-300 shadow-md rounded-b-xl'>
					<div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5'>
						{images.map((image, index) => (
							<ImageItem key={index} index={index} image={image} />
						))}

            <div className="relative border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors ease-linear">
            <input
              type="file"
              multiple
              accept=".png, .webp, .jpg"
              name="images"
              id="images"
              className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
              title="Try to upload photos..."
              onChange={handleImageUpload}
            />
             <div className="h-full w-full flex flex-col justify-center items-center gap-y-4">
              <IoImage className="text-xl"/>
              <span className="whitespace-nowrap">Add Images</span>
            </div>

            </div>
					</div>
				</div>
			</div>
		</DndProvider>
	);
}

export default App;
