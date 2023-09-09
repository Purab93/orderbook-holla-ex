/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import OrderBookEntry from './OrderBookEntry';

const Orderbook = () => {
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);

    const { sendMessage, lastMessage } = useWebSocket('wss://api.hollaex.com/stream', {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        reconnectInterval: 30000
    });

    useEffect(() => {
        sendMessage(JSON.stringify({
            op: 'subscribe',
            args: ['orderbook:btc-usdt']
        }));
    }, [sendMessage]);

    useEffect(() => {
        if (lastMessage) {
            const { data: { asks = [], bids = [] } = {} } = JSON.parse(lastMessage.data);
            setAsks(asks.slice(0, 10).reverse());
            setBids(bids.slice(0, 10));
        }
    }, [lastMessage]);

    const getEntries = useCallback((entries, isBid) => {
        return (
            <div className="mt-8">
                {entries.map(([price, amount], index) => (
                    <div key={isBid ? 'bids-' + index : 'asks-' + index}>
                        <OrderBookEntry price={price} amount={amount} isBid={isBid} />
                    </div>
                ))}
            </div>
        );
    }, []);

    const getTitles = () => (
        <div className="order-book-entry grid grid-cols-2 py-0.5">
            <div className="border-b-2 border-secondaryBg pb-1 text-xs">
                <div>Price</div>
                <div>(USDT)</div>
            </div>
            <div className={`${"border-b-2 border-secondaryBg pb-1 text-xs"} text-right`}>
                <div>Amount</div>
                <div>(BTC)</div>
            </div>
        </div>
    );

    const getTradeTitle = (isBid) => {
        const bgClass = isBid ? 'bg-tradeRed' : 'bg-tradeGreen';
        const textClass = isBid ? 'text-tradeRed' : 'text-tradeGreen';
        const text = isBid ? 'Sellers' : 'Buyers';

        return (
            <div className='grid grid-cols-4 my-4'>
                <div className={`h-[2px] ${bgClass} col-span-3 my-auto`}></div>
                <div className={`${textClass} ml-2`}>{text}</div>
            </div>
        );
    };

    return (
        <div className='text-white flex'>
            <div className="order-book-block bg-tertiaryBg border-2 border-secondaryBg w-[260px] ml-8">
                <div className="order-book-title bg-secondaryBg capitalize px-4 py-1 text-sm font-extrabold grid grid-cols-8">
                    <div>
                        <img 
                            className="max-w-[18px]"
                            alt="icon" 
                            src="https://hollaex-resources.s3.ap-southeast-1.amazonaws.com/icons/btc.svg" 
                        />
                    </div>
                    <div>Orderbook</div>
                </div>
                <div className="order-block-trade px-4 py-1">
                    {getTitles()}
                    {getTradeTitle(true)}
                    {getEntries(asks, true)}
                    {getEntries(bids, false)}
                    {getTradeTitle(false)}
                </div>
            </div>
        </div>
    );
};

export default Orderbook;
