import userImage from '../../../assets/user.png'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import Link from "next/link"
import { LogoutFunction } from '@/types/authInterface'


export function Dropdown({logout}: { logout: LogoutFunction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image src={userImage} alt='user' width={35} height={35}/>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/profile'}>Profile</Link>
            </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-red-500">
            <span className="cursor-pointer" onClick={logout}>Logout</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
