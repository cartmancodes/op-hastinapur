import React from 'react';

const ComingSoon = () => {
  return (
    <div class=" w-full min-h-[90vh] pt-20">
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 ">Coming Soon</h1>
          <p class="mt-3 text-lg text-gray-500 ">This Page is under construction.</p>
        </div>
        <div class="mt-10">
          <form class="mx-auto max-w-xs">
            <div class="flex items-center border-b border-gray-500 dark:border-gray-300 py-2">
              <input type="email"
                class="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Enter your email" />
              <button
                class="flex-shrink-0 bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit">
                Notify me
              </button>
            </div>
          </form>
          <p class="mt-2 text-center text-gray-500  text-xs">
            We'll notify you when we launch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
