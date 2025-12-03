import React from 'react';
import LeftSideNav from './components/leftSideNav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Fixed width for desktop, hidden on mobile */}
        <div className="hidden lg:block w-72 xl:w-80 bg-white border-r border-gray-200 shadow-sm">
          <LeftSideNav />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-linear-to-br from-gray-50 to-white">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;