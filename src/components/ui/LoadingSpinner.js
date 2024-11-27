const LoadingSpinner = () => {
  return (
    <div className='outlet-height w-full flex justify-center items-center'>
      <div className='w-12 h-12 border-2 border-indigo-600 border-t-0 rounded-full animate-spin' />
    </div>
  );
};

export default LoadingSpinner;
