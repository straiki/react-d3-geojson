import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

import Visualisation from "./components/Visualisation";
import Footer from "./components/Footer";
import "./css/index.css";

class App extends React.Component {
    state = {
        geoData: []
    };

    constructor(props) {
        super(props);
        this.loadData();
    }

    loadData = () => {
        Promise.all([
            d3.json(
                "https://uploads.codesandbox.io/uploads/user/16a08661-8ca6-45eb-bc87-c12661ed899d/83zB-regions.json"
            ),
            d3.json(
                "https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json"
            )
        ]).then(([regions, world]) => {
            this.setState({
                geoData: [
                    {key: "regions", className: "brose-red", geoJson: regions},
                    {key: "world", geoJson: world}
                ]
            });
        });
    };

    render() {
        const {geoData} = this.state;

        return (
            <div className="App">
                <h1>GeoJson with React and D3</h1>
                <Visualisation geoData={geoData} />
                <Footer />
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
