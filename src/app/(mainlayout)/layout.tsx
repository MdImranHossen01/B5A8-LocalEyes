import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <main>{children}</main>
              <Footer/>
        </div>
    );
};

export default MainLayout;