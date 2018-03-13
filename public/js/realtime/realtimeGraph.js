/*******************************************************************************
* Copyright (c) 2014 IBM Corporation and other Contributors.
*
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v1.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v10.html
*
* Contributors:
* IBM - Initial Contribution
*******************************************************************************/

var RealtimeGraph = function(){

	var palette = new Rickshaw.Color.Palette( { scheme: [
        "#7f1c7d",
 		"#00b2ef",
		"#00649d",
		"#00a6a0",
		"#ee3e96"
    ] } );

	// function to invoke Rickshaw and plot the graph
	this.drawGraph = function(seriesData)
	{
		// instantiate our graph!
		this.palette = palette;

		this.graph = new Rickshaw.Graph( {
			element: document.getElementById("chart"),
			width: 900,
			height: 500,
			renderer: 'line',
			stroke: true,
			preserve: true,
			series: seriesData
		} );

		this.graph.render();

		this.hoverDetail = new Rickshaw.Graph.HoverDetail( {
			graph: this.graph,
			xFormatter: function(x) {
				return new Date(x * 1000).toString();
			}
		} );

		this.annotator = new Rickshaw.Graph.Annotate( {
			graph: this.graph,
			element: document.getElementById('timeline')
		} );

		this.legend = new Rickshaw.Graph.Legend( {
			graph: this.graph,
			element: document.getElementById('legend')

		} );

		this.shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
			graph: this.graph,
			legend: this.legend
		} );

		this.order = new Rickshaw.Graph.Behavior.Series.Order( {
			graph: this.graph,
			legend: this.legend
		} );

		this.highlighter = new Rickshaw.Graph.Behavior.Series.Highlight( {
			graph: this.graph,
			legend: this.legend
		} );

		this.smoother = new Rickshaw.Graph.Smoother( {
			graph: this.graph,
			element: document.querySelector('#smoother')
		} );

		this.ticksTreatment = 'glow';

		this.xAxis = new Rickshaw.Graph.Axis.Time( {
			graph: this.graph,
			ticksTreatment: this.ticksTreatment,
			timeFixture: new Rickshaw.Fixtures.Time.Local()
		} );

		this.xAxis.render();

		this.yAxis = new Rickshaw.Graph.Axis.Y( {
			graph: this.graph,
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
			ticksTreatment: this.ticksTreatment
		} );

		this.yAxis.render();


		this.controls = new RenderControls( {
			element: document.querySelector('form'),
			graph: this.graph
		} );

	}

	this.graphData = function(data)
	{

		var key = 0;
		var seriesData = [];
		var timestamp = Date.now()/1000;
		var maxPoints = 25;
    var j=0;

		//for (var j =0; j<data.length; j++)
		//{
			console.log('realGraph2 :: ' + data.concentration + '  ts::' + data.ts);
			if (typeof data.concentration === 'number') {

				this.graph.series[key].data.push({x:data.ts,y:data.concentration});
				console.log('realGraph2 :: data is a number '+ this.graph.series[key].data.length);
				if (this.graph.series[key].data.length > maxPoints)
				{
					this.graph.series[key].data.splice(0,1);//only display up to maxPoints
				}
				key++;
			} else if (typeof data.concentration === 'string') {
				console.log('realGraph2 :: data is a string');
				if(!isNaN(data.concentration)) {
					var value = parseFloat(data.concentration);
					this.graph.series[key].data.push({x:data.ts,y:value});
					if (this.graph.series[key].data.length > maxPoints)
					{
						this.graph.series[key].data.splice(0,1);//only display up to maxPoints
					}
					key++;
				}
			}
		//}
		this.graph.render();
	}

	this.displayChart = function(device,data){

		var key = 0;
		var seriesData = [];
		var timestamp = Date.now()/1000;
		console.log('realGraph: '+ JSON.stringify(data));

		//for (var j in data.concentration)
		//{
       console.log('realGraph1 :: ' + data.concentration + 'ts::' + data.ts);

			if (typeof data.concentration === 'number') {
				seriesData[key]={};
				seriesData[key].name='concentration';
				seriesData[key].color = palette.color();
				seriesData[key].data=[];

				seriesData[key].data[0]={};
				seriesData[key].data[0].x = data.ts;
				seriesData[key].data[0].y = data.concentration;
				key++;
			} else if (typeof data.concentration === 'string') {
				if(!isNaN(data.concentration)) {
					var value = parseFloat(data.concentration);
					seriesData[key]={};
					seriesData[key].name='concentration';
					seriesData[key].color = palette.color();
					seriesData[key].data=[];

					seriesData[key].data[0]={};
					seriesData[key].data[0].x = data.ts;
					seriesData[key].data[0].y = value;
					key++;
				}
			}
		//}
		this.drawGraph(seriesData);
	}
};
