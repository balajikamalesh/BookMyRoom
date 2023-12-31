"use client";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRentModal from "../../hooks/useRentModal";

interface UserMenuProps {
  currentUser?: User;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    //open rent Modal
    rentModal.onOpen();
  }, [currentUser, loginModal]);

  return (
    <div className="relative">
      <div
        className="
          flex 
          flex-row 
          items-center 
          gap-3"
      >
        <div
          onClick={onRent}
          className="
            hidden 
            md:block 
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer"
        >
          Your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4 
            md:py-1 
            md:px-2 
            border-[1px] 
            border-neutral-200 
            flex 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer
            hover:shadow-md 
            transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute
        rounded-xl
        shadow-md
        w-[16vw]
        md:w-4/5
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm
        "
        >
          <div className="flex flex-col cursor-pointer" onClick={toggleOpen}>
            {!currentUser && (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
            {currentUser && (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My Favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="My home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
