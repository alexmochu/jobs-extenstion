import { useState, useEffect } from 'react'
import Queries from '../api/queries';
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom'
import {userState } from '../main'

// import { browser } from 'webextension-polyfill-ts';

const jobDetails = {
  jobUrl: '',
  jobSummary: '',
  jobTitle: '',
  jobCompany: ''
}

const LocationIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
  <circle cx="12" cy="12" r="10"></circle>
  <g transform="translate(9 6)">
    <circle cx="2" cy="2" r="2"></circle>
    <path d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6" strokeLinecap="round" strokeLinejoin="round"></path>
  </g>
</svg>

const JobTypeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
  <path d="M12 22s-8-5.5-8-12a8 8 0 1 1 16 0c0 6.5-8 12-8 12z"></path>
  <circle cx="12" cy="10" r="3"></circle>
</svg>

function Jobs() {
  const [jobData, setJobData] = useState(jobDetails)
  const [error, setError] = useState('')
  const { user, setUser } = userState()
  const {username, currentUserJobs} = user
  const [data, setData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTrackJob, setIsTrackJob] = useState(false);
  const [applicationState, setApplicationState] = useState('')
  const [bookmarkedOpenStates, setBookmarkedOpenStates] = useState([]);
  const [appliedOpenStates, setAppliedOpenStates] = useState([]);
  const [callsOpenStates, setCallsOpenStates] = useState([]);
  const [interviewOpenStates, setInterviewOpenStates] = useState([]);
  const [offerOpenStates, setOfferOpenStates] = useState([]);
  const [rejectedOpenStates, setRejectedOpenStates] = useState([]);


  const [loading, setLoading] = useState(true)
  const [loadingList, setLoadingList] = useState(false)

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

  async function loader() {
    const response = await Queries.getCurrentUserJobs(username)
    return response
  }

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

  const openModal = (item) => {
    setData(item)
    setIsModalOpen(true);
  };

  const filterJobsByState = (jobs, applicationState) => {
    return jobs.filter((job) => job.application_state === applicationState);
  };

const toggleDropdown = (index, jobState) => {
  if (jobState === 'bookmarked') {
    setAppliedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setCallsOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setInterviewOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setOfferOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setRejectedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  } else if (jobState === 'applied') {
    setBookmarkedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setCallsOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setInterviewOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
     setOfferOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
      setRejectedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  }else if (jobState === 'calls') {
    setBookmarkedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setAppliedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setInterviewOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
     setOfferOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
      setRejectedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  }else if (jobState === 'interview') {
    setBookmarkedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setCallsOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setAppliedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
     setOfferOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
      setRejectedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  }else if (jobState === 'offer') {
    setBookmarkedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setCallsOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setInterviewOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
     setAppliedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
      setRejectedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  } else if (jobState === 'rejected') {
    setBookmarkedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setCallsOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setInterviewOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
     setOfferOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
      setAppliedOpenStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  } 

   if (jobState === 'bookmarked') {
      setBookmarkedOpenStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    } else if (jobState === 'applied') {
      setAppliedOpenStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    } else if (jobState === 'calls') {
      setCallsOpenStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    } else if (jobState === 'interview') {
      setInterviewOpenStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    } else if (jobState === 'offer') {
      setOfferOpenStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    } else if (jobState === 'rejected') {
      setRejectedOpenStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[index] = !updatedStates[index];
        return updatedStates;
      });
    }
  };

    const handleUpdate = async (e, item, state, index) => {
    e.preventDefault()
    // Handle form submission here
    console.log('item', item)
      setLoadingList(true)
      const response = await Queries.updateJob({...item, application_state: state})
      await setUser(prevState => ({
      ...prevState,
      currentUserJobs: prevState.currentUserJobs.map(job => {
        if (job.job_id === response.job.job_id) {
          return { ...job, ...response.job };
        }
        return job;
      })
    }))
      setLoadingList(false)
            // toggleDropdown(index, state)

      // Reset form
    }

  useEffect(() => {
    const storeState = localStorage.getItem('store')
      if (storeState) {
        setUser(JSON.parse(storeState))
    }
    const fetchData = async () => {
      try {
        const response = await loader()
        setUser((prevState) => ({ ...prevState, currentUserJobs: response.jobs  }));
        console.log(response)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    setTimeout(() => {
      fetchData()
    }, 2000);

    // fetchData()
  }, [])


  const application_state = (job_state) => {
    if(job_state === 'bookmarked'){
      return "Bookmarked"
    } else if (job_state === 'applied'){
      return "Applied"
    } else if (job_state === 'calls'){
      return "First Calls"
    } else if(job_state === 'interview'){
      return "Final Interview"
    } else if(job_state === 'offer'){
      return "Offer"
    } else if(job_state === 'rejected'){
      return 'Rejected'
    }
  }
  return (
    <>
    <div className="grid grid-cols-4 gap-4 mb-4">
      <h1 className="col-span-3 text-4xl font-bold tracking-tight text-gray-900 mb-6">Jobs</h1>
      <Link className='text-indigo-500 text-right' 
            key={'jobs-search'}
            to={'/dashboard/jobs-tracker'}
            aria-current={'page'}>
      <button 
            type="button"
            className='col-span-1 bg-gray-900 text-gray-100 pt-2 pb-2 w-fit pl-2 pr-2 rounded-full tracking-wide
                                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                      shadow-lg'            
            >+ Track Job</button>
            </Link>
    </div>
            <div className='w-full'>
          {currentUserJobs.length > 0 ? (
          currentUserJobs.map((item, index) => (
          <div key={item.id} className='rounded-2xl p-5 my-3 border bg-gray-50 h-30'>
            <div className='grid grid-cols-2 gap-4 mb-2'>
              <div>
            <h2 className='text-xl font-bold mb-2'>{item.job_company}</h2>
            <p className='mb-4 text-gray-500 text-lg'>{item.job_title}</p>
            </div>

    <div className='text-right'>
      {/* Icon elements */}
      <span className='border px-6 pl-8 py-2 w-24 text-gray-900 border-gray-900 rounded-3xl' >{application_state(item.application_state)}</span>
      <div className='flex items-center justify-end text-right mt-4'>
        <h1 className='flex flex-row appearance-none bg-transparent' name='country' id='locations' value={item.job_location}>
          <span className='pr-3'>{item.job_location}</span>
          {LocationIcon}
        </h1>
      </div>
      <div className='flex justify-end text-right mt-4'>
        <h1 className='flex flex-row appearance-none bg-transparent' name='type' id='type' value={item.job_type}>
          <span className='pr-3'>{item.job_type}</span>
          {JobTypeIcon} 
        </h1>
      </div>
    </div>

            </div>
            <div className='grid grid-cols-2 gap-4 mb-2'>
              <span className='bg-indigo-500 px-6 pl-8 py-2 w-fit text-white rounded-3xl' onClick={() => openModal(item)}>View</span>
              <div className='text-right'>
                <h6 className='text-lg font-medium flex justify-end text-gray-700 dark:text-white items-center'>
                  <svg 
                     className={`mt-2 ${isOpen ? 'text-indigo-500' : 'text-gray-500'}`}
                     onClick={() => toggleDropdown(index, 'bookmarked')}
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="4" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="20" r="2" />
                  </svg>
                </h6>
                {bookmarkedOpenStates[index] && (
                  <div className="absolute flex justify-start bg-gray-50 rounded-lg shadow-md mt-4 py-2">
                    {loadingList ? (
                <div className='flex justify-center items-center pt-[50px] pb-[50px] w-36'>
       <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600'></div>
                </div>
              ) : (
                    <ul className="pl-2 pr-2">
                      <li className="hover:bg-white hover:text-gray-700 w-28 text-left h-8 border-b-2 mb-2" onClick={(e) => handleUpdate(e, item, 'applied', index)}>Applied</li>
                      <li className="hover:bg-white hover:text-gray-700 w-28 text-left h-8 border-b-2 mb-2" onClick={(e) => handleUpdate(e, item, 'calls', index)}>First Calls</li>
                      <li className="hover:bg-white hover:text-gray-700 w-28 text-left h-8 border-b-2 mb-2" onClick={(e) => handleUpdate(e, item, 'interview', index)}>Final Interview</li>
                      <li className="hover:bg-white hover:text-gray-700 w-28 text-left h-8 border-b-2 mb-2" onClick={(e) => handleUpdate(e, item, 'offer', index)}>Offer</li>
                      <li className="hover:bg-white hover:text-gray-700 w-28 text-left h-8 border-b-2 mb-2" onClick={(e) => handleUpdate(e, item, 'rejected', index)}>Rejected</li>
                    </ul>)}
                  </div>
                )}
              </div>
            </div>
          </div>))) : null}
        </div>
    </>
  )
}

export default Jobs