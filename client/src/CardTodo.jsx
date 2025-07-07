import BtnComp from './button-component';
import { useState, useEffect } from 'react'

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
export default CardTodo;
