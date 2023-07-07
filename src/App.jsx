import { useState } from 'react'
import { browser } from 'webextension-polyfill-ts';

const jobDetails = {
  jobUrl: '',
  jobSummary: '',
  jobTitle: '',
  jobCompany: ''
}

function App() {
  const [jobData, setJobData] = useState(jobDetails)

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
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];
    const url = currentTab.url;
    setJobData((prevState) => ({ ...prevState, jobUrl: url }));
  };

  return (
    <div className="min-w-[400px] min-h-[600px]">
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
          <textarea
            name="jobSummary"
            value={jobData.jobSummary}
            onChange={handleChange}
            placeholder="Enter job summary"
          />
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
        <button type="submit">Track Job</button>
      </form>
    </div>
  )
}

export default App
