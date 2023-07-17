import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
import { userState } from '../main'
// import { classNames } from '../components/common'
// import Queries from '../api/queries'
import { featureFlag } from '../../config'

const AppHeader = () => {
  const { user } = userState()
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdown = (e) => {
    e.preventDefault();
    console.log('woza', isOpen)
    setIsOpen(!isOpen);
  };


  const username = user.username


  const navigate = useNavigate()

  const { isAuthenticated } = user
  const { pricing, publicJobs } = featureFlag
  return (
    <header>
      <nav className='fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        {/* <nav className="z-10 w-full relative"> */}
        <div className='max-w-7xl mx-auto px-6 md:px-12 xl:px-6'>
          <div className='flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative'>
            <input
              aria-hidden='true'
              type='checkbox'
              name='toggle_nav'
              id='toggle_nav'
              className='hidden peer'
            />
            {/* <div className='relative z-19 w-full flex justify-between lg:w-max md:px-0'>
              <Link to='/' aria-label='logo' className='flex space-x-2 items-center'>
                <span className='text-2xl font-bold text-gray-900 dark:text-white'>Kg Jobs</span>
              </Link>
              <Link to='/login' aria-label='logo' className='flex space-x-2 items-center'>
                <span className='text-2xl font-bold text-gray-900 dark:text-white'>Login</span>
              </Link>
            </div> */}
            <div className='relative z-19 w-full flex justify-between md:px-0'>
  <Link to='/' aria-label='logo' className='flex space-x-2 items-center'>
    <span className='text-2xl font-bold text-gray-900 dark:text-white'>Kg Jobs</span>
  </Link>
  <div className={`flex flex-col items-center mt-0 ${!isAuthenticated &&  'bg-indigo-500 rounded-3xl border'}`}>
    {!isAuthenticated ? (
    <Link to='/login'
     aria-label='logo'
     className='flex h-9 flex-col w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'>
      <span className='text-sm font-semibold text-white'>Get Started</span>
    </Link>
      ) : (
    <Link 
    to='/dashboard' 
    aria-label='logo'
    className='flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'>
                  <span
                className='h-8 w-8 pl-2 pt-1 rounded-full border border-black'
              >
                {username.charAt(0).toUpperCase()}
              </span>
                <span 
                onClick={handleDropdown}
                className='flex-1 whitespace-nowrap w-6 ml-[10px]'>               
                {!isOpen ? (<label
                  role='button'
                  htmlFor='toggle_nav'
                  aria-label='humburger'
                  id='hamburger'
                  className='relative  p-6 -mr-6'
                >
                  <div
                    aria-hidden='true'
                    id='line'
                    className='m-auto h-0.5 w-5 rounded bg-black dark:bg-gray-300 transition duration-300'
                  ></div>
                  <div
                    aria-hidden='true'
                    id='line2'
                    className='m-auto mt-2 h-0.5 w-5 rounded bg-black dark:bg-gray-300 transition duration-300'
                  ></div>
                  <div
                    aria-hidden='true'
                    id='line3'
                    className='m-auto mt-2 h-0.5 w-5 rounded bg-black dark:bg-gray-300 transition duration-300'
                  ></div>
                </label>) : 
                <label htmlFor="closeButton" className="relative p-6 -mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>
</label>
}
                </span>
    </Link>
     )}
  </div>
</div>
           {isOpen && <div className='flex-col z-20 gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl justify-end w-full'>
              <div className='text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0'>
                <ul className='tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0'>
                  {publicJobs ? (
                    <li>
                      <Link to='/jobs' className='block md:px-4 transition hover:text-primary'>
                        <span>Jobs</span>
                      </Link>
                    </li>
                  ) : null}
                  {pricing ? (
                    <li>
                      <Link to='/pricing' className='block md:px-4 transition hover:text-primary'>
                        <span>Pricing</span>
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    <Link to='/FAQs' className='block md:px-4 transition hover:text-primary'>
                      <span>FAQs</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='mt-12 lg:mt-0 bg-indigo-500 rounded-3xl border'>
                {!isAuthenticated ? (
                  <Link
                    to={'/login'}
                    className='relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
                  >
                    <span className='relative text-sm font-semibold text-white'>
                      {'Get Started'}
                    </span>
                  </Link>
                ) : (
                  <Link
                    to={'/dashboard'}
                    className='relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
                  >
                    <span className='relative text-sm font-semibold text-white'>{'Dashboard'}</span>
                  </Link>
                )}
              </div>
              {/* {isAuthenticated ?
                    <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                </Menu>: null} */}
            </div>}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
{
  /* <style>
    #toggle_nav:checked ~ div #hamburger #line
    {
        @apply rotate-45 translate-y-1.5 
    }

    #toggle_nav:checked ~ div #hamburger #line2
    {
        @apply -rotate-45 -translate-y-1
    }
</style> */
}