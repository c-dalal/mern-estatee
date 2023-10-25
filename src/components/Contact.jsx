import React,{useState} from 'react'

function Contact({listing}) {
    const[landlord,setLandlord] = useState(null);
    const[message,setMessage] = useState("");
    useEffect(() => {
        const fetchLandlord = async () => {
            try{
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            }catch(error){
                console.log(error);
            }
        }
        fetchLandlord();
    },[listing.userRef]);

    const onChange = (e) => {
        setMessage(e.target.value);
    }
  return (
    <>
    {landlord && (
        <div className='flex flex-col gap-2'>
                <p>Contact <span className='font-semibold'>{landlord.username} for <span className='font-semibold'>{listing.name.toLowerCase()}</span></span></p>
                <textarea name="message" id="" cols="30"  rows="2" 
                onChange={onChange}
                placeholder='Enter your message here....'
                className='w-full border p-3 rounded-lg mt-2'
                value={message}></textarea>

                <Link 
                to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                >
                Send Message
                </Link>
        </div>
    )}
    </>
  )
}

export default Contact
