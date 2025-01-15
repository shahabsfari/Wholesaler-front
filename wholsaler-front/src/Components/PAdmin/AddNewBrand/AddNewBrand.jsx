import React, { useState } from 'react'
import Uploader from '../Uploader/Uploader'
import InputText from '../../InputText/InputText'
import FileUploadService from '../../ApiFunctions/FileUploadService';
import Swal from 'sweetalert2';
export default function AddNewBrand({ user, setUpdate }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('')


  // const handleClick = async () => {

  //   if (image === '' || name === '') {
  //     Swal.fire("خطا", "لطفاً نام و عکس را وارد کنید", "error");
  //     return;
  //   }

  //   Swal.fire({
  //     title: "در حال ارسال...",
  //     text: "لطفاً کمی صبر کنید",
  //     allowOutsideClick: false,
  //     showConfirmButton: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   try {
  //     const responseImage = await FileUploadService.uploadFile(image, user.token, "image");
  //     console.log("IMAGE", responseImage.data.dataList[0])
  //     console.log("response", responseImage)
  //     if (!responseImage.data.hasError) {
  //       const brandData = {
  //         name: name,
  //         image: responseImage.data.dataList[0],
  //       };

  //       try {
  //         const response = await fetch('/api/brand', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'token': user.token
  //           },
  //           body: JSON.stringify(brandData),
  //         });
  //         const data = await response.json();

  //         if (data.status === 'SUCCESS') {
  //           setName('')
  //           setImage('')
  //           setUpdate()
  //           Swal.fire("موفقیت!", "اطلاعات با موفقیت ثبت شد", "success");
  //         } else {
  //           console.error('Error:', data.message);
  //         }
  //       } catch (error) {
  //         console.error('Request failed', error);
  //         Swal.fire("خطا", "ارسال اطلاعات با مشکل مواجه شد", "error");
  //       }
  //     }
  //   } catch (error) {
  //     console.log('brand File upload failed!');
  //     Swal.fire("خطا", "ارسال اطلاعات با مشکل مواجه شد", "error");
  //   }
  // };

  const handleClick = async () => {
    if (name === '') {
      Swal.fire("خطا", "لطفاً نام و عکس را وارد کنید", "error");
      return;
    }

    Swal.fire({
      title: "در حال ارسال...",
      text: "لطفاً کمی صبر کنید",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      let brandData = { name };

      if (image !== '') {
        const responseImage = await FileUploadService.uploadFile(image, user.token, "image");
        console.log("IMAGE", responseImage.data.dataList[0]);
        console.log("response", responseImage);

        if (responseImage.data.hasError) {
          Swal.fire("خطا", "آپلود عکس با مشکل مواجه شد", "error");
          return;
        }

        // اضافه کردن تصویر به داده‌های برند
        brandData.image = responseImage.data.dataList[0];
      }

      // فراخوانی API برای ایجاد برند
      const response = await fetch('/api/brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': user.token
        },
        body: JSON.stringify(brandData),
      });

      const data = await response.json();
      console.log(brandData);
      console.log(data);

      if (data.status === 'SUCCESS') {
        setName('');
        setImage('');
        setUpdate();
        Swal.fire("موفقیت!", "اطلاعات با موفقیت ثبت شد", "success");
      } else {
        console.error('Error:', data.message);
        Swal.fire({
          title: "خطا",
          text: "ارسال اطلاعات با مشکل مواجه شد",
          icon: "error",
          confirmButtonText: "تایید",
          showConfirmButton: true,
        });
        
      }
    } catch (error) {
      console.error('Request failed', error);
      Swal.fire({
        title: "خطا",
        text: "ارسال اطلاعات با مشکل مواجه شد",
        icon: "error",
        confirmButtonText: "تایید",
        showConfirmButton: true,
      });
      
    }
  };

  return (
    <div className='w-full flex-col text-white'>
      {/* top */}
      <div className='border-b-2 border-[#55555e] flex pb-4 pt-5 sm:pt-0 '>
        <span className='font-MorabbaMedium text-xl '>افزودن برند جدید</span>
      </div>
      <div className='grid grid-cols-12 py-5 gap-4'>
        <Uploader value={image === '' ? '' : image.name} setFunc={(image) => setImage(image)} className="col-span-12 sm:col-span-4 " />
        <InputText mode="bg-[#383854]" value={name} setFunc={(name) => setName(name)} inputClassName='text-center' className='font-Dana col-span-12 sm:col-span-4 max-h-11' bg="bg-[#383854]" title="اسم برند" border="border-2 border-[#55555e]" />
        <button onClick={() => handleClick()} className='btn col-span-12 sm:col-span-4 font-Dana'>
          اضافه کردن
        </button>
      </div>
    </div>
  )
}
