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

import "./App.css";
import { useState } from "react";
function App() {
	const [checked, setChecked] = useState(Array(10).fill(false));
	const handleChecked = (index) => {
		const newState = checked.map((item, i) => (i === index ? !item : item));
		setChecked(newState);
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

				<div
					className={`text-red-600 font-semibold ${
						checked.includes(true) ? "visible" : "hidden"
					}`}>
					Delete {count > 1 ? "Files" : "File"}
				</div>
			</div>
			<div className='bg-white p-10 border border-gray-300 shadow-md rounded-b-xl'>
				<div className='grid grid-cols-5 gap-5'>
					<div className='col-span-2 row-span-2 gallery-img' draggable>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[0] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(0)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img1} alt='' />
					</div>
					<div className='gallery-img' draggable>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[1] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(1)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img2} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[2] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(2)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img3} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[3] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(3)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img4} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[4] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(4)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img5} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[5] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(5)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img6} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[6] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(6)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img7} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[7] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(7)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img8} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[8] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(8)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img9} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[9] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(9)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img10} alt='' />
					</div>
					<div className='gallery-img'>
						<div
							className={`gallery-img-hover bg-opacity-60 ${
								checked[10] == true ? "bg-white h-[100%]" : "bg-black"
							} `}>
							{" "}
							<input
								type='checkbox'
								onChange={() => handleChecked(10)}
								className='h-5 w-5 m-5'
							/>
						</div>

						<img src={img2} alt='' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
