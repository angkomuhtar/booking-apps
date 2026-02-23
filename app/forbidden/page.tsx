import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Forbidden() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Image src='image/403.svg' alt='Forbidden' width={300} height={300} />
      <p className='text-2xl text-muted-foreground max-w-sm text-center'>
        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>
      <Button asChild className='mt-4 text-lg rounded-full font-bold'>
        <Link href='/'>Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
