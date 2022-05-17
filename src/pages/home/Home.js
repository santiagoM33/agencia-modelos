import React from 'react';
import HeaderMain from './components/HeaderMain';
import Footer from '../../components/Footer';

//import { getEscorts } from '../../services/connect'

class Home extends React.Component {
    state = {
        users: [],
        isFetch: true
    }
    
    render() {   
        const { data } = this.props.models;
        if(!data) return null;
        return ( 
            <React.Fragment>
                <main className='container-fluid'>
                    <HeaderMain />
                    <article className='row'>
                        {
                            data.map((model,i)=> {                         
                                return <section className='col-12 col-sm-6 col-md-4 my-1' key={model.User.id}>
                                    <div key={model.User.id} className='card mb-3'  onClick={()=> this.props.history.push(model.User.alias.toLowerCase())}>
                                        <div className="row no-gutters">
                                            <div className="col-4 col-sm-12">
                                                <img className='img-fluid img-thumbnail' src='https://i.picsum.photos/id/1019/200/300.jpg?hmac=HLUPqgTMOzQ6-GDkgZZ3NXQqJyl5m6iX_MXvS3Xqt3Q' alt={model.User.alias} />
                                            </div>
                                            <div className='col-8 col-sm-12'>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{model.User.alias}</h5>
                                                    <p className="mb-2 text-muted">{model.location}</p>
                                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada porttitor mauris vitae blandit. Curabitur non felis eu nisi maximus dignissim. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </section>                               
                            })
                        }                       
                    </article>
                </main>
                <Footer />
            </React.Fragment>
         );
    }
}
 
export default Home;