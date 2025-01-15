import React, { useContext, useEffect, useState } from 'react'
import SearchInput from '../SearchInput/SearchInput'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../AuthContext';
import { use } from 'react';
import Swal from 'sweetalert2';
export default function TopBarInUsers() {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [target, setTarget] = useState('')
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async (searchTerm) => {
    try {
      setUserLoading(true)
      const response = await fetch(
        `/api/user/getAllUsers?pageSize=10&pageNumber=0&target=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      console.log("data in search", data)
      if (response.ok && data.status === "SUCCESS") {
        setResults(data.dataList);
      } else {
        setResults([]);
        throw new Error(data.message || "خطایی رخ داده است.");
      }
    } catch (error) {
      setResults([]);
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
    if (target.trim() === "") {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchUsers(target);
    }, 500);


    return () => clearTimeout(delayDebounceFn);
  }, [target]);


  const recommendedProduct = async (item) => {
    navigate("detailsOfUser", { state: { userInfo: item } });
  };

  console.log( "searchTarget :" , target)
  return (
    <div className='pr-8 sm:pr-0' >
      <div className='relative w-fit'>
        <SearchInput setIsFocused={setIsFocused} value={target} setFunc={setTarget} placeholder="جستجوی مشتری..." />
        {
          isFocused && (
            <div className='absolute top-[82%] w-[98%] font-Dana shadow-2xl  z-20 rounded-b-xl bg-white divide-y-2 divide-black/30 flex flex-col left-1/2 -translate-x-1/2 '>
              {
                results.map((item) => (
                  <div key={item.id} onClick={() => recommendedProduct(item)} className='w-full gap-3 cursor-pointer flex justify-between py-4 px-2 '>
                    <div className='flex justify-start'>
                      {
                        item.firstName + " " + item.lastName
                      }
                    </div>
                    <div>
                      {
                        item.id
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}
