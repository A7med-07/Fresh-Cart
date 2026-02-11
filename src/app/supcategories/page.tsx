'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface SubCategory {
  _id: string;
  name: string;
}

interface Props {
  subCategories: SubCategory[];
  categoryName: string;
}

const SubCategories: React.FC<Props> = ({ subCategories, categoryName }) => {
  const router = useRouter();

  const handleClick = (subId: string) => {
    router.push(`/subcategory/${subId}`);
  };

  return (
    <div className='mt-16 opacity-0 animate-[fadeIn_0.6s_ease-out_0.4s_forwards]'>
      <div className="mb-8">
        <h2 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3'>
          Sub Categories in {categoryName}
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
      </div>

      {subCategories && subCategories.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {subCategories.map((sub, index) => (
            <button
              key={sub._id}
              onClick={() => handleClick(sub._id)}
              className='group p-5 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-center hover:border-blue-500 bg-white dark:bg-gray-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 font-semibold shadow-sm hover:shadow-lg transform hover:scale-105 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]'
              style={{ animationDelay: `${0.5 + index * 0.05}s` }}
            >
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {sub.name}
              </span>
              
              {/* Bottom accent line on hover */}
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 transition-all duration-500"></div>
            </button>
          ))}
        </div>
      ) : (
        <div className='text-center py-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-inner'>
          <p className='text-gray-500 dark:text-gray-400 text-lg'>No subcategories available.</p>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SubCategories;