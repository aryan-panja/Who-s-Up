import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import avatar from '@/assets/avatar.png';
import { XIcon } from 'lucide-react';
import { findUser, userContacts } from '@/utils/ContactsController';

export const ContactsSection = ({ userSelected, setUserSelected }) => {

    const [usersContacts, setUsersContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [globalSearch, setGlobalSearch] = useState('');
    const [searchRegion, setSearchRegion] = useState(0);

    // getting user's contacts
    const getUsersContacts = async () => {
        const response = await userContacts();
        if (!response) return;
        console.log(response.data.contacts);
        setUsersContacts(response.data.contacts);
    }

    useEffect(() => {
        getUsersContacts();

    }, [])

    // Searching the user globally from the database
    const findUserGlobally = async (username) => {
        const response = await findUser(username);
        if (!response) return;
        console.log(response);
        // contacts = response.data.contacts;
        setUsersContacts(response.data.contacts);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (globalSearch !== '') {
                console.log(globalSearch);
                findUserGlobally(globalSearch);
            }
            else{
                getUsersContacts();
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn); // Cleanup timeout on component unmount or value change
    }, [globalSearch]);


    useEffect(() => {
        // Update searchRegion only if searchRegion value changes
        if (searchRegion === 1 && search !== globalSearch) {
            setGlobalSearch(search);
        }
    }, [search, searchRegion]);

    // Filter contacts based on searchRegion
    const filteredContacts = searchRegion === 0
        ? usersContacts.filter(contact => contact.username.toLowerCase().includes(search.toLowerCase()))
        : usersContacts;

    return (
        <div className='h-full '>
            <div className='py-8 flex flex-col gap-4 max-h-screen min-h-screen'>
                <div className='flex flex-col space-y-4 mx-6'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-white text-xl font-bold'>Chats</h1>

                        <div className='flex justify-center items-center gap-4 text-white text-sm font-semibold'>
                            <button
                                className={`${searchRegion === 0 ? 'border-[#1BB565]' : 'border-transparent'} border-b-2`}
                                onClick={() => setSearchRegion(0)}
                            >
                                Contacts
                            </button>

                            <button
                                className={`${searchRegion === 1 ? 'border-[#1BB565]' : 'border-transparent'} border-b-2`}
                                onClick={() => setSearchRegion(1)}
                            >
                                Global
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex justify-center items-center relative group">
                        <input
                            className="w-full pl-2 bg-[#222222] text-white py-[2px] focus:outline-none
        border-b-2 border-b-[#222222] focus:border-[#1BB565] rounded-sm placeholder:text-sm"
                            type="text"
                            placeholder="Search or start a new chat"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <XIcon
                                className="absolute right-2 cursor-pointer opacity-100 transition-opacity hover:opacity-80"
                                color="white"
                                size={18}
                                onClick={() => setSearch('')}
                            />
                        )}
                    </div>
                </div>

                <div className='overflow-y-auto mx-6 mr-1'>
                    {
                        filteredContacts.map((contact) => (
                            <ContactCards
                                className={`${contact.user_id === userSelected ? 'bg-[#383838]' : ''}`}
                                key={contact.user_id}
                                heading={contact.username}
                                message='Hello'
                                img={contact.profile_pic}
                                onClick={() => setUserSelected(contact.user_id)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const ContactCards = ({ heading, message, className, img, ...props }) => {
    return (
        <div className={cn('w-full p-2 my-2 rounded-md flex justify-center items-center gap-4 overflow-hidden hover:bg-[#383838] cursor-default', className)} {...props}>
            <div
                style={{
                    width: "50px",
                    height: "50px",
                    backgroundImage: `url(${avatar})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>
            <div className='flex flex-col justify-center w-[calc(100%-60px)]'>
                <h1 className='text-white text-md font-semibold'>
                    {heading}
                </h1>
                <div
                    className='text-[#e4e4e4d3] text-sm'
                    style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        width: '100%',
                    }}
                >
                    {message}
                </div>
            </div>
        </div>
    );
};
