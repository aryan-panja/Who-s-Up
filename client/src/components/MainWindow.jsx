import React, { useEffect, useState } from 'react'
import { ContactsSection } from './ContactsSection'
import { MessagesSection } from './MessagesSection'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { AlignJustifyIcon } from 'lucide-react'
import { use } from 'react'

export const MainWindow = () => {

    const [userSelected, setUserSelected] = useState(null);
    const [globalSearch, setGlobalSearch] = useState('');
    
    // Selecting the user
    useEffect(() => {
        console.log(userSelected)
    }, [userSelected])

    // Searching the user globally from database
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(globalSearch !== ''){
                console.log(globalSearch);
            }// Update search query only after delay
        }, 1000);

        return () => clearTimeout(delayDebounceFn); // Cleanup timeout on component unmount or value change
    }, [globalSearch]);

    // make 20 more contacts data
    const contacts = [
        {
            id: 1,
            name: 'Barclays Interviews || 2026 Batch',
            message: '~Akshit Bansal: https://forms.gle/jVWd7XAcBPfk6nTd7',
            img: '/placeholder.svg'
        },
        {
            id: 2,
            name: 'Class Notes',
            message: 'Garv Kakas: Dear students, Your ML EST answer sheets will be...',
            img: '/placeholder.svg'
        },
        {
            id: 3,
            name: '3Q12(Prev. 3CS2🥺💔)',
            message: 'You: MI ke kaha dikhayenge?',
            img: '/placeholder.svg'
        },
        {
            id: 4,
            name: 'Apoorva',
            message: 'You reacted ❤️ to "12.55 ki train"',
            img: '/placeholder.svg'
        },
        {
            id: 5,
            name: 'Amandeep Singh GDSC CORE',
            message: 'You reacted ❤️ to "Done"',
            img: '/placeholder.svg'
        },
        {
            id: 6,
            name: 'GDSC Announcement 24-25',
            message: 'Marul Bhardwaj / TAAS Team reacted 👍 to "There will be a...',
            img: '/placeholder.svg'
        },
        {
            id: 7,
            name: 'GDSC Unofficial 24-25',
            message: 'Amandeep Singh: If someone is not able to attend send the...',
            img: '/placeholder.svg'
        },
        {
            id: 8,
            name: '+91 6239 538 468',
            message: 'Ok',
            img: '/placeholder.svg'
        },
        {
            id: 9,
            name: 'Reyan Singh GDSC CORE',
            message: 'Ok',
            img: '/placeholder.svg'
        },
        {
            id: 10,
            name: 'Thapar Recruitment Updates',
            message: 'Aastha Sharma: Shortlisted candidates for Infosys will be...',
            img: '/placeholder.svg'
        },
        {
            id: 11,
            name: 'Family Group 👨‍👩‍👧‍👦',
            message: 'Mom: Beta, dinner ready hai.',
            img: '/placeholder.svg'
        },
        {
            id: 12,
            name: 'Thapar Coding Club 2024',
            message: 'Aditya Khanna: The hackathon schedule is finalized...',
            img: '/placeholder.svg'
        },
        {
            id: 13,
            name: 'Fitness Buddies 🏋️‍♂️',
            message: 'Ravi: Morning run kal miss mat karna.',
            img: '/placeholder.svg'
        },
        {
            id: 14,
            name: 'Book Club 📚',
            message: 'Priya: Next book discussion is on Monday.',
            img: '/placeholder.svg'
        },
        {
            id: 15,
            name: 'Internship Seekers 2026',
            message: 'You: Does anyone have the HR contact for Amazon?',
            img: '/placeholder.svg'
        },
        {
            id: 16,
            name: 'Crypto Investors 💰',
            message: 'Aryan Gupta: Bitcoin just hit a new high!',
            img: '/placeholder.svg'
        },
        {
            id: 17,
            name: 'Roommates 3Q15 🏠',
            message: 'You: Rent bhej diya?',
            img: '/placeholder.svg'
        },
        {
            id: 18,
            name: 'Cultural Fest Team 2024',
            message: 'Riya: The decoration budget has been approved!',
            img: '/placeholder.svg'
        },
        {
            id: 19,
            name: 'Thapar Canteen Lovers',
            message: 'Rohan: Chhole bhature kal try karte hain.',
            img: '/placeholder.svg'
        },
        {
            id: 20,
            name: 'DSA Warriors 🛡️',
            message: 'Vikram: Today’s session on graphs was awesome!',
            img: '/placeholder.svg'
        },
        {
            id: 21,
            name: 'Music Jamming 🎵',
            message: 'Sneha: Let’s meet at 6 pm for practice.',
            img: '/placeholder.svg'
        },
        {
            id: 22,
            name: 'Gaming Clan 🎮',
            message: 'You: Anyone for Valorant tonight?',
            img: '/placeholder.svg'
        },
        {
            id: 23,
            name: 'Photography Club 📷',
            message: 'Kunal: Submit your best shots by Sunday.',
            img: '/placeholder.svg'
        },
        {
            id: 24,
            name: 'Final Year Project Team',
            message: 'Aditi: The prototype demo went well.',
            img: '/placeholder.svg'
        },
        {
            id: 25,
            name: 'Corporate Connect 2024',
            message: 'Manish Sharma: There’s a webinar tomorrow at 5 pm.',
            img: '/placeholder.svg'
        },
        {
            id: 26,
            name: 'Netflix Watch Party 🎬',
            message: 'Simran: Let’s watch the next episode tonight.',
            img: '/placeholder.svg'
        },
        {
            id: 27,
            name: 'Startup Enthusiasts 🚀',
            message: 'You: The pitch deck is almost ready!',
            img: '/placeholder.svg'
        },
        {
            id: 28,
            name: 'Thapar Cricket Team 🏏',
            message: 'Coach: Practice is rescheduled to 7 am.',
            img: '/placeholder.svg'
        },
        {
            id: 29,
            name: 'Mock Placement Drives',
            message: 'Hriday: Next session is on 2nd Jan.',
            img: '/placeholder.svg'
        },
        {
            id: 30,
            name: 'Birthday Bash 🎉',
            message: 'Raj: Party starts at 8 pm sharp!',
            img: '/placeholder.svg'
        }
    ];
    

    const width = window.innerWidth;
    const contactsWidth = width - (70 / 100) * width;
    const messagesWidth = width - contactsWidth;

    // console.log(width, contactsWidth, messagesWidth);

    return (
        <div className='min-h-screen overflow-hidden max-h-screen bg-[#2C2C2C]'>

            <div className='bg-[#202020] px-3 py-2 flex items-center space-x-4'>

                <svg fill="#24BD5D" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_468_"> <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path> </g> </g></svg>

                <h1 className='text-white'>WhatsApp</h1>
                
            </div>

            <div className='flex'>

                <div className='bg-[#202020] px-2 py-2'>
                    <AlignJustifyIcon color='white' />
                </div>

                <ResizablePanelGroup
                    direction="horizontal"
                >
                    <ResizablePanel 
                        defaultSize={contactsWidth}
                        className='shadow-sm shadow-black'
                    >

                        <ContactsSection
                            contacts={contacts}
                            userSelected={userSelected}
                            setUserSelected={setUserSelected}
                            setGlobalSearch={setGlobalSearch}
                        />

                    </ResizablePanel>
                    <ResizableHandle className={'w-0'} />

                    <ResizablePanel defaultSize={messagesWidth}>

                        <MessagesSection
                            userSelected={userSelected}
                        />

                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

        </div>
    )
}
