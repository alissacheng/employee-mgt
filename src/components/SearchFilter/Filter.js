import { useEffect, useState } from "react";
import departmentList from "../../lib/departmentList";

const Filter = ({ handleCheck, checkedItems }) => {
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        const exitFilter = function(event) {
            const filter = document.getElementById("filter")
            if (!filter.contains(event.target)) {
                setOpen(false);
                document.removeEventListener('click', exitFilter);
            }
        };
        if(open) document.addEventListener('click', exitFilter);

        return () => {
            document.removeEventListener('click', exitFilter);
        }
    }, [open])

    return(
        <div className="col filter mb-3" id="filter">
            <button 
                className={`border-0 px-4 py-1 h-100 btn btn-light rounded w-100 ${open && "btn-dark"}`}
                onClick={()=>setOpen(!open)}
            >
                <img 
                    src="/filter.svg" 
                    alt="Filter icon"
                    className={`mx-1 ${open && "active"}`}
                />
                <span className="mx-1">Filter</span>
            </button>
            <div 
                className={`position-absolute border bg-white shadow-sm rounded popup ${!open && 'invisible'}`}
            >
            <p className="fw-bold text-center py-2 border-bottom-1 my-1">Filter by Department</p>
            {departmentList.map((option) => (
                <div key={option.name} className="form-check px-0 px-1 position-relative">
                    <input
                        className="position-absolute form-check-input"
                        type="checkbox"
                        id={option.name}
                        value={option.label}
                        checked={checkedItems.includes(option.label) || false}
                        onChange={handleCheck}
                    />
                    <label className="form-check-label w-100 d-block py-1 px-1 rounded-1" htmlFor={option.name}>
                        {checkedItems.includes(option.label) && (
                        <span>                    
                            <img src="/checkmark.svg" alt="Checkmark icon" className="me-1" />
                        </span>)}
                        <span className={!checkedItems.includes(option.label) && 'ps-4'}>{option.label}</span>
                    </label>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Filter;