import React, { useContext, useEffect, useState } from 'react'
import TopBarInUsers from '../../../../Components/PAdmin/TopBarInUsers/TopBarInUsers'
import UsersList from '../../../../Components/PAdmin/UsersList/UsersList'
import PaginationButtons from '../../../../Components/PaginationButtons/PaginationButtons';
import AuthContext from '../../../../AuthContext';
import Swal from 'sweetalert2';
import { use } from 'react';
export default function IndexOfUsers() {
    const { user } = useContext(AuthContext)
    const pageCount = 20;
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = sessionStorage.getItem("usersPage");
        return savedPage ? Number(savedPage) : 0;
    });
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        sessionStorage.setItem("usersPage", selectedPage);
    };


    const [users, setUsers] = useState([]);
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [userLoading, setUserLoading] = useState(true);
    const [error, setError] = useState(null);

    // ..................in ja moheme pakesh koni

    // useEffect(() => {
    //     setUsers([
    //         {
    //             "id": 17,
    //             "firstName": "shahab",
    //             "lastName": "safari",
    //             "username": "09000000000",
    //             "password": "7c222fb2927d828af22f592134e8932480637c0d",
    //             "newPassword": null,
    //             "role": "ADMIN",
    //             "enable": true,
    //             "token": null,
    //             "fullName": "shahab safari"
    //         },
    //         {
    //             "id": 18,
    //             "firstName": "شهاب",
    //             "lastName": "صفری",
    //             "username": "09361310919",
    //             "password": "7c222fb2927d828af22f592134e8932480637c0d",
    //             "newPassword": null,
    //             "role": "USER",
    //             "enable": true,
    //             "token": null,
    //             "fullName": "شهاب صفری"
    //         },
    //         {
    //             "id": 19,
    //             "firstName": "محمد",
    //             "lastName": "صفری",
    //             "username": "09119854356",
    //             "password": "7c222fb2927d828af22f592134e8932480637c0d",
    //             "newPassword": null,
    //             "role": "USER",
    //             "enable": true,
    //             "token": null,
    //             "fullName": "محمد صفری"
    //         },
    //         {
    //             "id": 20,
    //             "firstName": "سمیه",
    //             "lastName": "احمد علیزاده",
    //             "username": "09382776591",
    //             "password": "7c222fb2927d828af22f592134e8932480637c0d",
    //             "newPassword": null,
    //             "role": "USER",
    //             "enable": true,
    //             "token": null,
    //             "fullName": "سمیه احمد علیزاده"
    //         }
    //     ])
    // }, [])

    const fetchUsers = async (pageSize, pageNumber, setUsers) => {
        try {
            setUserLoading(true)
            const response = await fetch(
                `/api/user/getAllUsers?pageSize=${pageSize}&pageNumber=${pageNumber}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                }
            );
            const data = await response.json();

            if (response.ok && data.status === "SUCCESS") {
                setTotalUsersCount(data.totalCount)
                setUsers(data.dataList);
            } else {
                throw new Error(data.message || "خطایی رخ داده است.");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: error.message,
                confirmButtonText: "تایید",
            });
        } finally {
            setUserLoading(false)
        }
    };

    useEffect(() => {
        if (user !== null) {
            fetchUsers(itemsPerPage, currentPage, setUsers)
        }
    }, [currentPage, user])



    return (
        <div className='flex flex-col h-full p-2 md:py-7 md:px-4'>
            <TopBarInUsers />
            <div className='flex flex-col flex-1 h-full justify-between pb-5 '>
                <div className='flex-1'>
                    <UsersList userLoading={userLoading} users={users} />
                </div>
                <PaginationButtons
                    pageCount={Math.ceil(totalUsersCount / itemsPerPage)}
                    currentPage={currentPage}
                    handlePageClick={handlePageClick}
                />
            </div>
        </div>
    )
}
