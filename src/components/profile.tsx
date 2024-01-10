import { useState, useEffect } from 'react';
import {update, getAuthToken} from '../api/api';

function ProfileComponent() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState<any>(null);
    useEffect(()=> {
        setUser(getAuthToken());
    }, []);
    return (
        <div style={{ visibility: user ? "visible" : "hidden" }}>
            <form>
                <input onChange={()=> setEmail} placeholder='email' name='email'></input>
                <input onChange={()=> setPhone} placeholder='phone' name='phone'></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );

}

export default ProfileComponent;
