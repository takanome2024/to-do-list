import { useState, useEffect } from 'react'
import './App.css'
import { MdAdd } from "react-icons/md";
import { MdDelete } from 'react-icons/md';
import ToastSuccess from "./toast";
import { FaCheckCircle } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
// import CardTodo from './CardTodo';
// import AddNewTask from './addnew';

function CardTodo({ id, task, description, onDelete, onEdit }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState(task);
  const [editDesc, setEditDesc] = useState(description);
  const [showDelete, setShowDelete] = useState(false);

  function handleSaveEdit(e) {
    e.preventDefault();
    onEdit(id, {
      task: editTask,
      description: editDesc,
    });
    setShowEdit(false);
  }

  return (
    <>
      <div className="list p-[10px] flex flex-row justify-between bg-white border-2 border-[#c5c5c5] rounded-[10px] items-center">
        <div className="contentList w-[50%]">
          <h2 className="titleTask capitalize font-bold">{task}</h2>
          <small className="descTask text-[12px] line-clamp-2">{description}</small>
        </div>
        <BtnComp
          onDelete={() => setShowDelete(true)}
          id={id}
          onView={() => setShowDetail(true)}
          onEdit={() => setShowEdit(true)}
        />
      </div>

      {showDelete && (
        <MdlDelete
          onCancel={() => setShowDelete(false)}
          onConfirm={() => {
            onDelete(id);
            setShowDelete(false);
          }}
        />
      )}

      {showDetail && (
        <dialog open className="modal">
          <div className="modal-box">
            <h2 className="font-bold text-lg">{task}</h2>
            <p className="py-4">{description}</p>
            <button className="btn" onClick={() => setShowDetail(false)}>Close</button>
          </div>
        </dialog>
      )}

      {showEdit && (
        <dialog open className="modal">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Edit Task</h2>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-2">
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Edit Task"
              />
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Edit Description"
              />
              <div className="flex gap-2 justify-end mt-2">
                <button type="button" onClick={() => setShowEdit(false)} className="btn">Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}


//add new modal
function MdlDelete({ onConfirm, onCancel }) {
  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Task?</h3>
        <p className="py-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel} className="btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-error">
            Yes, Delete
          </button>
        </div>
      </div>
    </dialog>
  );
}

function Addbtn() {
  return (
    <button
      className="btn bg-[#43B700] rounded-full border-0 text-white h-[39px]"
      onClick={() => document.getElementById("my_modal_2").showModal()}
    >
      <MdAdd className="text-[24px]" /> Add Task
    </button>
  );
}

function Savebtn({ onSave }) {
  return (
    <button
      type="submit"
      className="btn bg-[#43B700] mt-4 capitalize text-white rounded-full min-w-[108px] min-h-[39px] p-[10px]"
    >
      save
    </button>
  );
}


function Closemdl() {
  const handleClose = () => {
    const modal = document.getElementById("my_modal_2");
    if (modal) modal.close();
  };

  return (
    <button
      onClick={handleClose}
      className="btn border-[#888888] mt-4 capitalize text-[#888888] rounded-full min-w-[108px] min-h-[39px] p-[10px]"
    >
      cancel
    </button>
  );
}

function FadeOut() {
  return (
    <form method="dialog" className="modal-backdrop">
      {""}
      {/*for close modal in outside*/}
      <button>close</button>
    </form>
  );
}

export { FadeOut, Closemdl };

function AddNewTask({ fetchTodos }) {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [showtoast, setShowtoast] = useState(false);

  async function Createtodo(event) {
    event.preventDefault();

    const newTodo = {
      task: task,
      description: desc,
    };

    try {
      await fetch("https://jet-trite-bun.glitch.me/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
      });

      await fetchTodos();

      setTask("");
      setDesc("");

      const modal = document.getElementById("my_modal_2");
      if (modal) modal.close();

      setTimeout(() => {
        setShowtoast(true);
        setTimeout(() => {
          setShowtoast(false);
        }, 3000);
      }, 300);

    } catch (error) {
      console.log("Error creating todo:", error);
    }
  }

  return (
    <>
      {showtoast && <ToastSuccess />}
      <Addbtn />
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form onSubmit={Createtodo}>
            <fieldset
              className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
            >
              <legend className="fieldset-legend capitalize">
                create new task
              </legend>

              <label className="label capitalize">task {task}</label>
              <input
                onChange={(event) => setTask(event.target.value)}
                value={task}
                type="text"
                className="border-1 border-[#888888] py-[10px] px-[20px] outline-none w-full rounded-[10px]"
                placeholder="Input Task"
              />

              <label className="label capitalize">description {desc}</label>
              <textarea
                onChange={(event) => setDesc(event.target.value)}
                value={desc}
                className="border-1 border-[#888888] py-[10px] px-[20px] outline-none w-full rounded-[10px]"
                placeholder="Input Description"
              />
              <div className="actionArea flex w-full justify-end gap-[20px]">
                <Closemdl />
                <Savebtn onSave={Createtodo} />
              </div>
            </fieldset>
          </form>
        </div>
        <FadeOut />
      </dialog>
    </>
  );
}


//buttons
function Editbtn({ onEdit }) {
  return (
    <button
      onClick={onEdit}
      className="actionBtn editBtn bg-[#0600B7] p-[10px] rounded-full w-[40px] h-[40px]">
      <FaRegEdit className='w-[20px] h-[20px] text-white' />
    </button>
  );
}

function Viewbtn({ onView }) {
  return (
    <button
      onClick={onView}
      className="actionBtn bg-[#B78300] p-[10px] rounded-full w-[40px] h-[40px]">
      <FaRegEye className='justify-self-center w-[20px] h-[20px] text-white' />
    </button>
  );
}


function BtnComp({ onDelete, id, onView, onEdit }) {
  return (
    <div className="actionList flex flex-row gap-[10px]">
      <Editbtn onEdit={onEdit} />
      <Viewbtn onView={onView} />
      <Deletebtn onDelete={onDelete} />
    </div>
  );
}


function Deletebtn({ onDelete }) {
  return (
    <button
      onClick={onDelete}
      className="actionBtn bg-[#B70000] p-[10px] rounded-full w-[40px] h-[40px]">
      <MdDelete className='justify-self-center w-[20px] h-[20px] text-white' />
    </button>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    try {
      const response = await fetch("https://jet-trite-bun.glitch.me/todos", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setTodos(result);
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`https://jet-trite-bun.glitch.me/todos/${id}`, {
        method: "DELETE"
      });
      fetchTodos();
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  }
  async function editTodo(id, updatedTask) {
    try {
      await fetch(`https://jet-trite-bun.glitch.me/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      fetchTodos();
    } catch (error) {
      console.log("Error editing todo:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className='container max-w-none bg-linear-to-t from-[#06018B] to-[#51A2E9] px-[10px] py-[60px] relative'>
        <div className="mainContent px-[10px] py-[60px]">
          <nav className="nav flex flex-row gap-[20px] w-full justify-center">
            <div className='searchComp bg-white rounded-full flex flex-row items-center p-[10px] border-2 border-[#c5c5c5] h-[39px] w-full justify-between'>
              <input type="text" placeholder="Search" className="bg-transparent outline-none" />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className='stats w-full'>
              <button className="btn justify-between" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>
                Select Status <i className="fa-solid fa-chevron-down"></i>
              </button>

              <ul className="dropdown menu w-[500px] rounded-box bg-base-100 shadow-sm"
                popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
            <AddNewTask fetchTodos={fetchTodos} />
          </nav>
          <main className='mainSection'>
            <h1 className='header font-bold uppercase text-white mb-[10px]'>
              to do list
            </h1>
            <div className="flex flex-col gap-[28px]">
              {todos.map((t) => (
                <CardTodo
                  key={t.id}
                  id={t.id}
                  task={t.task}
                  description={t.description}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
export default App;

