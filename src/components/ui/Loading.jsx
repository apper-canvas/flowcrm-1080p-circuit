import React from "react";
import Card from "@/components/atoms/Card";

const Loading = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <Card key={item} className="p-6 animate-pulse">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mr-4 shimmer"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-2">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 shimmer"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 shimmer"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                  <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded shimmer"></div>
                </div>
              </div>
              <div className="ml-16 space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 shimmer"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-36 shimmer"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28 shimmer"></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Loading;