import React from 'react'

function LeftControl() {
  return (
    <div className="w-[80px] h-[200px] border-4 border-solid">
      <button className="rounded-full border-2 border-black bg-transparent flex items-center justify-center w-10 h-10"></button>
      <div className="grid grid-cols-3 grid-rows-3 gap-1 mt-10  w-16 h-16 ">
      <button className="col-start-1 row-start-2 rounded-full border-2 border-black bg-transparent flex items-center justify-center w-6 h-6">{"<"}</button>
      <button className="col-start-2 row-start-1 rounded-full border-2 border-black bg-transparent flex items-center justify-center w-6 h-6">^</button>
      <button className="col-start-3 row-start-2 rounded-full border-2 border-black bg-transparent flex items-center justify-center w-6 h-6">{">"}</button>
      <button className="col-start-2 row-start-3 rounded-full border-2 border-black bg-transparent flex items-center justify-center w-6 h-6">v</button>
      </div>
    </div>
  )
}

export default LeftControl