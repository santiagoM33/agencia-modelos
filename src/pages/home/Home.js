import React from 'react';
import HeaderMain from './components/HeaderMain';
import Footer from '../../components/Footer';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

//import { getEscorts } from '../../services/connect'

class Home extends React.Component {
    state = {
        users: [],
        isFetch: true
    }
  

    componentDidMount() {
        
    }
    
    lowerCaseFirstLetter = string => {
        return string.charAt(0).toLowerCase() + string.substr(1).toLowerCase();
      }
  
    render() {    
        /*const nombres = this.state.users.map(({user})=> user)
        const nombresToString = nombres.toString();
        const enMinuscula = this.lowerCaseFirstLetter(nombresToString)
        const file = enMinuscula.split(' ').join('-').split(',');*/
        //.filter(e=>e.roleId === 2) || [];
   
        const {data } = this.props.models;
        if(!data) return null;
        return ( 
            <React.Fragment>
                <main className='container-fluid'>
                    <HeaderMain />
                    <article className='row'>
                        {
                            data.map((model,i)=> {                         
                                return <section className='col-12 col-sm-6 col-md-4 my-1' key={model.User.id}>
                                    <Card key={model.User.id}>
                                        <CardImg top width="100%" src={model.profilePicture} alt={model.User.alias} />
                                        <CardBody>
                                            <CardTitle tag="h5">{model.User.alias}</CardTitle>
                                            <CardSubtitle tag="h6" className="mb-2 text-muted">{model.location}</CardSubtitle>
                                            <CardText>{model.User.email}</CardText>
                                            <Button onClick={()=> this.props.history.push(model.User.alias.toLowerCase())}>Ver mas</Button>
                                        </CardBody>
                                    </Card>
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