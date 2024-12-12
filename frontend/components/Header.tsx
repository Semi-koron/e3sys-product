const Header = () => {
    return (
        <header className="flex items-center justify-between relative mb-6">
            <button
                className="bg-none border-none text-2xl text-black cursor-pointer absolute left-0"
            >
                ☰
            </button>
            <h1 className="text-4xl text-black mx-auto m-0">タイトル</h1>
        </header>
    );
};

export default Header;