import { useState, type FormEvent } from "react";
import { formatCardNumber, formatExpiry } from "../utils/format";
import IChip from "../assets/chip.png"

interface CreditCardProps {
    createOrder: (e:FormEvent<HTMLFormElement>) => void;
}
const CreditCard = ({ createOrder }: CreditCardProps) => {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);

    const plainNumber = number.replace(/\s/g, "");

    return (
        <div className="max-w-4xl mx-auto p-6 font-montserrat">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                <div>
                    <div
                        className={`relative w-full max-w-md mx-auto transition-transform duration-500 transform-gpu ${isFlipped ? "rotate-y-180" : ""
                            }`}
                        style={{ transformStyle: "preserve-3d" }}
                    >

                        <div className="card-front bg-linear-to-r from-[#222523] to-[#4b4d4c] text-white rounded-2xl p-6 shadow-xl w-full h-56 backface-hidden">
                            <div className="flex justify-between items-start">
                                <div className="rounded-md px-3 py-1 text-xs">
                                    <img className="w-10 h-10" src={IChip} />
                                </div>
                                <div className="text-sm font-semibold">VISA</div>
                            </div>

                            <div className="mt-8 text-lg tracking-widest font-mono">
                                {plainNumber.length === 0 ? "•••• •••• •••• ••••" : formatCardNumber(plainNumber)}
                            </div>

                            <div className="mt-6 flex justify-between items-end">
                                <div>
                                    <div className="text-xs opacity-80" >Card Holder</div>
                                    <div className="font-semibold">{name || "FULL NAME"}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs opacity-80">Expires</div>
                                    <div className="font-semibold">{expiry || "MM/YY"}</div>
                                </div>
                            </div>
                        </div>


                        <div className="absolute inset-0 bg-linear-to-r from-[#222523] to-[#4b4d4c] text-white rounded-2xl p-6 shadow-xl w-full h-56 backface-hidden rotate-y-180"
                            style={{ transform: "rotateY(180deg)" }}>
                            <div className="h-10 bg-black/80 mt-2 rounded-sm"></div>
                            <div className="mt-6">
                                <div className="bg-white h-8 rounded text-black p-2 flex items-center justify-end">{cvc || "•••"}</div>
                                <div className="mt-4 text-sm opacity-80">Signature</div>
                            </div>
                            <div className="absolute bottom-4 right-6 font-semibold">VISA</div>
                        </div>
                    </div>
                </div>

                <form
                onSubmit={createOrder}
                className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Credit card</h3>

                    <label className="block text-sm text-gray-600">Card number</label>
                    <input
                        name="card"
                        inputMode="numeric"
                        value={formatCardNumber(number)}
                        onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                            setNumber(raw);
                        }}
                        className="mt-1 mb-3 w-full px-4 py-2 border rounded-lg focus:outline-none"
                        placeholder="1234 5678 1234 5678"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-600">Name</label>
                            <input
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value.toUpperCase())}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="FULL NAME"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600">Expiry (MM/YY)</label>
                            <input
                                name="expiry"
                                inputMode="numeric"
                                value={expiry}
                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none"
                                placeholder="MM/YY"
                                maxLength={5}
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        <label className="block text-sm text-gray-600">CVC</label>
                        <input
                            name="cvv"
                            inputMode="numeric"
                            value={cvc}
                            onFocus={() => setIsFlipped(true)}
                            onBlur={() => setIsFlipped(false)}
                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            className="mt-1 w-40 px-4 py-2 border rounded-lg focus:outline-none"
                            placeholder="CVC"
                        />
                    </div>

                    <div className="w-full mt-6 flex justify-center items-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition w-full"
                        >
                            Pay Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreditCard;
