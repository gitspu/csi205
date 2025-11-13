import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AppFooter = () => {
    return ( 
        <div>
            <h3 className="text-center mt-5 pt-5">
                มหาวิทยาลัยศรีปทุม คณะเทคโนโลยีสารสนเทศ สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์
            </h3>
            <p className='d-flex justify-content-center gap-3'>
                <i className="bi bi-facebook" style={{ fontSize: "2rem", color: "#1877F2" }}></i>
                <i className="bi bi-instagram" style={{fontSize: "2rem", color: "#E1306C" }}></i>
            </p>
        </div>
     );
}
 
export default AppFooter;