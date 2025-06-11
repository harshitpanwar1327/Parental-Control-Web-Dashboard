import React, {useState, useEffect} from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import {toast, Bounce} from 'react-toastify'
import API from '../utils/API'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const ManageDevices = ({setOpenModal, selectedId}) => {
  const [search, setSearch] = useState('');
  const [devicesData, setDevicesData] = useState([]);
  const license = sessionStorage.getItem('license');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = devicesData.filter(data=>data.device_name.toLowerCase().includes(search.toLowerCase()) || data.os.toLowerCase().includes(search.toLowerCase()) || data.mac_address.toLowerCase().includes(search.toLowerCase()) || data.ip_address.toLowerCase().includes(search.toLowerCase()));

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  );

  const fetchDevicesData = async () => {
    try {
      let response = await API.post(`/devices/manage-devices`, {
        license,
        childId: selectedId
      });
      setDevicesData(response.data.data);
    } catch (error) {
      console.log(error.response.data.message || error);
    }
  }

  useEffect(() => {
    try {
      fetchDevicesData();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleUpdateId = async (data) => {
    try {
      const response = await API.put('/devices/update-child', {
        childId: data.childId? null: selectedId,
        id: data.id
      });

      fetchDevicesData();

      toast.success(data.childId? 'Device de-allocated successfully': 'Device allocated successfully', {
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
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'Device not added to the profile!', {
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

  const handlePageChange = (page, value) => {
    setCurrentPage(value);
  }

  return (
    <div className='fixed top-0 left-0 bg-[#0000005a] dark:bg-[#ffffff5a] w-screen h-screen flex items-center justify-center' onClick={()=>setOpenModal(false)}>
      <div className='flex flex-col bg-[var(--primary-sidebar)] p-4 mx-8 rounded-md h-3/4' onClick={(e)=>e.stopPropagation()}>
        <div className='flex justify-between'>
          <h2 className='font-semibold'>Manage Devices</h2>
          <CancelIcon className='text-red-500 hover:text-red-600 cursor-pointer' onClick={(e)=>setOpenModal(false)}/>
        </div>

        <div className='flex flex-col grow overflow-auto'>
          <input type="text" name='search' id='search' placeholder='&#128269; Search here...' className='w-1/3 border border-gray-300 my-2 px-4 py-2 rounded-full' value={search} onChange={(e)=>setSearch(e.target.value)} />
          <table>
            <thead>
              <tr>
                <th className='table-heading'>Device ID</th>
                <th className='table-heading'>Device Name</th>
                <th className='table-heading'>Operating System</th>
                <th className='table-heading'>MAC Address</th>
                <th className='table-heading'>IP Address</th>
                <th className='table-heading'>Allocated</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((data, index) => (
                <tr className='hover:bg-[var(--table-data)]' key={index}>
                  <td className="table-data">{data.id}</td>
                  <td className='table-data'>{data.device_name}</td>
                  <td className='table-data'>{data.os}</td>
                  <td className='table-data'>{data.mac_address}</td>
                  <td className='table-data'>{data.ip_address}</td>
                  <td className='table-data'><input type="checkbox" name="allocate" id="allocate" checked={data.childId? true: false} onChange={()=>handleUpdateId(data)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Stack spacing={2}>
          <Pagination count={Math.ceil(filteredData.length/itemsPerPage)} onChange={handlePageChange} color="primary" sx={{
            '& .MuiPaginationItem-root': {
              color: 'var(--foreground-color)',
            }
          }} />
        </Stack>
      </div>
    </div>
  )
}

export default ManageDevices