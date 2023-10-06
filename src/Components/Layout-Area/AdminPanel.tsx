import { Button, Container, Nav, Offcanvas } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { logout } from "./Header";

interface AdminPanelProps {
  handleClose: Function;
};

const AdminPanel = (props: AdminPanelProps) => {
  return (
    <Container>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          Admin Panel
        </Offcanvas.Title>

        <Button
          size='sm'
          variant='danger'
          onClick={() => {
            logout();
            props.handleClose();
          }}
        >
          Logout
        </Button>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Nav className="flex-column" onClick={() => props.handleClose()}>
          <Nav.Link className="mt-2" as={NavLink} to="/phones">
            Phones
          </Nav.Link>

          <Nav.Link className="mt-2" as={NavLink} to="/brands">
            Brands
          </Nav.Link>

          <Nav.Link className="mt-2" as={NavLink} to="/admin/top-phones">
            Update Top Products
          </Nav.Link>

          <Nav.Link className="mt-2" as={NavLink} to="/admin/top-brands">
            Update Top brands
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Container>
  );
};

export default AdminPanel;