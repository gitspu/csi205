import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const Calculator = () => {
  const [screen, setScreen] = useState("0");
  const [operator, setOperator] = useState(null);
  const [state, setState] = useState("S0");
  const [operand1, setOperand1] = useState(null);
  const [operand2, setOperand2] = useState(undefined);

  const numberClick = (number) => {
    if (state === "S0") {
      setScreen(number.toString());
      setState("S1");
    } else if (state === "S1") {
      if (screen.length <= 9) setScreen(screen + number.toString());
    } else if (state === "S2") {
      setScreen(number.toString());
      setState("S3");
    } else if (state === "S3") {
      if (screen.length <= 9) setScreen(screen + number.toString());
    }
    setOperand2(undefined);
  };

  const operatorClick = (op) => {
    if (state === "S1" || state === "S3") {
      setOperand1(Number(screen));
      setOperator(op);
      setState("S2");
    } else if (state === "S2") {
      setOperator(op);
    }
  };

  const equalClick = () => {
    if (operator !== null && operand1 !== null) {
      const op2 = operand2 !== undefined ? operand2 : Number(screen);
      let result = 0;
      if (operator === "+") result = operand1 + op2;
      else if (operator === "-") result = operand1 - op2;
      else if (operator === "*") result = operand1 * op2;

      setScreen(result.toString());
      setOperand1(result);
      setState("S1");
    }
  };

  const clearClick = () => {
    setScreen("0");
    setOperator(null);
    setOperand1(null);
    setState("S0");
  };

  const handleKeyDown = (event) => {
    if (event.key >= "0" && event.key <= "9") numberClick(Number(event.key));
    else if (event.key === "+") operatorClick("+");
    else if (event.key === "-") operatorClick("-");
    else if (event.key === "*") operatorClick("*");
    else if (event.key === "=" || event.key === "Enter") {
      equalClick();
      event.preventDefault();
    } else if (event.key === "Escape") clearClick();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  // ปุ่มตัวเลขและเครื่องหมาย
  const numberRows = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", "."],
  ];

  return (
    <Container className="text-center my-5">
      <h2 className="mb-4">CALCULATOR PAGE</h2>

      <Card
        className="shadow-lg mx-auto p-3"
        style={{ maxWidth: "400px", backgroundColor: "#f8f9fa" }}
      >
        {/* หน้าจอแสดงผล */}
        <Card.Body className="mb-3">
          <div
            style={{
              fontSize: "60px",
              textAlign: "right",
              paddingRight: "15px",
              border: "2px solid #6c757d",
              borderRadius: "10px",
              backgroundColor: "#fff",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {screen}
          </div>
        </Card.Body>

        {/* แถวปุ่ม MC, MR, M+, M-, C */}
        <Row className="mb-2 g-2">
          {["MC", "MR", "M+", "M-"].map((btn) => (
            <Col key={btn}>
              <Button variant="secondary" disabled className="w-100">
                {btn}
              </Button>
            </Col>
          ))}
          <Col>
            <Button
              variant="danger"
              onClick={clearClick}
              className="w-100 fw-bold"
            >
              {screen !== "0" ? "C" : "CE"}
            </Button>
          </Col>
        </Row>

        {/* แถวตัวเลขและ operator */}
        {numberRows.map((row, i) => (
          <Row key={i} className="mb-2 g-2">
            {row.map((num) => (
              <Col key={num}>
                <Button
                  variant="light"
                  onClick={() => numberClick(Number(num))}
                  className="w-100 py-3 fs-4"
                >
                  {num}
                </Button>
              </Col>
            ))}

            {/* แถวเครื่องหมายเฉพาะ */}
            {i === 0 && (
              <>
                <Col>
                  <Button variant="warning" disabled className="w-100 py-3 fs-4">
                    ÷
                  </Button>
                </Col>
                <Col>
                  <Button variant="warning" disabled className="w-100 py-3 fs-4">
                    √
                  </Button>
                </Col>
              </>
            )}
            {i === 1 && (
              <>
                <Col>
                  <Button
                    variant="warning"
                    onClick={() => operatorClick("*")}
                    className="w-100 py-3 fs-4"
                  >
                    ×
                  </Button>
                </Col>
                <Col>
                  <Button variant="warning" disabled className="w-100 py-3 fs-4">
                    %
                  </Button>
                </Col>
              </>
            )}
            {i === 2 && (
              <>
                <Col>
                  <Button
                    variant="warning"
                    onClick={() => operatorClick("-")}
                    className="w-100 py-3 fs-4"
                  >
                    −
                  </Button>
                </Col>
                <Col>
                  <Button variant="warning" disabled className="w-100 py-3 fs-4">
                    1/x
                  </Button>
                </Col>
              </>
            )}
            {i === 3 && (
              <>
                <Col>
                  <Button
                    variant="warning"
                    onClick={() => operatorClick("+")}
                    className="w-100 py-3 fs-4"
                  >
                    +
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="success"
                    onClick={equalClick}
                    className="w-100 py-3 fs-4"
                  >
                    =
                  </Button>
                </Col>
              </>
            )}
          </Row>
        ))}
      </Card>
    </Container>
  );
};

export default Calculator;
