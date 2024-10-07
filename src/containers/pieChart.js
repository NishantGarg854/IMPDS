import React,{Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class PieChart extends Component {
    componentDidMount() {
       /* Pie Chart */
    let chart = am4core.create("piechart", am4charts.PieChart);
   

    // Add data
    chart.data = [{
      "country": "Lithuania",
      "litres": 501.9
    }, {
      "country": "Czech Republic",
      "litres": 301.9
    }, {
      "country": "Ireland",
      "litres": 201.1
    }, {
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }, {
      "country": "UK",
      "litres": 99
    }, {
      "country": "Belgium",
      "litres": 60
    }, {
      "country": "The Netherlands",
      "litres": 50
    }];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    /* Pie Chart */
    }

    componentWillUnmount() {
        if (this.piechart) {
          this.piechart.dispose();
        }
    }

    render() {
        return (
          <Container>
            <Row>
            <Col>
              <h4>Pie Chart</h4>
              <div id="piechart" style={{ width: "100%", height: "300px", border: "0.5px solid #CCC", marginBottom: "10px", }}></div>
            </Col>
            </Row>
        </Container>
        )
    }

}

export default PieChart;