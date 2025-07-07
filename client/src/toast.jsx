import { FaCheckCircle } from 'react-icons/fa';
function ToastSuccess() {
  return (
    <div role="alert" className="alert alert-success absolute top-0 left-[50%] flex flex-row gap-2">
      <FaCheckCircle />
      <span className="capitalize">task successfully added</span>
    </div>
  )
}
export default ToastSuccess;