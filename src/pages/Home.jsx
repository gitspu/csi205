const Home = () => {
    return (
        <div className="container my-5">
            
            <div className="card shadow-lg mx-auto" style={{ maxWidth: "400px" }}>
                <div className="card-body text-center">
                    
                    <img 
                        src="./Imgpic/stdempimg.jpg" 
                        alt="Student" 
                        className="img-fluid rounded-circle border border-3 border-primary mb-3" 
                        style={{ width: "200px", height: "200px", objectFit: "cover" }}
                    />

                    
                    <h5 className="card-title fw-bold">67158185 นายณัฐพล โพธิรัตน์</h5>
                    <p className="card-text mb-1">ชั้นปีที่ 2</p>
                    <p className="card-text mb-1">มหาวิทยาลัยศรีปทุม</p>
                    <p className="card-text mb-3">
                        คณะเทคโนโลยีสารสนเทศ <br /> 
                        สาขาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์
                    </p>

                   
                    <div className="alert alert-primary mt-3 fs-5">
                        แนะนำตัวเอง 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
