"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { OrdersColumn } from "./columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getStatusColor } from "@/lib/status_helpers";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface DetailsSheetProps {
  data: OrdersColumn | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HeaderTitle = ({
  value,
  title,
}: {
  value: string | React.ReactNode;
  title: string;
}) => (
  <div className='gap-2'>
    <p className='text-xs text-muted-foreground mb-1.5'>{title}</p>
    <h2 className='text-sm font-semibold'>{value}</h2>
  </div>
);

export function DetailsSheet({ data, open, onOpenChange }: DetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='inset-y-4 sm:right-4 rounded-md h-auto sm:w-3/5 w-full sm:max-w-full gap-0 '>
        <SheetHeader>
          <SheetTitle>Detail Order</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className='px-4'>
          {data && (
            <Card className='py-0'>
              <CardHeader className='px-0 py-0'>
                <div className='flex-1 grid grid-cols-2 md:grid-cols-4 items-center gap-2 md:gap-x-4 md:gap-y-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 bg-muted rounded-t-lg py-4'>
                  <HeaderTitle value={data?.venue.name} title='Venue' />
                  <HeaderTitle
                    value={`#${data?.orderNumber}`}
                    title='OrderId'
                  />
                  <HeaderTitle
                    value={`Rp ${data?.totalPrice.toLocaleString()}`}
                    title='Total Price'
                  />
                  <HeaderTitle
                    value={format(data?.createdAt, "PPP p")}
                    title='Order Date'
                  />
                  <HeaderTitle title='User' value={data?.user.name} />
                  <HeaderTitle
                    value={
                      <Badge
                        className={
                          data?.status && getStatusColor(data.status)?.color
                        }>
                        {data && getStatusColor(data?.status)?.text}
                      </Badge>
                    }
                    title='Status'
                  />
                </div>
              </CardHeader>
              <CardContent className='pb-6'>
                <div className='space-y-4'>
                  {data.items
                    .filter((item) => item.itemType === "COURT_BOOKING")
                    .map((item) => (
                      <div
                        key={item.id}
                        className='grid md:flex justify-between text-sm border border-muted-foreground/20 rounded-lg py-2 px-4 gap-4 grid-cols-2'>
                        <div>
                          <p className='text-muted-foreground text-xs'>Court</p>
                          <h2 className='font-semibold'>{item.name}</h2>
                        </div>
                        <div>
                          <p className='text-muted-foreground text-xs'>
                            Tanggal
                          </p>
                          <h2 className='font-semibold'>
                            {item.date
                              ? format(new Date(item.date), "dd MMM yyyy")
                              : "-"}
                          </h2>
                        </div>
                        <div>
                          <p className='text-muted-foreground text-xs'>Waktu</p>
                          <h2 className='font-semibold'>
                            {item.startTime} - {item.endTime}
                          </h2>
                        </div>
                        <div className='text-right md:text-left flex-1 col-span-2'>
                          <p className='text-right'>x {item.quantity}</p>
                          <p className='font-semibold text-right'>
                            Rp {item.price.toLocaleString()}{" "}
                          </p>
                        </div>
                      </div>
                    ))}

                  {data.items.filter((item) => item.itemType === "PRODUCT")
                    .length > 0 && (
                    <h3 className='font-semibold text-lg mt-4'>
                      Produk Lainnya
                    </h3>
                  )}
                  <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
                    {data.items
                      .filter((item) => item.itemType === "PRODUCT")
                      .map((item) => (
                        <div key={item.id} className='border rounded-xl p-2'>
                          <div className='flex flex-col h-full'>
                            <div className='flex-1'>
                              <h2 className='font-semibold mb-3 text-sm line-clamp-1'>
                                {item.name}
                              </h2>
                            </div>
                            <div className='flex items-center justify-end gap-2'>
                              <p className='font-semibold text-sm text-right'>
                                Rp {item.price.toLocaleString()}
                              </p>
                              <p className='text-xs text-muted-foreground'>
                                x {item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {data.notes && (
                    <div className='mt-4 text-sm'>
                      <p className='text-muted-foreground'>Notes</p>
                      <p>{data.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <SheetFooter className='pb-4 border-t'>
          <div className='flex justify-end gap-2'>
            <SheetClose asChild>
              <Button variant='outline'>Batal</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
