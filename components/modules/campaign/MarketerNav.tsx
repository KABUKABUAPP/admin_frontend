import React, { useState } from 'react';
import { useRouter } from "next/router";
import LogoMarketer from '@/components/common/LogoMarketer';
import Avatar from '@/components/common/Avatar';
import ArrowDown from '@/components/icons/ArrowDown';

import { useUserContext } from "@/contexts/UserContext";
import { capitalizeAllFirstLetters } from "@/utils";
import useClickOutside from "@/hooks/useClickOutside";
import LogoutPopUp from "@/components/common/LogoutPopUp";
import Modal from "@/components/common/Modal";
import LogoutConfirmationPopUp from "@/components/common/LogoutConfirmationPopUp";

import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, USER_TOKEN } from "@/constants";
import DashboardIcon from '@/components/icons/DashboardIcon';
import MapWaveIcon from '@/components/icons/MapWaveIcon';

const MarketerNav: React.FC = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutPopUp, setIsLogoutPopUp] = useState<boolean>(false);
  const ref = useClickOutside<HTMLSpanElement>(() => setIsLogoutPopUp(false));
  const [isModal, setIsModal] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const campaignView = router.pathname === '/campaign' ? 'font-bold text-[#000]' : 'text-[#9A9A9A]';
  const campaignMapView = router.pathname === '/campaign/map-view' ? 'font-bold text-[#000]' : 'text-[#9A9A9A]';

  return (
    <>
      <nav className="p-4 bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <div>
              <LogoMarketer />
          </div>

          <div className="justify-center hidden md:flex">
            <p className={`flex items-center justify-center cursor-pointer mx-5 ${campaignView} gap-2`} onClick={() => {router.push('/campaign')}}><span><DashboardIcon /></span>  <span>Dashboard</span></p>
            <p className={`flex items-center justify-center`}>|</p>
            <p className={`flex items-center justify-center cursor-pointer mx-5 ${campaignMapView} gap-2`} onClick={() => {router.push('/campaign/map-view')}}><span><MapWaveIcon /></span>  <span>Map View</span></p>
          </div>

          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-black" style={{display: 'flex'}} onClick={toggleMobileMenu}>
              <Avatar
                imageUrl='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                shape='round'
                fallBack='U'
              />
              <span style={{marginLeft: '1vw', marginTop: '1.5vh'}}>
                <b>{user ? capitalizeAllFirstLetters(user.full_name) : "Samson C."}</b><br />
                <small>{user ? capitalizeAllFirstLetters(user.role) : "Marketer"}</small>
              </span>
              <span style={{marginLeft: '1vw', marginTop: '4.5vh'}}>
                <ArrowDown />
              </span>
            </a>
          </div>

          <div className="md:hidden">
            <button
              id="mobile-menu-button"
              className="text-black focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9.75H12V14V15C12 17 11 18 9 18H3C1 18 0 17 0 15V3C0 1 1 0 3 0H9C11 0 12 1 12 3V4V8.25H5C4.586 8.25 4.25 8.586 4.25 9C4.25 9.414 4.586 9.75 5 9.75ZM18.692 8.71301C18.654 8.62101 18.599 8.53799 18.53 8.46899L15.53 5.46899C15.237 5.17599 14.762 5.17599 14.469 5.46899C14.176 5.76199 14.176 6.237 14.469 6.53L16.189 8.25H12V9.75H16.189L14.469 11.47C14.176 11.763 14.176 12.238 14.469 12.531C14.615 12.677 14.807 12.751 14.999 12.751C15.191 12.751 15.383 12.678 15.529 12.531L18.529 9.53101C18.598 9.46201 18.653 9.37899 18.691 9.28699C18.768 9.10299 18.768 8.89701 18.692 8.71301Z" fill="#EF2C5B"/>
              </svg>

            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <div className="flex justify-end p-4">
            <button
              id="close-mobile-menu"
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <a href="#" className="text-white md:hidden" onClick={() => router.push('/campaign')}>
              Dashboard
            </a>
            <a href="#" className="text-white md:hidden" onClick={() => router.push('/campaign/map-view')}>
              Map View
            </a>
            <a href="#" className="text-white" onClick={() => setIsModal(true)}>
              Logout
            </a>
          </div>
        </div>
      </nav>
      {isModal && (
        <Modal>
          <LogoutConfirmationPopUp
            handleCancel={() => setIsModal(false)}
            handleLogout={() => {
              setUser(null);
              Cookies.remove(USER_TOKEN);
              Cookies.remove(ACCESS_TOKEN);
              router.push("/auth/login");
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default MarketerNav;
