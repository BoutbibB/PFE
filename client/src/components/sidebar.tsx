import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Avatar } from 'flowbite-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  HiChartPie,
  HiOutlineCash,
  HiLogout,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiTrendingUp,
} from "react-icons/hi";

const BASE_URL = `http://localhost:5000`;

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; joinDate: string } | null>(null);

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  
  const history = useNavigate();
  

  useEffect(() => {
    const currentUserData = localStorage.getItem('currentUser');

    if (currentUserData) {
      const parsedCurrentUser = JSON.parse(currentUserData);
      setCurrentUser(parsedCurrentUser);
    }
  }, []);

  

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      history('/sign-in'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  console.log(currentUser);
  

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
  {currentUser && ( 
    <Sidebar.Item>
      <div className="flex flex-wrap items-center gap-2">
        <div>
          <Avatar img="/images/profile-user.png" size="lg" rounded />
        </div>
        <div className="space-y-1 font-medium dark:text-white">
          <div>User:</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
             {currentUser.email}
          </div>
        </div>
      </div>
    </Sidebar.Item>
  )}
</Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/"
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="/products"
                icon={HiShoppingBag}
                className={
                  "/products" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                href="/users"
                icon={HiUsers}
                className={
                  "/users" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Users
              </Sidebar.Item>
              <Sidebar.Item
                href="/transactions"
                icon={HiOutlineCash}
                className={
                  "/transactions" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Transactions
              </Sidebar.Item>
              <Sidebar.Item
                href="/ai-analysis"
                icon={HiTrendingUp}
                className={
                  "/ai-analysis" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                AI Predicitive Analysis
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {/*<Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/"
                icon={HiClipboard}
              >
                Docs
              </Sidebar.Item>
              <Sidebar.Item
                href="https://flowbite-react.com/"
                icon={HiCollection}
              >
                Components
              </Sidebar.Item>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/issues"
                icon={HiInformationCircle}
              >
                Help
              </Sidebar.Item>*/}
      <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <Sidebar.Item icon={HiLogout}>
          Sign out
        </Sidebar.Item>
      </div>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
