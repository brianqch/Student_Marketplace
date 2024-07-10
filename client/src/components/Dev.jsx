export default function Dev() {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-custom_right bg-custom_gray">
            <img className="w-full rounded-lg p-2" src="..\src\assets\itemImages\couch.jpg" alt="Card image cap" />
            <div className="px-6 py-4">
                <div className="font-semibold text-3xl ">Card Title</div>
                <div className="font-semibold text-2xl mb-2">Price</div>

                <p className="text-gray-700 text-base">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <a href="#" className="inline-block bg-blue-500 text-white py-2 px-4 rounded mt-2">Go somewhere</a>
            </div>
        </div>
    );
}
