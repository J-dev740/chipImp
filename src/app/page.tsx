'use client';
import React, { useState } from 'react'
import Image from 'next/image'
interface listItem {
  name:string;
  mail:string;
}
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChips, setSelectedChips] = useState<listItem[]>([]);
  const [list,setList]=useState(false);
  const [highlight,setHighlight]=useState(false);
  const [count,setCount] =useState(false);
  const handleChipSelect = (data: listItem,index:number) => {
    const updatedItems = selectedChips.length > 0 ? [...selectedChips, data] : [data];
    setSelectedChips(updatedItems);
    const updatedUsers=users.filter((item,idx)=>idx!=index)
    setUsers(updatedUsers);
    setSearchQuery('');
  }
  const handleChipDelete = (item: listItem) => {
    const updatedItems = selectedChips.filter((data, index) => data.name !== item.name && data.mail!== item.mail)
    setSelectedChips(updatedItems);
    const updatedUsers=users.length>0?[...users,item]:[item];
    setUsers(updatedUsers);
  }
  const [users,setUsers]=useState([
    {
      name: "jithu",
      mail: 'jithu@gmail.com',
    },
    {
      name: "indrajith",
      mail: 'indrajith@gmail.com',
    },
    {
      name: "hari",
      mail: 'hari@gmail.com',
    },
    {
      name: "ijas",
      mail: 'ijas@gmail.com',
    },
    {
      name: "hello",
      mail: 'hello@gmail.com',
    },

  ])
  return (
    <main className="flex min-h-screen flex-col items-center gap-[10px] p-4  bg-slate-200">
      <div className='w-full h-fit flex items-center justify-center text-[42px] font-extrabold text-violet-500 underline underline-violet-500 font-sans'>Pick a User</div>
      <div className='flex w-[80%]  h-fit items-start border-blue-500 border-b-[2px]   '>
      <div className='relative flex flex-row flex-wrap  max-w-[100%]   h-fit  gap-4  '>
        {/* chips list  */}
        <div className={'px-4 py-2 max-w-[95%] w-fit h-fit flex flex-grow  flex-wrap  items-center gap-[40px] '}>
          {
            selectedChips.length>0?selectedChips.map((item, index) => {
              return (
                <div
                  key={index}
                  className={((highlight==true && index==selectedChips.length-1)?'ring-2  ring-lime-500':'ring-0')+'w-[200px] max-w-[500px] h-fit flex flex-row justify-between items-center  p-4  bg-stone-500 rounded-[10px] text-black '}>
                  <div className='flex flex-row items-center w-fit gap-[10px]'>
                    <div className={'w-[30px] h-[30px] rounded-full  bg-cyan-500 ring-2 ring-black'}/>
                    <span>{item.name}</span>
                      </div>
                    <p
                      className='flex w-fit h-fit text-black font-bold hover:cursor-pointer '
                      onClick={() => handleChipDelete(item)}>X</p>
                  </div>
              )
            })
          :''}
        </div>
        {/* input field */}
        <div className='relative flex flex-row  py-2 min-w-[100px] w-fit h-fit items-end object-center '>
        <input
          placeholder='Add new User ...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={()=>setList(true)}
          // onMouseLeave={()=>setList(false)}
          onKeyDown={(e) => {
            if (e.key == 'Backspace' && searchQuery == '' && selectedChips.length > 0 && count==true ) {
              setCount(false);
              setHighlight(false);
              const updatedUsers=users.length>0?[...users,selectedChips[selectedChips.length-1]]:[selectedChips[selectedChips.length-1]]
              setUsers(updatedUsers);
              const updatedItems = selectedChips.filter((item, index) => index !== selectedChips.length - 1);
              setSelectedChips(updatedItems);
            }else if(e.key == 'Backspace' && searchQuery == '' && selectedChips.length > 0 && count==false){
              setCount(true);
              setHighlight(true);

            }
          }}
          className=' flex items-center outline-none relative w-full h-[20px]  text-black font-bold  text-[16px] rounded-r-[10px] bg-transparent appearance-none mb-4 '>

        </input>
        {
          list &&(
        <div className={'absolute -bottom-[410px] left-[10px] max-w-[500px] max-h-[400px] min-h-[100px] min-w-[200px] w-[350px] h-[400px] bg-white overflow-auto no-scrollbar rounded-[20px]'}>
          <ul className='flex flex-col w-full h-fit p-2 gap-3 text-black font-bold  '>
            {
              users.filter((item) => item.name.toLowerCase().includes(searchQuery)|| item.mail.toLowerCase().includes(searchQuery)).map((item, index) => {
                return (
                  <li
                    onClick={() => {

                      handleChipSelect(item,index);
                      setList(false);
                      setHighlight(false);
                    }}
                    className='w-full hover:cursor-pointer h-fit flex flex-row justify-between items-center  p-4 bg-slate-200 rounded-[10px]'>
                      <div className='flex flex-row items-center gap-[10px]'>
                    <div className={'w-[30px] h-[30px] rounded-full  bg-cyan-500 ring-2 ring-black'}/>
                    <span>{item.name}</span>
                      </div>
                    <span>{item.mail}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>

          )
        }

        </div>

      </div>

      </div>
    </main>
  )
}
