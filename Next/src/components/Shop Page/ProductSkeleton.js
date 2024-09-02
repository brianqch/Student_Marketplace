import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function ProductSkeleton() {
  return (
    <div className="relative aspect-square w-full lg:aspect-none bg-white bg-clip-border border border-[#d4d4d8] text-gray-700">
      {" "}
      {/* Skeleton for the image */}
      <div className="aspect-square mx-2 mt-2 overflow-hidden border border-[#d4d4d8] bg-white bg-clip-border text-gray-700">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
      {/* Skeleton for the content */}
      <div className="px-2 py-2">
        {/* Skeleton for the category */}
        <div className="flex pb-1">
          <Skeleton variant="text" width="40%" height={20} />
        </div>

        {/* Skeleton for the title */}
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width="60%" height={25} />
        </div>

        {/* Skeleton for the price */}
        <Skeleton variant="text" width="30%" height={25} />
      </div>
    </div>
  );
}
