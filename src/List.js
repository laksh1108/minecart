import React ,{useState}from "react";
import { products } from "./Product";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Container, Card, Row, Col, Nav } from "react-bootstrap";
import SearchBar from "./SearchBar";

const List = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Navbar
        bg="secondary"
        expand="lg"
        className="d-flex justify-content-center"
      >
        <h1 className="text-light tes">The Generics</h1>
      </Navbar>
      <div className="text-center font-italic fw-bolder fs-2">iProducts</div>
      <div className="text-center">
      <FontAwesomeIcon icon={faSearch}  className="px-2"/>
      <SearchBar handleSearch={handleSearch} />{" "}
      </div>
      
      
      <Container>
        <Row className="mx-2 mx-md-4 mx-lg-5">
          {filteredProducts.map((item) => (
            <Col md={6} lg={4} xl={3} key={item.id}>
              <Card className="m-2">
                <Nav.Link
                  href={`/list/${item.id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Title className="text-center fw-bolder">
                    {item.name}
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src={item.img1}
                    className="img-fluid"
                    alt={item.name}
                  />
                  <Card.Text className="fw-bolder">${item.price}</Card.Text>
                </Nav.Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default List;
