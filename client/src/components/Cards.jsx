import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { BookDashedIcon, PackageIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export function ConclusionCards(props) {
  return (
    <div className='flex place-items-center gap-4 p-4 bg-base-primary rounded-xl'>
      <div className='text-gray-10 bg-gray-5 p-4 rounded-full'>
        <BookDashedIcon />
      </div>
      <div className=''>
        <h1>{props.name}</h1>
        <h1 className='font-bold text-xl'>{props.value}</h1>
      </div>
    </div>
  )
}
export function DocsCard() {
  return (
    <div class="max-w-sm rounded-lg bg-gray-5 text-gray-10 overflow-hidden shadow-lg">
      <img class="w-full" src="vite.svg" className='w-24 items-center' alt="Sunset in the mountains" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
    </div>
  )
}
export function ChatCard({el,readMessage,FriendMsg,account,userName,currentUserName,currentUserAddress}) {
  // console.log(el)
  // const {user}=useAuth0();
  return (
    <Link onClick={()=>{readMessage(account)}}><div className='hover:bg-gray-6 px-4 py-2 flex gap-4 place-items-center'>
      <Avatar className="w-12">
        <AvatarImage className="rounded-full" src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1 className='tracking-widest w-2 text-gray-3 font-bold text-xl'>{el}</h1>

    </div></Link>
  )
}
export function UserCard({el,addFriends}){
  // console.log(el)
  return(
    <div>
      <Avatar className="w-8">
        <AvatarImage className="rounded-full" src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{el.name}</p>
      <p>{el.accountAddress}</p>
      <button
        onClick={()=>addFriends({name:el.name,accounAddress:el.accountAddress})}
      >Add Friends</button>
    </div>
  )
}
