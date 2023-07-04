import React from 'react'

const index = () => {
  return (
    <div className=' bg-black  overflow-hidden'>


      {/* Section 1 */}
      <div className='  p-10 text-center text-primary_text relative flex flex-col lg:py-40 overflow-hidden'>

        <div >
          <img className="absolute right-48 bottom-72 sm:right-[20rem] sm:-top-[30rem] md:top-0 md:right-[35rem] lg:right-[50rem] lg:-top-[30rem] xl:right-[75rem]  z-0 blur-3xl " src="/blur2.png" alt="" />
        </div>

        <div className='flex flex-col items-center justify-center space-y-10  xl:w-1/2 mx-auto '>
          <h3 className='text-lg underline underline-offset-8 decoration-2 decoration-brand z-10'>Project Management App</h3>
          <h1 className='text-4xl font-bold z-10 lg:text-7xl'>Colaborate and build faster, together</h1>
          <h5 className='text-xs w-3/4 text-secondary z-10 lg:text-lg'>Create, share, and get feedback with collaborative boards for rapid development.</h5>

          <div className='bg-brand rounded px-3 py-2 z-10'>Get Started</div>
        </div>

        <div >
          <img className="absolute top-72 rotate-45 left-48 z-0 blur-3xl  md:top-40 md:left-[25rem] lg:left-[50rem] lg:top-72 xl:left-[70rem]" src="/blur3.png" alt="" />
        </div>

      </div>

      {/* Section 2 */}
      <div className='flex flex-col md:flex-row  justify-center items-center  md:p-10 p-5 space-y-10 md:space-y-0 md:space-x-10'>

        <div className='flex flex-col items-center justify-center space-y-3 text-center bg-gradient-to-b w-full from-[#101113] to-black border-white/10 border-[1px] p-5 rounded-2xl'>
          <div><img src="/icon1.png" alt="" /></div>
          <div className='text-primary_text text-lg'>Interate</div>
          <div className='text-secondary text-sm'>The ability to quickly set up and customize workflows for just about anything.</div>
        </div>
        <div className='flex flex-col w-full items-center justify-center space-y-3 text-center bg-gradient-to-b from-[#101113] to-black border-white/10 border-[1px] p-5 rounded-2xl'>
          <div><img src="/icon2.png" alt="" /></div>
          <div className='text-primary_text text-lg'>Colaborate</div>
          <div className='text-secondary text-sm'>Manage projects, organize tasks, and build team spirit—all in one place.</div>
        </div>
        <div className='flex flex-col w-full items-center justify-center space-y-3 text-center bg-gradient-to-b from-[#101113] to-black border-white/10 border-[1px] p-5 rounded-2xl'>
          <div><img src="/icon3.png" alt="" /></div>
          <div className='text-primary_text text-lg'>Succeed</div>
          <div className='text-secondary text-sm'>Every single part of your task can be managed, tracked, and shared with teammates.</div>
        </div>



      </div>

      <div className='h-[5px] rounded-full w-full bg-[#101113] md:hidden'></div>

      {/* Section 3 */}
      <div className='flex flex-col items-center justify-center p-5 space-y-20 relative z-0'>


        <div>
          <div className='z-10 flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-20  text-primary_text'>
            <div className='text-center md:text-left md:space-y-5 ' >
              <h1 className='z-10 text-xl md:text-2xl md:text-right'>Build the workflow you want</h1>
              <h4 className='z-10 text-secondary text-sm md:text-right'>Manage your boards using Drag-n-Drop, create adittional boards and tasks.</h4>
            </div>
            <div>
              <img className='z-10' src="/frame1.png" alt="" />
            </div>
          </div>
        </div>
        {/* -------------------------- */}
        <div>
          <div className='z-10 hidden md:flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-20  text-primary_text'>
            <div>
              <img className='z-10' src="/frame2.png" alt="" />
            </div>
            <div className='text-center md:text-left md:space-y-5 ' >
              <h1 className='z-10 text-xl md:text-2xl text-left '>Build the workflow you want</h1>
              <h4 className='z-10 text-secondary text-sm text-left'>Manage your boards using Drag-n-Drop, create adittional boards and tasks.</h4>
            </div>
          </div>
          <div className='md:hidden z-10 flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-20  text-primary_text'>
            <div className='text-center md:text-left md:space-y-5 ' >
              <h1 className='z-10 text-xl md:text-2xl text-center '>Build the workflow you want</h1>
              <h4 className='z-10 text-secondary text-sm'>Manage your boards using Drag-n-Drop, create adittional boards and tasks.</h4>
            </div>
            <div>
              <img className='z-10' src="/frame2.png" alt="" />
            </div>
          </div>
        </div>
        {/* -------------------------- */}
        <div>
          <div className='z-10 flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-20  text-primary_text'>
            <div className='text-center md:text-left md:space-y-5 ' >
              <h1 className='z-10 text-xl md:text-2xl md:text-right'>Build the workflow you want</h1>
              <h4 className='z-10 text-secondary text-sm md:text-right'>Manage your boards using Drag-n-Drop, create adittional boards and tasks.</h4>
            </div>
            <div>
              <img className='z-10' src="/frame3.png" alt="" />
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default index
