import React,{Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Charts extends Component {
    componentDidMount() {
        /* XY Chart */
        let xychart = am4core.create("xychart", am4charts.XYChart);
    
        xychart.paddingRight = 20;
    
        let data = [];
        let visits = 10;
        for (let i = 1; i < 366; i++) {
          visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }
    
        xychart.data = data;
    
        let dateAxis = xychart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
    
        let valueAxis = xychart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
    
        let series = xychart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
    
        series.tooltipText = "{valueY.value}";
        xychart.cursor = new am4charts.XYCursor();
    
        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        xychart.scrollbarX = scrollbarX;
    
        this.xychart = xychart;
    
        /* XY Chart */
    }

    componentWillUnmount() {
        if (this.xychart) {
          this.xychart.dispose();
        }
    }

    render() {
        return (
          <Container>
            <Row>
                <Col>
                <h2>XY Chart 1</h2>
                <div id="xychart" style={{ width: "100%", height: "300px", border:"0.5px solid #eee" }}></div>
                </Col>
            </Row>
        </Container>
        )
    }

}

export default Charts;