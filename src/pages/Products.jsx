import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Products = ({ products, carts, setCarts }) => {
    return (
        <div style={{ height: "560px", overflowY: "auto" }}>
            <h2 className="text-center mb-4">PRODUCTS PAGES</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div className="col" key={product.id}>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src='product.thumbnailUrl'/>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.price.toFixed(2)}</Card.Text>
                                <Button variant="primary" onClick={ () => {
                                    setCarts([...carts, product])
                                }}>Add to Carts</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;