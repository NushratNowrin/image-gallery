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
function App() {
	return (
		<div className='bg-slate-200 p-10'>
			<div className='bg-white p-8 border border-gray-300 shadow-md rounded-xl'>
				<div className='grid grid-cols-5 gap-5'>
					<div className='col-span-2 row-span-2 gallery-img'>
						<img src={img1} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img2} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img3} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img4} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img5} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img6} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img7} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img8} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img9} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img10} alt='' />
					</div>
					<div className="gallery-img">
						<img src={img2} alt='' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
