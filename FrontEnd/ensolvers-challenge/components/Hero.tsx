export const Hero = () => {
    const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
    return (
      <div className="text-left w-full">
        <h1 className="text-gray-700 text-[20px] dark:text-white">Hello, these are your notes</h1>
        <p className="text-gray-400 text-[12px]">{formattedDate}</p>
      </div>
    );
  };
  