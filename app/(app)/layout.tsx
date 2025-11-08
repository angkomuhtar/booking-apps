import AppFooter from "@/components/app-footer";
import AppNav from "@/components/app-navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-background font-sans'>
      <AppNav />
      {children}
      <AppFooter />
    </div>
  );
};

export default layout;
