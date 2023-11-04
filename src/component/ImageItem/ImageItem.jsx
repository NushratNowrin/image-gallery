// ImageItem.jsx

// import for Drag and Drop, from react-dnd
import { useDrag, useDrop } from "react-dnd";
// import featured image icon for setting as featured img
import { MdFeaturedVideo } from "react-icons/md";
// import css file
import "./ImageItem.css"

const ImageItem = ({ index, image, handleChecked, checked, setChecked, images, setImages }) => {

    // img moving element for drag and drop
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

    // Dragging Element
	const [{ isDragging }, drag] = useDrag({
		type: "IMAGE",
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

    // Dropping Element
	const [, drop] = useDrop({
		accept: "IMAGE",
		hover(item) {
			if (item.index !== index) {
				moveImage(item.index, index);
				item.index = index;
			}
		},
	});

    // Set as featured img functionality
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
					className='h-5 w-5 m-5'
				/>
				{checked[index] || index === 0 ? (
					""
				) : (
					<button
						className='featured-button text-orange-200 transition-all hover:text-orange-400'
						onClick={() => handleSetFeatureImage(index)}
						title='Set as Featured Image'>
						<MdFeaturedVideo className='lg:text-xl text-lg' />
					</button>
				)}
			</div>

			<img src={image} alt='' />
		</div>
	);
};

export default ImageItem;
