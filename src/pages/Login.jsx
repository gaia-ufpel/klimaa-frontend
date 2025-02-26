import 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import useAuth from "../hooks/useAuth.js";
import {toast} from "react-toastify";
import api from "../api.js";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    api.post('/v1/auth/login', data)
        .then(response => {
          toast('Login efetuado com sucesso!')
          login(response.data.token, response.data.user)
          navigate('/')
        })
        .catch(error => {
          if (error.response.data.detail)
              toast.error(error.response.data.detail)
        })
  }

  return (
    <div
          className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-xl font-medium text-gray-900">Entra na sua conta Klimaa!</h5>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Seu email
          </label>
          <input type="email" name="email" id="email"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 placeholder="nome@email.com"
                 {...register('email', {required: 'Campo obrigatório'})}
          />
          {errors.email && <p className="text-red-500 text-sm font-semibold mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Sua senha
          </label>
          <input type="password" name="password" id="password" placeholder="••••••••"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 {...register('password', {required: 'Campo obrigatório'})}
          />
          {errors.password && <p className="text-red-500 text-sm font-semibold mt-1">{errors.password.message}</p>}
        </div>
        <div className="flex items-start">
          <a href="#" className="ms-auto text-sm text-blue-700 hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        <button type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Entrar
        </button>
        <div className="text-sm font-medium text-gray-500">
          Não possui uma conta ainda?
          <br/>
          <Link to="/register" className="text-blue-700 hover:underline">
            Crie uma conta agora mesmo!
          </Link>
        </div>
      </form>
    </div>
  )
}
