export default function ProductCard(props) {

  return (
    <div className="relative aspect-h-1 aspect-w-1 w-full lg:aspect-none  bg-white bg-clip-border border border-black text-gray-700 transition-shadow duration-300 hover:shadow-right-bottom hover:shadow-gray-400 cursor-pointer">
      
      {/* SVG Icon */}
      <div className="absolute top-[-1.5rem] left-[-1.5rem] z-20 ">
        <img src="/vouched.svg" alt="Icon" className="h-16 w-16" />
      </div>

      {/* Image */}
      <div className="aspect-square mx-2 mt-2 overflow-hidden border border-black bg-white bg-clip-border text-gray-700">
      <img
          src={
            props.item.items_images.length > 0
              ? props.item.items_images[0].image_url_arr[0]
              : '/images/missing.png'
          }
          className="h-full w-full object-cover"
          alt="Image"
        />
      </div>

      {/* Content */}
      <div className="px-2 py-3">
        <div className="mb-2 flex pb-1">
          <p className="block font-sans text-sm font-light leading-none text-blue-gray-900 antialiased">
            {props.item.category || "Category"}
          </p>
        </div>
        <div className="mb-2 flex text-base items-center justify-between">
          <p className="block font-sans text-base font-normal leading-none text-blue-gray-900 antialiased">
            {props.item.title || "Title"}
          </p>
        </div>
        <p className="block font-sans text-base font-normal leading-none text-blue-gray-900 antialiased">
          {'$' + props.item.price || "Price"}
        </p>
      </div>

    </div>
  );
}
