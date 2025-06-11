import React, {useState, useEffect} from 'react'
import Menubar from '../../components/Menubar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddProfile from '../../modals/AddProfile'
import EditProfile from '../../modals/EditProfile'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import API from '../../utils/API'
import Swal from 'sweetalert2'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const Children = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [search, setSearch] = useState('');
  const [profileData, setProfileData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = profileData.filter((data) => data.name.toLowerCase().includes(search.toLowerCase()));

  const paginatedData = filteredData.slice(
    (currentPage-1) * itemsPerPage, currentPage * itemsPerPage
  );

  const fetchChildrenProfiles = async () => {
    try {
      let response = await API.get('/children/get-children');
      setProfileData(response.data.data);
    } catch (error) {
      console.log(error.response.data.message || error);
    }
  }

  useEffect(() => {
    try {
      fetchChildrenProfiles();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleEdit = async (id) => {
    setOpenEditModal(true);
    setSelectedId(id);
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete(`/children/delete-child/${id}`);
          setProfileData(prev => prev.filter(data => data.id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handlePageChange = (page, value) => {
    setCurrentPage(value);
  }

  return (
    <div className='page'>
      <Menubar heading="Children Profiles"/>
      <div className='flex flex-col grow bg-[var(--primary-sidebar)] m-4 rounded-md'>
        <div className='flex justify-between p-2'>
          <input type="text" name='search' id='search' placeholder='&#128269; Search here...' className='border border-gray-300 px-4 py-2 rounded-full' value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <button className='bg-blue-500 hover:bg-blue-700 text-white' onClick={()=>setOpenModal(true)}>Add Profile</button>
        </div>

        <div className='grow m-4'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='table-heading'>Profile</th>
                <th className='table-heading'>Name</th>
                <th className='table-heading'>Age</th>
                <th className='table-heading'>Devices</th>
                <th className='table-heading'>Edit</th>
                <th className='table-heading'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((data, index)=>(
                <tr className='hover:bg-[var(--table-data)]' key={index}>
                  <td className='table-data'><AccountCircleIcon /></td>
                  <td className='table-data'>{data.name}</td>
                  <td className='table-data'>{data.age}</td>
                  <td className="table-data"><DevicesRoundedIcon className='text-green-500 hover:text-green-700 cursor-pointer'/></td>
                  <td className='table-data'><EditIcon className='text-blue-500 hover:text-blue-700 cursor-pointer' onClick={() => handleEdit(data.id)}/></td>
                  <td className='table-data'><DeleteIcon className='text-red-500 hover:text-red-700 cursor-pointer' onClick={() => handleDelete(data.id)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Stack spacing={2} className='my-2'>
          <Pagination count={Math.ceil(filteredData.length/itemsPerPage)} color="primary" onChange={handlePageChange} sx={{
            '& .MuiPaginationItem-root': {
              color: 'var(--foreground-color)',
            }
          }} />
        </Stack>
      </div>
      {openModal && <AddProfile setOpenModal={setOpenModal} fetchChildrenProfiles={fetchChildrenProfiles} />}
      {openEditModal && <EditProfile setOpenEditModal={setOpenEditModal} fetchChildrenProfiles={fetchChildrenProfiles} selectedId={selectedId} />}
    </div>
  )
}

export default Children