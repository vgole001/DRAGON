import Loader from 'react-loader-spinner'

const LoadingIcon = () => {
    return (
        <div className="container" style={{paddingTop:'200px'}}>
            <div className="row justify-content-center">
                <div>
                    <Loader
                        type="Oval"
                        color="#778899"
                        height={100}
                        width={100}
                    />
                </div>
            </div>
            <h3 style={{textAlign:'center'}}>Fetching new events...</h3>
        </div>
    );
}

export default LoadingIcon

