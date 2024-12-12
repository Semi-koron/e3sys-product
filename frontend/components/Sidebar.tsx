type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
        >
            <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">サイドバー</h2>
                <button
                    className="text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>
            <ul className="p-4">
                <li className="mb-2">メニュー1</li>
                <li className="mb-2">メニュー2</li>
                <li className="mb-2">メニュー3</li>
            </ul>
        </div>
    );
};

export default Sidebar;
