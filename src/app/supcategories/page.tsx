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
    // لما تضغط على أي subcategory، هيفتح صفحة الـ subcategory details
    router.push(`/subcategory/${subId}`);
  };

  return (
    <div className='mt-10'>
      <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-blue-600 '>
        Sub Categories in {categoryName}
      </h2>

      {subCategories && subCategories.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'>
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              onClick={() => handleClick(sub._id)}
              className='p-4 border rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
            >
              {sub.name}
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500 dark:text-gray-400'>No subcategories available.</p>
      )}
    </div>
  );
};

export default SubCategories;
