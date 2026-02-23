import React from "react";

const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className='flex flex-col justify-center gap-2'>
      <h1 className='text-lg font-medium leading-none text-mono'>{title}</h1>
      <div className='flex items-center gap-2 text-xs font-normal text-muted-foreground'>
        {subtitle}
      </div>
    </div>
  );
};

export default PageHeader;
