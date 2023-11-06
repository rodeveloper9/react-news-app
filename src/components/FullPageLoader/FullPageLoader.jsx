import { Fragment } from "react";
import "./styles/_fullPageLoader.scss"

const FullPageLoader = () => {
    return (
        <Fragment>
            <div className="loading">Loading&#8230;</div>
            <div className="content"><h3>Fetching.......</h3></div>
        </Fragment>
    )
}

export default FullPageLoader