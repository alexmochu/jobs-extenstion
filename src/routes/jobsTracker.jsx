import { useState } from 'react'
import Queries from '../api/queries';
// import { browser } from 'webextension-polyfill-ts';

const jobDetails = {
  jobUrl: '',
  jobSummary: '',
  jobTitle: '',
  jobCompany: ''
}

function JobsTracker() {
  const [jobData, setJobData] = useState(jobDetails)
  const [error, setError] = useState('')

  //   const handleQueryJobDetails = async (event) => {
  //   event.preventDefault()
  //   const { username, password } = inputValue
  //   if (username.trim() === '') {
  //     setError({ ...error, username: 'Username can\'t be blank' })
  //   } else if (password.trim() === '') {
  //     setError({ ...error, password: 'Password can\'t be blank' })
  //   } else {
  //     // Handle form submission here
  //     setLoading(true)
  //     const user = JSON.parse(localStorage.getItem('store'))
  //     await Queries.login(inputValue)
  //     const token = localStorage.getItem('headerAccessToken')
  //     const decoded = jwt_decode(token)
  //     setLoading(false)
  //     await setUser({
  //       ...user,
  //       username: decoded.username,
  //       isAuthenticated: true,
  //       showToast: true,
  //       toastMessage: 'You have logged in successfully.',
  //     })
  //     // Reset form
  //     setInputValue({ username: '', password: '' })
  //     setError({ username: '', password: '' })
  //     return navigate('/dashboard')
  //   }
  // }

  const handleJobSummary = async (e) => {
    e.preventDefault();
    const res = await Queries.getJobSummary()
    console.log('summary', res)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted value:', jobData);
    setJobData(jobDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFetchUrl = async (e) => {
    e.preventDefault();
    // const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    // const currentTab = tabs[0];
    // const url = currentTab.url;
    // setJobData((prevState) => ({ ...prevState, jobUrl: url }));
  };

  return (
    <>
    <div className="flex justify-center items-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">Track Job</h1>
    </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="jobUrl"
            value={jobData.jobUrl}
            onChange={handleChange}
            placeholder="Enter job posting url"
            className={`col-span-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500  ${
                              error ? 'border-red-500' : ''
                            }`}
          />
          <button 
            type="button"
            onClick={handleFetchUrl}
            className='col-span-1 bg-indigo-500 text-gray-100 pt-2 pb-2 w-full rounded-full tracking-wide
                                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                      shadow-lg'            
            >Fetch Url</button>
        </div>
        <div>
          <input
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleChange}
            placeholder="Enter job title"
            className={`mt-1 mb-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}
          />
        </div>
        <div>
          <input
            name="jobCompany"
            value={jobData.jobCompany}
            onChange={handleChange}
            placeholder="Enter job company"
            className={`mt-1 mb-4 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}
          />
        </div>
        <div>
          <textarea
            name="jobSummary"
            value={jobData.jobSummary}
            onChange={handleChange}
            placeholder="Enter job summary"
            className={`mt-1 mb-4 h-48 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
        <button 
          onClick={handleJobSummary}
          className='col-span-2 bg-gray-900 text-gray-100 pt-2 pb-2 w-full rounded-full tracking-wide
                                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                      shadow-lg'
          >Get Summary</button>
        <button 
          type="submit"
          className='col-span-2 bg-indigo-500 text-gray-100 pt-2 pb-2 w-full rounded-full tracking-wide
                                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                      shadow-lg'          
        >Submit</button>
        </div>
      </form>
    </>
  )
}

export default JobsTracker