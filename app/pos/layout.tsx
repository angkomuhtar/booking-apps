import { auth } from "@/auth";
import ClientProvider from "@/components/pos/client-provider";
import PosSidebar from "@/components/pos/pos-sidebar";
import { Avatar } from "@/components/ui/avatar";
import VenueSwitcher from "@/components/venue-switcher";
import { getAccessibleVenues, requirePermission } from "@/lib/auth-helpers";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const accessibleVenues = await getAccessibleVenues();
  const session = await auth();

  await requirePermission("pos.access");

  return (
    <ClientProvider>
      <main className='bg-gray-200 h-screen flex flex-col overflow-hidden'>
        <nav className='bg-white py-2 px-4 border-b shadow-xs flex justify-between items-center'>
          <VenueSwitcher venues={accessibleVenues} />
          <div className='flex items-center gap-2.5 px-3 py-2'>
            <Avatar>
              <span className='sr-only'>{session?.user?.name}</span>
              <div className='bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full'>
                {session?.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
            </Avatar>
            <div>
              <p className='text-sm font-medium text-gray-700'>
                {session?.user?.name || "User"}
              </p>
              <p className='text-xs text-gray-500'>
                {session?.user?.role || "Role"}
              </p>
            </div>
          </div>
        </nav>
        {/* sidebar */}
        <div className='flex flex-1 w-full overflow-hidden'>
          <PosSidebar />
          <div className='flex-1 flex'>{children}</div>
        </div>
      </main>
    </ClientProvider>
  );
};

export default layout;
