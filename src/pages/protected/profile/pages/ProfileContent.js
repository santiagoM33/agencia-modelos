import React from 'react';
//import './ProfileContent.css';
import { ProfileContext } from '../../../../context/ProfileContext';

class ProfileContent extends React.Component {
    static contextType = ProfileContext;
    state = {}
    render() {
        const { services } = this.context;
        const { user } = this.props;
        console.log('Usuarios: ', user)

        const picture = 'https://altatension.net/wp-content/uploads/2020/11/Rosario-14.jpg';
        const defaultImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

        return (
            <article className="d-lg-flex flex-lg-row mt-3">
                <section className="text-center mt-lg-3 d-lg-flex flex-lg-column col-lg-4">
                    <div className="mt-lg-4"><img className="rounded-circle" src={picture} alt="Generic placeholder" width="140" height="140" /></div>
                    <h2>{user.alias}</h2>
                    <p className="measures m-0">Medidas: <a href="#">80</a>-<a href="#">55</a>-<a href="#">85</a></p>
                    <p>{user.bio || "Rubia sexy fanática de la garganta profunda"}</p>
                </section>
                <div className="text-center mt-lg-5 d-lg-flex flex-lg-column col-lg-8">
                    <section>
                        <h3>Datos Personales</h3>
                        <p className="m-0">Genero: <span className="sex">Mujer</span></p>
                        <p className="m-0">Telefono: <span className="phoneNumber">+542236878795</span></p>
                        <p className="m-0">Ciudad: <span className="city">Mar del Plata</span></p>
                        <p className="m-0">Provincia: <span className="prov">Buenos Aires</span></p>
                        <p className="m-0">País: <span className="country">Argentina</span></p>
                    </section>
                    <section className="mt-lg-5">
                        <h3>Datos Laborales</h3>
                        <div>
                            <h4>Servicios:</h4> 
                            <a href="#" className="badge badge-primary m-1">Bucal</a>
                            <a href="#" className="badge badge-primary m-1">Oral Sin</a>
                            <a href="#" className="badge badge-primary m-1">Completa</a>
                            <a href="#" className="badge badge-primary m-1">Disfraces</a>
                        </div>
                        <h4>Descripcion del servicio:</h4>
                        <p>Hola, mis amores lindos, soy Mariana. Linda flaca, traviesa, complaciente. Atrevéte a salir hoy de la monotonía y vení a visitarme, tengamos un momento único y diferente junto a mí 🥰. Cuento con depto propio, muy cómodo y discreto. Mis fotos son reales, puedo demostrarlo. Pido buena onda, discreción e higiene. Muchas gracias 💖</p>
                    </section>
                </div>
            </article>
        );
    }
}

export default ProfileContent;