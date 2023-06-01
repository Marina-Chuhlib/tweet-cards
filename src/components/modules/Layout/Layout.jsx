import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default Layout;
