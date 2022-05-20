import React from 'react';
//import HeaderMain from './components/HeaderMain';
import Footer from '../../components/Footer';
import SearchMain from './components/SearchMain';

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
                    {/*<HeaderMain />*/}
                    <SearchMain />
                    <article className='row'>
                        {
                            data.map((model,i)=> {                         
                                return <section className='col-12 col-sm-6 col-md-4 my-1' key={model.User.id}>
                                    <div key={model.User.id} className='mb-3'  onClick={()=> this.props.history.push(model.User.alias.toLowerCase())}>
                                        <div className="row no-gutters">
                                            <div className="col-4 col-sm-12">
                                                <img className='img-thumbnail' src='https://media.istockphoto.com/photos/close-up-headshot-portrait-picture-of-happy-businessman-touching-picture-id1257975872?s=612x612' alt={model.User.alias} />
                                            </div>
                                            <div className='col-8 col-sm-12'>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{model.User.alias}</h5>
                                                    <p className="mb-2 text-muted">{model.location}</p>
                                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
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