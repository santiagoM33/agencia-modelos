import React from 'react';
import './Dashboard.css'
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
                <div className='Row statistics-card'>
                    <HeaderCard 
                        textColor='white'
                        bgColor='primary'
                        cardHeader='Perfil'
                        cardText='250 visitas nuevas'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='success'
                        cardHeader='Instagram'
                        cardText='25 seguidores nuevo'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='danger'
                        cardHeader='Foto destacada'
                        cardText='20 min/prom miradas'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='secondary'
                        cardHeader='Mensajes'
                        cardText='5 mensajes nuevos'
                    />
                </div>
                <div className='Row statistics-card'>
                    <HeaderCard 
                        textColor='white'
                        bgColor='primary'
                        cardHeader='Perfil'
                        cardText='250 visitas nuevas'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='success'
                        cardHeader='Instagram'
                        cardText='25 seguidores nuevo'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='danger'
                        cardHeader='Foto destacada'
                        cardText='20 min/prom miradas'
                    />
                    <HeaderCard 
                        textColor='white'
                        bgColor='secondary'
                        cardHeader='Mensajes'
                        cardText='5 mensajes nuevos'
                    />
                </div>
            </article>
         );
    }
}
 
export default Dashboard;