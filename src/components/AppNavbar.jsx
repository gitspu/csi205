import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AppNabar = ({ products, carts, setToken }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken('');
        navigate('/login'); 
    }

    return (
        <div className="d-flex justify-content-center gap-3 mb-5">
            <Link to={'home'}>
                <Button variant="outline-primary">Home</Button>
            </Link>
            <Link to={'calculator'}>
                <Button variant="outline-primary">Calculator</Button>
            </Link>
            <Link to={'animation'}>
                <Button variant="outline-primary">Animation</Button>
            </Link>
            <Link to={'components'}>
                <Button variant="outline-primary">Components</Button>
            </Link>
            <Link to={'todos'}>
                <Button variant="outline-primary">Todos</Button>
            </Link>
            <Link to={'products'}>
                <Button variant="outline-primary">Products ({products.length})</Button>
            </Link>
            <Link to={'carts'}>
                <Button variant="outline-primary position-relative">
                    Carts
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {carts.length < 10 ? carts.length : "9+"}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </Button>
            </Link>
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default AppNabar;
