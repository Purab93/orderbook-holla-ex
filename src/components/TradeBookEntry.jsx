import React from 'react';

const TradeBookEntry = ({ price, amount, isBid, className }) => {
    const priceClass = isBid ? 'text-tradeRed' : 'text-tradeGreen';
    const amtClass = isBid ? 'bg-tradeRedBg' : 'bg-tradeGreenBg';
    const hoverClass = isBid ? 'hover:bg-tradeRed' : 'hover:bg-tradeGreen';

    const SplitStringWithRegex = (inputString ) => {
        const regex = /^([0]+\.0*)/g;
        const parts = inputString.split(regex);

        if(inputString.startsWith(0)){
            return (
            <div>
                <span className="leading-zeros text-inactiveLabels">{parts[1]}</span>
                <span className="remaining-string">{parts[2]}</span>
            </div>
            );
        }

        return (
            <div>
                <span className="remaining-string">{inputString}</span>
            </div>
        )
    };

    return (
        <div
            className={`order-book-entry grid grid-cols-3 py-0.5 text-xs hover:text-white ${hoverClass} ${priceClass} cursor-pointer ${className}`}
        >
            <div className={`price col-span-2`}>{parseFloat(price.toFixed(1))}</div>
            <div className={`amount text-right relative text-white ${amtClass}`}>{SplitStringWithRegex(`${amount}`)}</div>
        </div>
    );
};

export default TradeBookEntry;
