

export default function ProductCard(props) {
  // product card ref: https://tailwindcomponents.com/component/tailwind-css-ecommerce-card-by-material-tailwind
  return (

    <div className="aspect-h-1 aspect-w-1 w-full lg:aspect-none overflow-hidden rounded-md bg-white bg-clip-border text-gray-700 shadow-md cursor-pointer">
      <div className="aspect-square mx-4 mt-4 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
          className="h-full w-full object-cover"
          alt="Image"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="block font-sans text-base font-semibold leading-relaxed text-blue-gray-900 antialiased">
            {props.item.item_title || "Title"}
          </p>
          <p className="block font-sans text-base font-semibold	 leading-relaxed text-blue-gray-900 antialiased">
            {'$'+props.item.item_price || "Price"}
          </p>
        </div>
        <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
          {props.item.item_description || "Description"}
        </p>
      </div>
     
    </div>
  );
}