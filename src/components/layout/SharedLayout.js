import React from 'react';
import Topbar from '../topbar/Topbar';
import "./sharedLayout.scss"

const SharedLayout = ({ children }) => {
     return (
        <>
            <Topbar/>
            <main>
                <div className="pagecontent">
                    {children}
                </div>
            </main>
        </>
    );
};

export default SharedLayout;
