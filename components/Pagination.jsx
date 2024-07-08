import React from 'react';
import { useSearchParams } from 'next/navigation';

const Pagination = ({ total, limit }) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || 1);
  const totalPages = Math.ceil(total / limit);

  // Fungsi untuk membuat daftar halaman
  const getPageRange = () => {
    const pageRange = [];
    const maxVisiblePages = 3; // Jumlah maksimal halaman yang ditampilkan sebelum menggunakan "..."
    
    // Jika total halaman <= maxVisiblePages, tampilkan semua halaman
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageRange.push(i);
      }
    } else {
      // Jika total halaman > maxVisiblePages, atur untuk hanya menampilkan maxVisiblePages halaman
      const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
      
      // Tambahkan halaman awal
      for (let i = 1; i <= halfMaxVisiblePages; i++) {
        pageRange.push(i);
      }
      
      // Tambahkan "..." jika halaman saat ini lebih besar dari setengah maksimal halaman yang terlihat
      if (page > halfMaxVisiblePages + 1) {
        pageRange.push('...');
      }
      
      // Tambahkan halaman di sekitar halaman saat ini
      const start = Math.max(page - halfMaxVisiblePages, halfMaxVisiblePages + 1);
      const end = Math.min(page + halfMaxVisiblePages, totalPages - halfMaxVisiblePages);
      
      for (let i = start; i <= end; i++) {
        pageRange.push(i);
      }
      
      // Tambahkan "..." jika halaman terakhir lebih kecil dari total halaman
      if (page < totalPages - halfMaxVisiblePages) {
        pageRange.push('...');
      }
      
      // Tambahkan halaman terakhir
      for (let i = totalPages - halfMaxVisiblePages + 1; i <= totalPages; i++) {
        pageRange.push(i);
      }
    }
    
    return pageRange;
  };

  return (
    <nav aria-label="Page navigation example px-4">
      <ul className="inline-flex -space-x-px text-base h-8">
        <li className='hidden sm:block'>
          <a
            href={`?page=${Math.max(page - 1, 1)}`}
            className={`flex items-center justify-center px-4 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            disabled={page === 1}
          >
            Previous
          </a>
        </li>
        
        {/* Render daftar halaman */}
        {getPageRange().map((pageNumber, index) => (
          <li key={index}>
            {pageNumber === '...' ? (
              <span className="flex items-center justify-center px-4 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</span>
            ) : (
              <a
                href={`?page=${pageNumber}`}
                className={`flex items-center justify-center px-4 h-8 leading-tight ${
                  pageNumber === page ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                {pageNumber}
              </a>
            )}
          </li>
        ))}

        <li className='hidden sm:block'>
          <a
            href={`?page=${Math.min(page + 1, totalPages)}`}
            className={`flex items-center justify-center px-4 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            disabled={page === totalPages}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
