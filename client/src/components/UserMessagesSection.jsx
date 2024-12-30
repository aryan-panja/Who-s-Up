import React from 'react'
import background from '@/assets/whatsapp_background.png'
import { Send } from 'lucide-react'

export const UserMessagesSection = () => {

    const width = window.innerWidth;
    const contactsWidth = width - (70 / 100) * width;
    const messagesWidth = width - contactsWidth - 10000;

    return (
        <div
            className={`h-[calc(100vh-10px)] overflow-y-auto w-full max-w-[${messagesWidth}px]`}
            style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >

            <div className={`absolute bottom-0 w-full max-w-[calc(100%-32%)] bg-[#222222] pt-2 pb-4 px-5`}>
                <div className={`flex items-end justify-between space-x-4`}>
                    <textarea
                        className="w-full pl-4 pr-10 bg-[#222222] text-white py-2 focus:outline-none
        border-b-2 border-[#444444] focus:border-[#1BB565] rounded-sm placeholder:text-sm resize-none overflow-y-auto hide-scrollbar"
                        placeholder="Type a message"
                        rows={1} // Initial height
                        style={{
                            minHeight: "40px", 
                            maxHeight: "80px"
                        }}
                        onInput={(e) => {
                            e.target.style.height = 'auto'; // Reset height to auto
                            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
                        }}
                    />
                    <Send
                        className="cursor-pointer hover:opacity-80"
                        color="white"
                        size={20}
                    // onClick={handleSendMessage} // Ensure to define this function in your code
                    />
                </div>


            </div>

        </div>
    )
}
