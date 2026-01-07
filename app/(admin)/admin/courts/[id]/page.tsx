import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className='flex flex-1 flex-col p-4 pt-0 font-sans'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-6'>
        <div className='flex flex-col justify-center gap-2'>
          <div className='flex items-center justify-start gap-2'>
            <Link href='/admin/courts'>
              <Button
                variant='link'
                size='icon'
                className='p-0 cursor-pointer text-black'>
                <ArrowLeft className='size-4' />
              </Button>
            </Link>
            <h1 className='text-xl font-medium leading-none text-mono'>
              Detail Court
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
