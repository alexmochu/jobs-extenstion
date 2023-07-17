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
      <h1>Jobs Chrome Extension</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="jobUrl"
            value={jobData.jobUrl}
            onChange={handleChange}
            placeholder="Enter job posting url"
          />
          <button type="button" onClick={handleFetchUrl}>Fetch Url</button>
        </div>
        <div>
          <input
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleChange}
            placeholder="Enter job title"
          />
        </div>
        <div>
          <input
            name="jobCompany"
            value={jobData.jobCompany}
            onChange={handleChange}
            placeholder="Enter job company"
          />
        </div>
        <div>
          <textarea
            name="jobSummary"
            value={jobData.jobSummary}
            onChange={handleChange}
            placeholder="Enter job summary"
          />
        </div>
        <button onClick={handleJobSummary}>Get Summary</button>
        <button type="submit">Track Job</button>
      </form>
    </>
  )
}

export default JobsTracker