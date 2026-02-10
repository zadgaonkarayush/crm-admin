import React, { useState } from 'react'

const Calendar = () => {
    const today = new Date();
   
    const [currentDate,setCurrentDate] = useState(today)
     const year = currentDate.getFullYear();
     const month = currentDate.getMonth();

     const getDaysinMonth=(year:number,month:number)=>{
           return new Date(year,month+1,0).getDate();
     }


     const daysInMonth = getDaysinMonth(year,month);
     const firstDay = new Date(year,month,1).getDay();

     const day: (number | null)[]=[];

     for(let i=0;i<firstDay;i++){
        day.push(null);
     }
     for(let d=1;d<=daysInMonth;d++){
        day.push(d)
     }
     function prevMonth(){
        setCurrentDate(new Date(year,month-1,1));
     }
     function nextMonth(){
        setCurrentDate(new Date(year,month+1,1));
     }

  return (
    <>
   <div className='max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl p-5'>
    <div className='flex items-center justify-between mb-4'>
        <button onClick={prevMonth}
        className='px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200'
        > ←</button>
         <h2 className="font-bold text-lg">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button onClick={nextMonth}
         className='px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200'
         
        > →</button>
    </div>
      <div className='grid grid-cols-7 gap-2'>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d)=>(
            <div
            key={d}
            className='text-center font-semibold text-gray-600'
            >
                {d}
            </div>
        ))}
        {day.map((d,i)=>(
            <div key={i}
            className={`h-10 flex items-center justify-center rounded-md
                ${d ? "bg-blue-100 hover:bg-blue-200 cursor-pointer":""}
                `}
            >
                {d}
            </div>
        ))}
    </div>
   </div>
    </>
  )
}

export default Calendar