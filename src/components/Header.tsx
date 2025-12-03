import { Link } from 'react-router-dom';
import Switch from './Switch';
import useStore from '../store';
import { NewPaymentStatus } from '../services/Payment.service';

const Header = () => {

    const { statusPayment, setStatusPayment } = useStore();
    const paymentControl = async (status: boolean) => {
        const response = await NewPaymentStatus(status);
        if (!response || !statusPayment) return;
        setStatusPayment({
            ...statusPayment,
            status
        });
    }

    return (
        <div className="w-full px-4 h-[42px] flex items-center justify-between shadow-lg gap-5 z-50 bg-white">
            <div className='flex flex-row gap-5 items-center'>
                <span>On/Off</span>
                <Switch onChange={paymentControl} checked={statusPayment?.status} />
            </div>
            <div className='flex flex-row gap-5 items-center'>
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
            </div>
        </div>
    );
};

export default Header;
