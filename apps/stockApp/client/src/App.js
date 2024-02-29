import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
// import Schwab from './components/schwab/schwab'
// import Idragon from './components/idragon/idragon'
import VmiUS from './components/vmiUS/vmiUS'
import VmiVN from './components/vmiVN/vmiVN'

//import for bootstrap working in dev_env but when deploy to heroku maybe fail
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<>
			<Navbar expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="/stockApp">idrsch-Vmi</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse id="basic-navbar-nav">
						{/* <Nav>
							<NavItem href="/schwab">
								<Nav.Link as={Link} to="/schwab" >Schwab</Nav.Link>
							</NavItem>
						</Nav>
						<Nav>
							<NavItem href="/idragon">
								<Nav.Link as={Link} to="/idragon" >Idragon</Nav.Link>
							</NavItem>
						</Nav> */}
						<Nav> 
							<NavItem href="/vmiUS">
								<Nav.Link as={Link} to="/vmiUS">VmiUS</Nav.Link>
							</NavItem>
						</Nav>
						<Nav>
							<NavItem href="/vmiVN">
								<Nav.Link as={Link} to="/vmiVN">VmiVN</Nav.Link>
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Switch>
				<Route path="/vmiUS">
					<VmiUS />
				</Route>
				{/* <Route path="/schwab">
					<Schwab />
				</Route>
				<Route path="/idragon">
					<Idragon />
				</Route> */}
				<Route path="/vmiVN">
					<VmiVN />
				</Route>
				<Route path="/">
					<VmiUS />
				</Route>
			</Switch>
		</>
	)
}

export default App;
