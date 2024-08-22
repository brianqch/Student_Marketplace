
export default function PreloadProductCard() {

  return (
    <div className="relative aspect-h-1 aspect-w-1 w-full lg:aspect-none bg-white bg-clip-border border border-black text-gray-700 transition-shadow duration-300 hover:shadow-right-bottom hover:shadow-gray-400 cursor-pointer on"
    >

      {/* Image */}
      <div className="aspect-square mx-2 mt-2 overflow-hidden border border-black bg-white bg-clip-border text-gray-700">
        <span className="h-full w-20 bg-gray-500"></span>
      </div>

      {/* Content */}
      <div className="px-2 py-3">
        <div className="mb-2 flex pb-1">
          <span className="bg-gray-500 w-3/4"></span>
        </div>
        <div className="mb-2 flex text-base items-center justify-between">
            <span className="bg-gray-500 w-1/2" ></span>
        </div>
            <span className="bg-gray-500 w-1/4" ></span>
      </div>

    </div>
  );
}
