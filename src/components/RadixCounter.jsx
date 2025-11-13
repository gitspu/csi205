import { useState } from "react"

const RadixCounter = () => {

    const [value, setValue] = useState(0)

    // Logics for button clicks (Click Handlers)

    const minusClicked = () => {
        // เมื่อค่าเป็น 0 หรือต่ำกว่า จะวนกลับไปที่ค่าสูงสุด (4095)
        if (value <= 0) {
            setValue(4095)
        } else {
            setValue(prev => prev - 1)
        }
    }

    const resetClicked = () => {
        setValue(0)
    }

    const plusClicked = () => {
        // เมื่อค่าถึง 4095 หรือสูงกว่า จะวนกลับไปที่ 0
        if (value >= 4095) {
            setValue(0)
        } else {
            setValue(prev => prev + 1)
        }
    }

    // Conversion Logic for Display (แก้ไขส่วนนี้)
    
    // [HEX] ฐาน 16: .toString(16) -> แปลงเป็นตัวพิมพ์ใหญ่ (.toUpperCase()) และเติม 0 ให้ครบ 3 หลัก
    const hexValue = value.toString(16).toUpperCase().padStart(3, '0')
    
    // [OCT] ฐาน 8: .toString(8) -> เติม 0 ให้ครบ 4 หลัก
    const octValue = value.toString(8).padStart(4, '0')
    
    // [BIN] ฐาน 2: .toString(2) -> เติม 0 ให้ครบ 12 หลัก (เพราะ 4095 คือ 2^12 - 1)
    const binValue = value.toString(2).padStart(12, '0')

    // [DEX] ฐาน 10: .toString(10) หรือ .toString() ปกติ -> เติม 0 ให้ครบ 4 หลัก
    const dexValue = value.toString().padStart(4, '0')


    return(
        <div className='border border-2 border-black rounded-3 p-3 m-auto mt-5' style={{width:'400px'}}>
            <div className='text-center fw-bold fs-4'>RADIX COUNTER</div>

            <div className='d-flex justify-content-between mt-3'>
                <div className='text-center'>
                    <div className="fw-bold">[HEX]</div>
                    <div className="font-monospace">
                        {/* แสดงผลค่า HEX ที่ถูกต้อง */}
                        {hexValue}
                    </div>
                </div>
                <div className='text-center'>
                    <div className="fw-bold">[DEX]</div>
                    <div className="font-monospace text-primary fw-bold">
                        {/* แสดงผลค่า DEX */}
                        {dexValue}
                    </div>
                </div>
                <div className='text-center'>
                    <div className="fw-bold">[OCT]</div>
                    <div className="font-monospace">
                        {/* แสดงผลค่า OCT ที่ถูกต้อง */}
                        {octValue}
                    </div>
                </div>
                <div className='text-center'>
                    <div className="fw-bold">[BIN]</div>
                    <div className="font-monospace">
                        {/* แสดงผลค่า BIN ที่ถูกต้อง */}
                        {binValue}
                    </div>
                </div>

            </div>

            <div className='mt-3 d-flex justify-content-around'>
                <button className='btn btn-danger px-4' onClick={ minusClicked}>&minus;</button>
                <button className='btn btn-secondary px-4' onClick={ resetClicked}>RESET</button>
                <button className='btn btn-success px-4' onClick={ plusClicked}>+</button>
            </div>
                        
        </div>
    )
}

export default RadixCounter