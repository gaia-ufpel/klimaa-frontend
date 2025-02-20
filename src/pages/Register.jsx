import React, { useEffect, useState } from 'react';
import { MdLock } from 'react-icons/md';
import { useForm } from 'react-hook-form';

import registerLogo from '../assets/register.png';

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm()


    const onSubmit = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        if (response.ok) {
            alert('Conta criada com sucesso!')
            reset()
        } else {
            if (responseData.detail)
                alert(responseData.detail)
            console.log(responseData)
        }
    }

    return (
        <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 md:px-16'>
            <form className='flex flex-col font-montserrat justify-center items-center space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid space-y-2'>
                    <div className='space-y-1'>
                        <label className='block mb-2 ms-4 text-sm font-medium text-gray-900'>
                            Nome completo
                        </label>
                        <input className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.name ? "border-red-500" : ""}`} type='text' {...register('name', { required: true })} disabled={isSubmitting} />
                        {errors.name && (<p className='font-semibold text-red-500 right-4'>{`${errors.name.message}`}</p>)}
                    </div>
                    <div className='space-y-1'>
                        <label className='block mb-2 ms-4 text-sm font-medium text-gray-900'>
                            E-mail
                        </label>
                        <input className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.email ? "border-red-500" : ""}`} type='email' {...register('email', { required: true })} disabled={isSubmitting} />
                        {errors.email && (<p className='font-semibold text-red-500 right-4'>{`${errors.email.message}`}</p>)}
                    </div>
                    <div className='space-y-1'>
                        <label className='block mb-2 ms-4 text-sm font-medium text-gray-900'>
                            Senha
                        </label>
                        <input className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.password ? "border-red-500" : ""}`} type='password' {...register('password', { required: true })} disabled={isSubmitting} />
                        {errors.password && (<p className=' text-red-500 font-semibold right-4'>{`${errors.password.message}`}</p>)}
                    </div>
                    <div className='space-y-1'>
                        <label className='block mb-2 ms-4 text-sm font-medium text-gray-900'>
                            Confirme sua senha
                        </label>
                        <input className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.confirmpassword ? "border-red-500" : ""}`} type='password' {...register('password_confirmation', { required: true })} disabled={isSubmitting}></input>
                        {errors.password_confirmation && (<p className=' text-red-500 font-semibold right-4'>{`${errors.password_confirmation.message}`}</p>)}
                    </div>
                    <div className='space-y-1'>
                        <label className='block mb-2 ms-4 text-sm font-medium text-gray-900 font-montserrat'>
                            Classe
                        </label>
                        <select className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.group ? "border-red-500" : ""}`} {...register('group', { required: true })} disabled={isSubmitting}>
                            <option value="student" defaultValue>Estudante</option>
                            <option value="professor">Professor</option>
                            <option value="external community">Comunidade Externa</option>
                        </select>
                        {errors.group && (<p className=' font-semibold text-red-500 right-4'>{`${errors.group.message}`}</p>)}
                    </div>
                </div>
                <button type="submit"
                        className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`} disabled={isSubmitting}>
                    Crie uma conta
                </button>
            </form>
        </div>
    )
}