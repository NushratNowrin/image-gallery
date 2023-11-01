import "./App.css";
import { useState } from "react";

function App() {
	const [checked, setChecked] = useState(Array(11).fill(false));
  const [images, setImages] = useState([
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
  ]);
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
  };

	const count = checked.reduce((accumulator, currentValue) => {
		return currentValue === true ? accumulator + 1 : accumulator;
	}, 0);
	// console.log(checked)
	// console.log(count)
	return (
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

				<div onClick={handleDelete}
					className={`text-red-600 font-semibold hover:underline cursor-pointer ${
						checked.includes(true) ? "visible" : "hidden"
					}`}>
					Delete {count > 1 ? "Files" : "File"}
				</div>
			</div>
			<div className='bg-white p-10 border border-gray-300 shadow-md rounded-b-xl'>
				<div className='grid grid-cols-5 gap-5'>
        {images.map((image, index) => (
            <div key={index} className={`gallery-img ${index === 0 ? "col-span-2 row-span-2" : ""}`}
            draggable>
              <div
                className={`gallery-img-hover bg-opacity-60 ${
                  checked[index] ? "bg-white h-[100%]" : "bg-black"
                } `}
              >
                <input
                  type="checkbox"
                  onChange={() => handleChecked(index)}
                  className="h-5 w-5 m-5"
                />
                {
                  (checked[index] || index == 0 ) ? "" :
                  <button className="featured-button  bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 transition-all" onClick={() => handleSetFeatureImage(index)}>Set Featured</button> 
                }
              </div>

              <img src={image} alt="" 
                />
            </div>
          ))}
				</div>
			</div>
		</div>
	);
}

export default App;
