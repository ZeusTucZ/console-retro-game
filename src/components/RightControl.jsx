import React from 'react'

function RightControl() {
  return (
    <div className="w-[80px] h-[200px] border-4 border-solid">
      <div className="grid grid-cols-3 grid-rows-3 gap-1 mt-1 w-16 h-16">
      <button className="col-start-1 row-start-2 rounded-full border-2 border-black bg-transparent flex items-center justify-center w-6 h-6">y</button>
      <button className="col-start-2 row-start-1 rounded-full border-2 border-black bg-transparent flex items-center justify-center w-6 h-6">x</button>
      <button className="col-start-3 row-start-2 rounded-full border-2 border-black bg-transparent flex items-center justify-center w-6 h-6">a</button>
      <button className="col-start-2 row-start-3 rounded-full border-2 border-black bg-transparent flex items-center justify-center w-6 h-6">b</button>
      </div>
      <button>JOYSTICK</button>

    </div>
  )
}

export default RightControl