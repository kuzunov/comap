import { Outlet } from 'react-router-dom';

import Header from './Header';
import { UserContextProvider } from '../users/UserContext';
import Footer from './Footer';
import { Container } from '@mui/material';


function App() {
  return (
    <>
    <UserContextProvider>
      <Header />
      <Container sx={{marginBottom:"100px", marginTop:"100px"}}>
        {/* <Sidebar /> */}
        <Outlet />
      </Container>
      <Footer />
    </UserContextProvider>
    </>
  );
}

export default App;
