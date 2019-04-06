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
                    series={{
                        showPoints:true
                    }}
                    axes={[
                        { primary: true, type: "ordinal", position: "bottom" },
                        { type: "linear", position: "left" }
                    ]}
                    tooltip
                />
            </div>
        );
    }
}

export default LineChart;