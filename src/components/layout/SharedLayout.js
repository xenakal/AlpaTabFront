import Topbar  from '../topbar/Topbar';
import "./sharedLayout.scss"

const SharedLayout = ({ children }) => {
     return (
        <>
            <Topbar/>
            <main className="background">
                <div className="root">
                    <div className="pagecontent">
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
};

export default SharedLayout;
