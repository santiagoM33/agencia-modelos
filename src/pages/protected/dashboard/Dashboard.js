import React from 'react';
import './Dashboard.css'
import StatisticsCard from './pages/StatisticsCard';

class Dashboard extends React.Component {
    state = {}
    render() {
        const { user } = this.props;
        if (!user) return null;
        //console.log('User: ', user)
        return (

            <article className='main-content container'>
                <h3>Dashboard</h3>
                <div className='statistics-card'>
                    <StatisticsCard />
                </div>
            </article>
        );
    }
}

export default Dashboard;