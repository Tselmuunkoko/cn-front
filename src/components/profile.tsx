import { useState } from 'react';
import {update} from '../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { useDispatch } from 'react-redux';
import { setEmail, setPhone } from '../store/userSlice';

function ProfileComponent() {
    const email = useSelector((state: RootState) => state.user.email);
    const phone = useSelector((state: RootState) => state.user.phone);
    const [formData, setFormData] = useState({
        email: email || '',
        phone: phone || '',
      });
    const dispatch = useDispatch();
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        try {
          const res = await update(formData);
            await dispatch(setEmail(res.data.email))
            await dispatch(setPhone(res.data.phone));
            console.log('API Response:', res.data);
        } catch (error) {
          console.error('API Error:', error);
        }
      };
    return (
        <div>
            <div>
                <h2 className='text-2xl font-bold'>Hi Hi</h2>
                <p>your email: {email}</p>
                <p>your phone: {phone} </p>
            </div>
            <div className="max-w-md mx-auto bg-white p-8 border rounded shadow-md mt-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                        Phone:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Submit
                    </button>
                </form>
            </div>
        </div>
    );

}

export default ProfileComponent;
