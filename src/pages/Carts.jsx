import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Carts = ({ carts, setCarts }) => {
    return (
        <div className="carts-container">
            <h2 className="text-center mb-4">CARTS PAGES</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {carts.map((cart) => (
                    <div className="col" key={cart.id}>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src={cart.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>{cart.title}</Card.Title>
                                <Card.Text>${cart.price}</Card.Text>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => {
                                        setCarts(carts.filter((c) => c.id !== cart.id));
                                    }}
                                >
                                    Remove from Carts
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <div className='d-flex justify-content-center mt-4'>
                <h4>
                    Items: {carts.length} items - Total Price: $
                    {carts.reduce((prev, item) => prev + item.price, 0).toFixed(2)}
                </h4>
            </div>

            <div className='d-flex justify-content-center mt-3'>
                <button className="btn btn-success">Checkout</button>
            </div>
        </div>
    );
};

export default Carts;