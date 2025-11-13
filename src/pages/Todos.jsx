import { useEffect, useRef, useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import { fetchTodos } from "../data/todos";

const Todos = () => {
  const newIdRef = useRef();
  const newTitleRef = useRef();

  const [TodosRow, SetTodosRow] = useState([]);

  const [Todos, SetTodos] = useState([]);
  const [onlyWaiting, setonlyWaiting] = useState(false);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [numPages, setnumPages] = useState(3);
  const [curPages, setcurPages] = useState(1);

  useEffect(() => {
    SetTodosRow(fetchTodos());
  }, []); //load

  useEffect(() => {
    if (onlyWaiting) {
      SetTodos(TodosRow.filter((todo) => !todo.completed));
    } else {
      SetTodos(TodosRow);
    }
  }, [TodosRow, onlyWaiting]);

  useEffect(() => {
    setnumPages(Math.ceil(Todos.length / itemsPerPage));
  }, [Todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setcurPages(0);
    else if (curPages > numPages) setcurPages(numPages);
    else if (curPages <= 0) setcurPages(1);
  }, [numPages]);

  const waitingClicked = (id) => {
    SetTodosRow((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const deleteClicked = (id) => {
    SetTodosRow(TodosRow.filter((todo) => todo.id !== id));
  };

  //handle modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveClicked = (id, title) => {
    console.log(id, title);
    if (title.trim() !== "") {
      SetTodosRow([
        ...TodosRow,
        {
          userId: 1,
          id,
          title,
          completed: false,
        },
      ]);
    }
    newIdRef.current.value = "";
    newTitleRef.current.value = "";
    handleClose();
  };

  return (
    <>
      {/* Modol */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                value={
                  TodosRow.reduce(
                    (prev, todo) => (todo.id > prev ? todo.id : prev),
                    -1
                  ) + 1
                }
                disabled={true}
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                placeholder="Add new todos here"
                autoFocus
                ref={newTitleRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              saveClicked(
                Number(newIdRef.current.value),
                newTitleRef.current.value
              )
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        {/* filters */}
        <div className="todo-filters-container d-flex justify-content-between">
          <div className="form-check form-switch d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="switchCheckChecked"
                onChange={(e) => {
                  setonlyWaiting(e.target.checked);
                }}
              />
              <span>Show only</span>
              <button
                type="button"
                className="btn btn-warning btn-disabled-fix"
                disabled
              >
                waiting <span className="bi bi-clock"></span>
              </button>
            </div>
          </div>
          {/* select */}
          <select
            aria-label="Default select example"
            className="w-25"
            onChange={(e) => {
              setitemsPerPage(e.target.value);
            }}
          >
            <option value={5}>5 item per page</option>
            <option value={10}>10 item per page</option>
            <option value={50}>50 item per page</option>
            <option value={100}>100 item per page</option>
          </select>
        </div>
        {/* table */}
        <div>
          <Table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th style={{ textAlign: "right" }}>
                  Completed&nbsp;
                  <Button onClick={() => handleShow()}>
                    <i className="bi bi-plus"></i>
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td style={{textAlign: 'left'}}><span className="badge bg-secondary">1</span></td>
                <td>Work Space</td>
                <td style={{textAlign: 'right'}}>Done <button className="btn btn-danger"><span className="bi bi-trash"></span></button></td>
            </tr> */}
              {Todos.filter((Todos, index) => {
                return (
                  index >= (curPages - 1) * itemsPerPage &&
                  index <= curPages * itemsPerPage - 1
                );
              }).map((Todos) => {
                return (
                  <tr key={Todos.id}>
                    <td style={{ textAlign: "left" }}>
                      <span className="badge bg-secondary">{Todos.id}</span>
                    </td>
                    <td>{Todos.title}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className={
                          "btn" +
                          (Todos.completed ? " btn-success" : " btn-warning")
                        }
                        onClick={() => waitingClicked(Todos.id)}
                      >
                        {Todos.completed ? "done" : "waiting"}
                        <span
                          className={
                            "bi " +
                            (Todos.completed ? " bi-check" : " bi-clock")
                          }
                        >
                          &nbsp;
                        </span>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteClicked(Todos.id)}
                      >
                        <span className="bi bi-trash"></span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* page control */}
        <div className="text-center">
          <button
            className="btn btn-outline-primary todo-space"
            onClick={() => setcurPages(1)}
            disabled={curPages === 1}
          >
            Frist
          </button>&nbsp;
          <button
            className="btn btn-outline-primary todo-space"
            onClick={() => curPages > 1 && setcurPages((p) => p - 1)}
            disabled={curPages === 1}
          >
            Previous
          </button>&nbsp;
          <span>
            {curPages}&nbsp;/ {numPages}
          </span>&nbsp;
          <button
            className="btn btn-outline-primary todo-space"
            onClick={() => curPages < numPages && setcurPages((p) => p + 1)}
            disabled={curPages === numPages}
          >
            Next
          </button>&nbsp;
          <button
            className="btn btn-outline-primary todo-space"
            onClick={() => setcurPages(numPages)}
            disabled={curPages === numPages}
          >
            Last
          </button>&nbsp;
        </div>
      </div>
    </>
  );
};

export default Todos;
