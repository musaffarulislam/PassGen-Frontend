import { useNavigate } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import avatar from "../assets/def-avatar.png";
import Swal from "sweetalert2";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    };

    const handleSignOut = () => {
        Swal.fire({
            title: "Sign Out",
            text: "Are you sure you want to sign out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Sign Out",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("UserToken");
                navigate("/");
            }
        });
    };

    const avatarMenu = (
        <Menu>
          <Menu.Item
            key="signout"
            icon={<LogoutOutlined />}
            onClick={handleSignOut}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      );

    const accessToken: string | null = window.localStorage.getItem("accessToken")
    return (
        <>
            <nav className="bg-white bg-opacity-75 rounded-3xl  ml-10 mr-10 mt-6 border-gray-200 shadow-md mb-5  dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8 mr-3"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            PassGen
                        </span>
                    </a>
                    <div className="flex md:order-2">
                        {accessToken ? (
                            <Dropdown overlay={avatarMenu} trigger={["click"]}>
                                <img className="w-10 h-10" src={avatar} alt="" />
                            </Dropdown>
                        ) : (
                            <button
                                type="button"
                                onClick={handleNavigate}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}
