"use client"
import { Lock, Mail, User2Icon } from 'lucide-react';
import React from 'react';
import { useSearchParams } from "next/navigation";


const Login = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("state");
    const [state, setState] = React.useState(id || "login")




    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    return (
        <div className='flex items-center justify-center min-h-screen '>
            <div className='p-4 bg-violet-400/10 blur-3xl w-100 h-50 md:w-150 md:h-150 absolute top-0 md:top-15 -z-10 rounded-full'>

            </div>
            <form
                onSubmit={handleSubmit}
                className=' w-full max-w-100 text-center bg-white border border-gray-800 rounded-2xl px-8 text-black'>
                <h1 className=' text-3xl mt-10 font-bold'>
                    {state === 'login' ? 'Login' : 'Sign up'}
                </h1>

                <p className='text-gray-400 text-sm mt-2'>Please {state} to continue</p>

                {state !== 'login' && (
                    <div className='flex items-center mt-6 w-full  border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 '>
                        <User2Icon size={16} className='text-gray-400' />
                        <input
                            type='text'
                            name='name'
                            placeholder='Name'
                            className='w-full bg-transparent  placeholder-gray-400 border-none outline-none '
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div className='flex items-center w-full mt-4  border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 '>
                    <Mail className='text-gray-400' size={16} />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email id'
                        className='w-full bg-transparent  placeholder-gray-400 border-none outline-none '
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className=' flex items-center mt-4 w-full border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 '>
                    <Lock size={16} className='text-gray-400' />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='w-full bg-transparent  placeholder-gray-400 border-none outline-none'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='mt-4 text-left'>
                    <button className='text-sm text-indigo-400 hover:underline'>
                        Forget password?
                    </button>
                </div>

                <button
                    type='submit'
                    className='mt-2 w-full h-11 rounded-full text-white bg-violet-600 hover:bg-violet-500 transition active:scale-98'>
                    {state === 'login' ? 'Login' : 'Sign up'}

                </button>

                <p
                    onClick={() =>
                        setState((prev) => (prev === 'login' ? 'register' : 'login'))
                    }
                    className='text-gray-400 text-sm mt-3 mb-11 cursor-pointer'>
                    {state === 'login'
                        ? "Don't have an account?"
                        : 'Already have an account?'}
                    <span className='text-indigo-400 hover:underline ml-1'>
                        click here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
