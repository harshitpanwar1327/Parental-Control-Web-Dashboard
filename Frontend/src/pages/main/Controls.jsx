import React, {useState, useEffect} from 'react'
import Menubar from '../../components/Menubar'
import API from '../../utils/API'

const Controls = () => {
  const [childData, setChildData] = useState([]);
  const [devicesData, setDevicesData] = useState([]);
  const license = sessionStorage.getItem('license');

  const fetchChildData = async () => {
    try {
      let response = await API.get(`/children/get-children`);
      setChildData(response.data.data);
    } catch (error) {
      console.log(error.response.data.message || error);
    }
  }

  useEffect(() => {
    try {
      fetchChildData();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleChildDevices = async (id) => {
    try {
      let response = await API.post('/devices/manage-devices', {
        license,
        childId: id
      });
      setDevicesData(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'Devices not fetched!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  const handleDeviceData = async (id) => {
    try {
      let response = await API.post();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'Devices not fetched!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <div className='page'>
      <Menubar heading="Controls & Restrictions"/>
      <div className='grow overflow-auto grid grid-cols-1 grid-rows-9 md:grid-cols-2 md:grid-rows-5 lg:grid-cols-3 lg:grid-rows-3 gap-2 m-2'>
        <div className='col-span-1 row-span-1 bg-[var(--primary-sidebar)] rounded-md p-2'>
          <h2 className='font-semibold text-lg'>Select Child & Device</h2>
          <select name="child" id="child" className='auth-input' onChange={(e)=>handleChildDevices(e.target.value)}>
            <option value="">Select Child Profile</option>
            {childData.map((data, index) => (
              <option value={data.id} key={index}>{data.name}</option>
            ))}
          </select>
          <select name="device" id="device" className='auth-input' onChange={(e)=>handleDeviceData(e.target.value)}>
            <option value="">Select Device</option>
            {devicesData.map((data, index) => (
              <option value={data.id} key={index}>{data.device_name}</option>
            ))}
          </select>
        </div>
        <div className='col-span-1 row-span-1 bg-[var(--primary-sidebar)] rounded-md p-2'>
          <h2 className='font-semibold text-lg'>Time Limits</h2>
        </div>
        <div className='col-span-1 row-span-1 bg-[var(--primary-sidebar)] rounded-md p-2'>
          <h2 className='font-semibold text-lg'>Inappropriate Content Detection</h2>
        </div>
        <div className='col-span-1 row-span-2 bg-[var(--primary-sidebar)] rounded-md p-2'>
          <h2 className='font-semibold text-lg'>App Blocking</h2>
        </div>
        <div className='col-span-1 row-span-2 bg-[var(--primary-sidebar)] rounded-md p-2'>
          <h2 className='font-semibold text-lg'>Webite Restrictions</h2>
        </div>
        <div className='col-span-1 row-span-1 bg-[var(--primary-sidebar)] rounded-md p-2'>
          <h2 className='font-semibold text-lg'>School Time Mode</h2>
        </div>
        <div className='col-span-1 row-span-1 bg-[var(--primary-sidebar)] rounded-md p-2'>
          <h2 className='font-semibold text-lg'>Emergency Controls</h2>
        </div>
      </div>
      <button className='self-start bg-blue-500 hover:bg-blue-700 text-white ml-2 mb-2'>Apply Controls</button>
    </div>
  )
}

export default Controls