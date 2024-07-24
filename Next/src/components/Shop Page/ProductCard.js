

export default function ProductCard(props) {
  // product card ref: https://tailwindcomponents.com/component/tailwind-css-ecommerce-card-by-material-tailwind
  return (

    <div className="aspect-h-1 aspect-w-1 w-full lg:aspect-none overflow-hidden bg-white bg-clip-border border border-black text-gray-700 transition-shadow duration-300 hover:shadow-right-bottom hover:shadow-gray-400 cursor-pointer">
      {/* Image */}
      <div className="aspect-square mx-2 mt-2 overflow-hidden border border-black bg-white bg-clip-border text-gray-700">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
          className="h-full w-full object-cover"
          alt="Image"
        />
      </div>
      {/* Content */}
      <div className="px-2 py-3">
        <div className="mb-2 flex pb-1">
          <p className="block font-sans text-sm font-light leading-none text-blue-gray-900 antialiased">
            {props.item.item_category || "Category"}
          </p>
        </div>
        <div className="mb-2 flex text-base items-center justify-between">
          <p className="block font-sans text-base font-normal leading-none text-blue-gray-900 antialiased">
            {props.item.item_title || "Title"}
          </p>
        </div>
        <p className="block font-sans text-base font-normal	leading-none text-blue-gray-900 antialiased">
            {'$'+props.item.item_price || "Price"}
          </p>
      </div>
     
    </div>
  );
}