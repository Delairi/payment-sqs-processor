import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="w-full px-4 h-[42px] flex items-center justify-end shadow-lg gap-5 z-50 bg-white">
            <Link
                to="/"
                className="rounded-md text-sm font-medium text-bg"
            >
                Pay now
            </Link>
            <Link
                to="/orders"
                className="rounded-md text-sm font-medium text-bg"
            >
                My orders
            </Link>
        </header>
    );
};

export default Header;
