import {useState} from "react";
import {ArrowLeftFromLine, ArrowRightFromLine} from "lucide-react";
import HomePage from "../home-page/HomePage.jsx";
import BGPOverview from "../bgp-overview/BGPOverview.jsx";
import BGPHijacking from "../bgp-hijacking/BGPHijacking.jsx";
import HijackingMitigation from "../hijacking-mitigation/HijackingMitigation.jsx";

export default function SidebarLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const pages = [
        <HomePage/>,
        <BGPOverview setSelectedIndex={setSelectedIndex}/>,
        <BGPHijacking setSelectedIndex={setSelectedIndex}/>,
        <HijackingMitigation setSelectedIndex={setSelectedIndex}/>
    ]

    return (
        <div className="flex h-screen bg-gray-100">
            <div
                className={`flex flex-col bg-gray-800 text-white transition-all duration-300
        ${isCollapsed ? "w-16" : "w-56"}`}
            >
                <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
                    {!isCollapsed && <span className="font-semibold cursor-pointer" onClick={()  => {setSelectedIndex(0)}}>Route Wars</span>}
                    <button
                        onClick={toggleSidebar}
                        className="p-1 rounded hover:bg-gray-700 cursor-pointer"
                    >
                        {isCollapsed ? <ArrowRightFromLine/> : <ArrowLeftFromLine/>}
                    </button>
                </div>
                <nav className="flex-1 mt-4 space-y-1">
                    {[
                        {name : "Border Gateway Protocol", index : 1},
                        {name:"BGP Hijacking", index : 2},
                        {name: "Mitigation", index: 3}
                    ].map((item) => (
                        <button
                            key={item.name}
                            className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer"
                            onClick={() => setSelectedIndex(item.index)}
                        >
                            {!isCollapsed && <span>{item.name}</span>}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
                {pages[selectedIndex]}
            </div>
        </div>
    );
}
