import { useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
import { userState } from '../main'
// import { classNames } from '../components/common'
// import Queries from '../api/queries'
// import { featureFlag } from '../../config'

const Toast = () => {
  const { user, setUser } = userState()
  const { showToast, toastMessage } = user
  const removeToast = async () => {
    return await setUser({ ...user, showToast: false, toastMessage: '' })
  }

  useEffect(() => {
    setTimeout(() => {
      removeToast()
    }, 3000)
  }, [showToast, showToast])

  return (
    <div className='fixed top-0 left-1/2 mt-4 z-50'>
      {showToast ? (
        <div className='flex flex-col gap-2'>
          <div
            className={
              'toast text-lg pl-7 pr-7 pt-2 pb-2 lg:mt-0 bg-indigo-500 rounded-3xl border text-white'
            }
            // onClick={() => removeToast(toast)}
          >
            {toastMessage}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Toast