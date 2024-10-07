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

    /* XY 3D Chart 1 */
    
    var xy3chart = am4core.create("xy3chart", am4charts.XYChart3D);

    // Add data
    xy3chart.data = [{
      "country": "Lithuania",
      "litres": 501.9,
      "units": 250
    }, {
      "country": "Czech Republic",
      "litres": 301.9,
      "units": 222
    }, {
      "country": "Ireland",
      "litres": 201.1,
      "units": 170
    }, {
      "country": "Germany",
      "litres": 165.8,
      "units": 122
    }, {
      "country": "Australia",
      "litres": 139.9,
      "units": 99
    }, {
      "country": "Austria",
      "litres": 128.3,
      "units": 85
    }, {
      "country": "UK",
      "litres": 99,
      "units": 93
    }, {
      "country": "Belgium",
      "litres": 60,
      "units": 50
    }, {
      "country": "The Netherlands",
      "litres": 50,
      "units": 42
    }];

    // Create axes
    var categoryAxis = xy3chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.title.text = "Countries";

    var xy3dvalueAxis = xy3chart.yAxes.push(new am4charts.ValueAxis());
    xy3dvalueAxis.title.text = "Litres sold (M)";

    // Create series
    var xy3dseries = xy3chart.series.push(new am4charts.ColumnSeries3D());
    xy3dseries.dataFields.valueY = "litres";
    xy3dseries.dataFields.categoryX = "country";
    xy3dseries.name = "Sales";
    xy3dseries.tooltipText = "{name}: [bold]{valueY}[/]";

    var xy3dseries2 = xy3chart.series.push(new am4charts.ColumnSeries3D());
    xy3dseries2.dataFields.valueY = "units";
    xy3dseries2.dataFields.categoryX = "country";
    xy3dseries2.name = "Units";
    xy3dseries2.tooltipText = "{name}: [bold]{valueY}[/]";

    // Add cursor
    xy3chart.cursor = new am4charts.XYCursor();
    /* XY 3D Chart 1 */

    /* 100% Stacked Column Chart */
    var stchart = am4core.create("stackedchart", am4charts.XYChart);
    stchart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
    stchart.data = [
      {
        category: "One",
        value1: 1,
        value2: 5,
        value3: 3
      },
      {
        category: "Two",
        value1: 2,
        value2: 5,
        value3: 3
      },
      {
        category: "Three",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Four",
        value1: 4,
        value2: 5,
        value3: 6
      },
      {
        category: "Five",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Six",
        value1: 2,
        value2: 13,
        value3: 1
      }
    ];
    
    stchart.colors.step = 2;
    stchart.padding(30, 30, 10, 30);
    stchart.legend = new am4charts.Legend();
    
    var stcategoryAxis = stchart.xAxes.push(new am4charts.CategoryAxis());
    stcategoryAxis.dataFields.category = "category";
    stcategoryAxis.renderer.grid.template.location = 0;
    
    var stvalueAxis = stchart.yAxes.push(new am4charts.ValueAxis());
    stvalueAxis.min = 0;
    stvalueAxis.max = 100;
    stvalueAxis.strictMinMax = true;
    stvalueAxis.calculateTotals = true;
    stvalueAxis.renderer.minWidth = 50;
    
    
    var stseries1 = stchart.series.push(new am4charts.ColumnSeries());
    stseries1.columns.template.width = am4core.percent(80);
    stseries1.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
      stseries1.name = "Series 1";
      stseries1.dataFields.categoryX = "category";
      stseries1.dataFields.valueY = "value1";
      stseries1.dataFields.valueYShow = "totalPercent";
      stseries1.dataItems.template.locations.categoryX = 0.5;
      stseries1.stacked = true;
      stseries1.tooltip.pointerOrientation = "vertical";
    
    var bullet1 = stseries1.bullets.push(new am4charts.LabelBullet());
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationY = 0.5;
    
    var stseries2 = stchart.series.push(new am4charts.ColumnSeries());
    stseries2.columns.template.width = am4core.percent(80);
    stseries2.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
      stseries2.name = "Series 2";
      stseries2.dataFields.categoryX = "category";
      stseries2.dataFields.valueY = "value2";
      stseries2.dataFields.valueYShow = "totalPercent";
      stseries2.dataItems.template.locations.categoryX = 0.5;
      stseries2.stacked = true;
      stseries2.tooltip.pointerOrientation = "vertical";
    
    var bullet2 = stseries2.bullets.push(new am4charts.LabelBullet());
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");
    
    var series3 = stchart.series.push(new am4charts.ColumnSeries());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series3.name = "Series 3";
    series3.dataFields.categoryX = "category";
    series3.dataFields.valueY = "value3";
    series3.dataFields.valueYShow = "totalPercent";
    series3.dataItems.template.locations.categoryX = 0.5;
    series3.stacked = true;
    series3.tooltip.pointerOrientation = "vertical";
    
    var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
    bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet3.locationY = 0.5;
    bullet3.label.fill = am4core.color("#ffffff");
    
    stchart.scrollbarX = new am4core.Scrollbar();
    /* 100% Stacked Column Chart */
    
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
              <h2>XY Chart</h2>
              <div id="xychart" style={{ width: "100%", height: "300px", border:"0.5px solid #CCC" }}></div>
            </Col>
            <Col>
              <h2>Pie Chart</h2>
              <div id="piechart" style={{ width: "100%", height: "300px", border:"0.5px solid #CCC" }}></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>XY 3D Chart 1</h2>
              <div id="xy3chart" style={{ width: "100%", height: "300px", border:"0.5px solid #CCC" }}></div>
            </Col>
            <Col>
              <h2>100% Stacked Column Chart</h2>
              <div id="stackedchart" style={{ width: "100%", height: "300px", border:"0.5px solid #CCC" }}></div>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  export default Charts;