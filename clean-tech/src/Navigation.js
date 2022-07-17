import { Navbar , Nav , Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Navigation.css';




const Navigation = () => {

  return (
  <Navbar className='Navbar'>
    <Container>
    
    <Navbar.Brand href="#home" style={{color:'black'}}> TACGF</Navbar.Brand>
    <Nav className="justify-content-end">
      <Link to="/Home" style={{textDecoration:'none',color:'black',padding:5}} > Home </Link>
      <Link to="/About" style={{textDecoration:'none',color:'black',padding:5}} > About </Link>
      <Link to="/Register" style={{textDecoration:'none',color:'black',padding:5}} > Register </Link>
    </Nav>
    </Container>
  </Navbar>
  );

}
export default Navigation;