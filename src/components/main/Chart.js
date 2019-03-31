import { Chart } from "react-charts";
import React, {Component} from 'react';

class LineChart extends Component {

    render() {

        return (
            <div
                style={{
                    width: "730px",
                    height: "300px"
                }}
            >
                <Chart
                    data={this.props.data}
                    axes={[
                        { primary: true, type: "linear", position: "bottom" },
                        { type: "linear", position: "left" }
                    ]}
                />
            </div>
        );
    }
}

export default LineChart;