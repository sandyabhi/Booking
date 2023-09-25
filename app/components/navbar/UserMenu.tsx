"use client";

import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
// import useRegisterModal from "@/app/hooks/useRegisterModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm py-3 px-4 rounded-full font-semibold hover:bg-neutral-100 transition cursor-pointer">
          Book Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My Trips" />
                <MenuItem onClick={() => {}} label="My Favorites" />
                <MenuItem onClick={() => {}} label="My Reservations" />
                <MenuItem onClick={() => {}} label="My Properties" />
                <MenuItem onClick={() => {}} label="Booking My Home" />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => loginModal.onOpen()} label="Login" />
                <MenuItem
                  onClick={() => registerModal.onOpen()}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
