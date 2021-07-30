import React from 'react';
import HeaderCard from './components/HeaderCard';

class Dashboard extends React.Component {
    state = {  }
    render() { 
        const { user } = this.props;
        if(!user) return null;
        //console.log('User: ', user)
        return ( 
            <article className='container'>
                <h3>Dashboard</h3>
                <div className='row statistics-card'>
                    <HeaderCard 
                        textColor='white'
                        bgColor='primary'
                        cardHeader='AM'
                        cardTitle='Visitas'
                        cardText='Hoy tuvo 250 visitas nuevas en su perfil'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='success'
                        cardHeader='AM'
                        cardTitle='Follow'
                        cardText='Hoy tuvo 25 seguidores nuevos en su perfil'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='danger'
                        cardHeader='AM'
                        cardTitle='Follow'
                        cardText='Hoy tuvo 25 seguidores nuevos en su perfil'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='secondary'
                        cardHeader='AM'
                        cardTitle='Follow'
                        cardText='Hoy tuvo 25 seguidores nuevos en su perfil'
                    />
                </div>
            </article>
         );
    }
}
 
export default Dashboard;