import { useState } from "react";
import { MdAdd } from "react-icons/md";
import ToastSuccess from "./toast";

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
      await fetch("http://localhost:3000/todos", {
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

export default AddNewTask;
