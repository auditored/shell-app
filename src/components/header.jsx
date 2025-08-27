import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import CartDrawer from "./CartDrawer";

function Header({ token }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const dropdownRef = useRef(null);
    const loggedIn = !!token;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 🔹 Auth-App domain yönlendirmesi
    const handleSignIn = () => {
        window.location.href = "https://auth-app-two-sepia.vercel.app/"; // Auth-app URL
    };

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        window.dispatchEvent(new Event("storage"));
        window.location.reload(); // sayfayı yenileyip durumu sıfırla
    };

    const handleGoToCheckout = () => {
        window.location.href = "https://checkout-app-lxfv.vercel.app/"; // checkout host-app içinde kaldığı için navigate gerekmez
    };

    return (
        <header className={`w-full fixed top-0 z-30 transition-colors duration-500 ${isScrolled ? "bg-black" : "bg-transparent"}`}>
            <div className="px-3 md:px-6 lg:px-10 flex items-center justify-between py-4">
                <Link to="/">
                    <h1 className="text-red-600 text-4xl font-bold cursor-pointer">LCW*COM</h1>
                </Link>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="bg-red-600 px-4 py-1 rounded text-white hover:bg-red-700 transition duration-200"
                    >
                        Sepetim
                    </button>

                    {loggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <img
                                    src="https://occ-0-4451-1490.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
                                    className="w-7 rounded"
                                    alt="User Avatar"
                                />
                                <IoIosArrowDown />
                            </div>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded shadow-lg py-2 z-50">
                                    <Link
                                        to="/account"
                                        className="block px-4 py-2 hover:bg-red-600 transition duration-200"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Account
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-red-600 transition duration-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSignIn}
                                className="bg-red-600 px-4 py-1 rounded text-white hover:bg-red-700 transition duration-200"
                            >
                                Sign In
                            </button>
                            <Link to="/signup">
                                <button className="bg-red-600 px-4 py-1 rounded text-white hover:bg-red-700 transition duration-200">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onGoToCheckout={handleGoToCheckout}
            />
        </header>
    );
}

export default Header;
