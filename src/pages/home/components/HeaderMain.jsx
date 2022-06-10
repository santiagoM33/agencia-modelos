
const HeaderMain = props => {
    return (
        <article className="row mt-3">
            <section className="col-12">
                <h3 className="h4">Modelos Argentinas</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent">
                        <li className="breadcrumb-item">
                            <a href="/model-argentina" className='text-muted'>Argentina</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="/model-buenos-aires" className='text-muted'>Buenos Aires</a>
                        </li>
                        <li className="breadcrumb-item text-dark active" aria-current="page">
                            Mar del Plata
                        </li>
                    </ol>
                </nav>
            </section>
        </article>
    );
};

export default HeaderMain;