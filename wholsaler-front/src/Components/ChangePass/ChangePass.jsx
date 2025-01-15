import React, { useContext, useState } from 'react'
import Modal from '../Modal/Modal'
import InputText from '../InputText/InputText'
import AuthContext from '../../AuthContext'
import Swal from 'sweetalert2'
export default function ChangePass({ onClose }) {
    const {user , userloading } = useContext(AuthContext)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatnewPassword, setRepeatnewPassword] = useState('')

    const handleUpdateUser = async () => {
        if (!userloading) {
            try {
                const response = await fetch(  `/api/user/change-password/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ password, newPassword }),
                });
                console.log({ password, newPassword })
                const data = await response.json();
                console.log(data)
                if (data.status === 'SUCCESS' && !data.hasError) {
                    Swal.fire({
                        icon: 'success',
                        title: 'موفقیت آمیز',
                        text: 'تغییرات با موفقیت ثبت شد!',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: data.message || 'ثبت تغییرات با شکست مواجه شد!',
                    });
                }
            } catch (error) {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'یک خطا در ثبت تغییرات رخ داده است.',
                });
            }
        }
    };

    return (
        <div>
            <Modal onClose={onClose} isOpen={true} blur={true} opacity={"bg-opacity-30"} >
                <div className='min-w-full h-screen flex items-center justify-center col-span-12'>
                    <div className='bg-white space-y-5 p-10 rounded-xl min-w-[400px]' >
                        <InputText value={password} setFunc={(value) => setPassword(value)} title="رمز" />
                        <InputText value={newPassword} setFunc={(value) => setNewPassword(value)} title="رمز جدید" />
                        <InputText value={repeatnewPassword} setFunc={(value) => setRepeatnewPassword(value)} title="تکرار رمز جدید" />
                        <button onClick={handleUpdateUser} className='btn w-full min-h-11'>تایید</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
