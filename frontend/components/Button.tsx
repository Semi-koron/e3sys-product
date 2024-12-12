type MenuButtonProps = {
    onClick: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
    return (
        <button
            className="bg-none border-none text-2xl text-black cursor-pointer absolute left-0"
            onClick={onClick}
        >
            ☰
        </button>
    );
};

export default MenuButton;
