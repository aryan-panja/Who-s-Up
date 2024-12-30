import React, { useEffect, useRef } from 'react';
import { Heart, Send } from 'lucide-react';
import background from '@/assets/whatsapp_background.png';

export const UserMessagesSection = () => {

    const messages = [
        { id: 1, text: "koina aapke saath hi", time: "16:15", isOutgoing: true, hasHeart: true },
        { id: 2, text: "Yaaaayy", time: "16:15", isOutgoing: false, hasHeart: true },
        { id: 3, text: "thand kaisi??", time: "16:15", isOutgoing: false },
        { id: 4, text: "Ok ok", time: "16:15", isOutgoing: false, hasHeart: true },
        { id: 5, text: "Abhi tak bahot garmi thi", time: "16:15", isOutgoing: false, hasHeart: true },
        { id: 6, text: "Abhi jacket daali", time: "16:15", isOutgoing: false },
        { id: 7, text: "jiiiii", time: "16:15", isOutgoing: true },
        { id: 8, text: "Ittu ittu shuru hori", time: "16:15", isOutgoing: false },
        { id: 9, text: "okokkkk", time: "16:15", isOutgoing: true },
        { id: 10, text: "Byeeeeeeeeeeeeeee", time: "16:15", isOutgoing: false, hasHeart: true },
        { id: 11, text: "Loveeeeee uuuuuu", time: "16:15", isOutgoing: false, hasHeart: true },
        { id: 12, text: "loveee uuuuuuumoreeeeeeeeeeeee", time: "16:15", isOutgoing: true, hasHeart: true },
        { id: 13, text: "kya update??", time: "20:16", isOutgoing: true },
        { id: 14, text: "Aaj bahot busy thi 😔", time: "20:17", isOutgoing: false },
        { id: 15, text: "Koi baat nahi", time: "20:18", isOutgoing: true, hasHeart: true },
        { id: 16, text: "Kal milte hai?", time: "20:19", isOutgoing: true },
        { id: 17, text: "Haan pakka! ❤️", time: "20:19", isOutgoing: false, hasHeart: true },
        { id: 18, text: "Kitna miss kiya aapko 🥺", time: "20:20", isOutgoing: false },
        { id: 19, text: "Mujhse zyada nahi 😘", time: "20:21", isOutgoing: true },
        { id: 20, text: "Ab jaldi aana!", time: "20:22", isOutgoing: false },
        { id: 21, text: "Hamesha ❤️", time: "20:22", isOutgoing: true, hasHeart: true },
        { id: 22, text: "Dinner ho gaya?", time: "20:23", isOutgoing: false },
        { id: 23, text: "Nahi, aapke bina nahi khaya", time: "20:24", isOutgoing: true },
    ];

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollTo({
            top: messagesEndRef.current.scrollHeight,
            behavior: 'smooth', // Smooth scrolling
        });
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom on mount or when messages change
    }, []);

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom whenever messages change
    }, [messages]);

    return (
        <div
            className="flex flex-col justify-center w-full max-h-[calc(100%-45%)]"
            style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Scrollable message container */}
            <div
                className="flex-grow overflow-y-auto p-4 space-y-2"
                ref={messagesEndRef} // Assign ref here
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] flex items-end gap-1 ${
                                message.isOutgoing ? 'flex-row-reverse' : 'flex-row'
                            }`}
                        >
                            <div
                                className={`text-white px-3 py-1.5 rounded-2xl relative ${
                                    message.isOutgoing
                                        ? 'bg-emerald-800 rounded-tr-none'
                                        : 'bg-zinc-800 rounded-tl-none'
                                }`}
                            >
                                <p className="text-sm break-words">{message.text}</p>
                                <div className="flex items-center gap-1 justify-end -mb-1">
                                    <span className="text-[10px] text-zinc-400">{message.time}</span>
                                </div>
                            </div>
                            {message.hasHeart && (
                                <Heart className="w-3 h-3 text-red-500 fill-red-500 flex-shrink-0" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input section */}
            <div className="w-full bg-[#222222] mt-2 pt-2 pb-7 px-5">
                <div className="flex items-end justify-between space-x-4">
                    <textarea
                        className="w-full pl-4 pr-10 bg-[#222222] text-white py-2 focus:outline-none
              border-b-2 border-[#444444] focus:border-[#1BB565] placeholder:text-sm resize-none overflow-y-auto hide-scrollbar"
                        placeholder="Type a message"
                        rows={1}
                        style={{
                            minHeight: '30px',
                            maxHeight: '55px',
                        }}
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                    />
                    <Send
                        className="cursor-pointer hover:opacity-80"
                        color="white"
                        size={20}
                    />
                </div>
            </div>
        </div>
    );
};
