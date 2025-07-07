import { FaRegEdit } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


function Editbtn() {
    return (
        <button className="actionBtn editBtn bg-[#0600B7] p-[10px] rounded-full w-[40px] h-[40px]"><FaRegEdit className='justify-self-center w-[20px] h-[20px] text-white' /></button>
    )
}

function Viewbtn() {
    return (
        <button className="actionBtn bg-[#B78300] p-[10px] rounded-full w-[40px] h-[40px]"><FaRegEye className='justify-self-center w-[20px] h-[20px] text-white' /></button>
    )
}

function Deletebtn() {
    return (
        <button className="actionBtn bg-[#B70000] p-[10px] rounded-full w-[40px] h-[40px]"><MdDelete className='justify-self-center w-[20px] h-[20px] text-white' /></button>
    )
}

function BtnComp() {
    return (
        <div className="actionList flex flex-row gap-[10px]">
            <Editbtn />
            <Viewbtn />
            <Deletebtn />
        </div>
    )
}



export default BtnComp;