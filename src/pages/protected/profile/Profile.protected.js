import React from 'react';
import MainImg from './components/MainImg.components';
import ProfileForm from './components/ProfileForm.components';
import Services from './components/Services.components';

class Profile extends React.Component {
    state = {  } 
    render() { 
        return (
            <article>
                <MainImg />
                <section className='container'>
                    <ProfileForm />
                    <Services />
                </section>
            </article>
        );
    }
}

export default Profile;