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

var HistorianGraph = function(){


	this.palette = new Rickshaw.Color.Palette( { scheme: [
	        "#7f1c7d",
	 		"#00b2ef",
			"#00649d",
			"#00a6a0",
			"#ee3e96"
	    ] } );


	this.drawGraph = function(seriesData)
	{
		// instantiate our graph!

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
		//	ticksTreatment: this.ticksTreatment,
			ticksTreatment: this.ticksTreatment,
//			timeFixture: new Rickshaw.Fixtures.Time.Local()
//      timeFixture: new Rickshaw.Fixtures.Time.Local()
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

	};

	this.displayHistChart = function(device,histData){

		var seriesData = [];

		var counter = 0;

		//var data = histData.events;

		var data = timeStampSort(histData);
		console.log('histGraph: '+ JSON.stringify(data));
    var length = histData.length;
    console.log('histGraph length='+ length);
		var key = 0;

		for(var i = length-1 ; i>=0 ;i-- ){

		//		console.log('histGraph1: i=' + i + ' :: ' + data[i].data.concentration);
			//var someDate = new Date(data[i].data.timestamp).unixTime;
			//var unixtime = Math.floor(new Date(data[i].data.timestamp).getTime()/1000);
			//var unixtime = Math.floor(new Date(data[i].data.timestamp)/1000);
			//console.log("data[i].timestamp = "+ data[i].timestamp);
			//console.log("data[i].data.timestamp = "+ data[i].data.timestamp);
			//var unixtime = Math.floor(new Date(data[i].timestamp).getTime()/1000);

				console.log('histGraph1: i=' + i + ' :: ' + data[i].data.concentration + 'ts::' + data[i].data.ts);
				//console.log('timestamp='+ data[i].timestamp + "  Unix time =" + unixtime);

//			for (var j in data[i].data.concentration) {
				if (typeof data[i].data.concentration === 'number') {
					if(i=== length-1){
						seriesData[key]={};
						seriesData[key].name="concentration";
						seriesData[key].color = this.palette.color();
						seriesData[key].data=[];
					}

					seriesData[key].data[counter]={};
					//seriesData[key].data[counter].x = data[i].data.timestamp.$date/1000;// timestamp;
					//seriesData[key].data[counter].x = Date(data[i].data.timestamp).getTime()/1000;// timestamp;
					seriesData[key].data[counter].x = data[i].data.ts; //unixtime;
					seriesData[key].data[counter].y = data[i].data.concentration;
					//key++;
				} else if (typeof data[i].data.concentration == 'string') {
					if(!isNaN(data[i].data.concentration)) {
						var value = parseFloat(data[i].data.concentration);
						if(i===length-1){
							seriesData[key]={};
							seriesData[key].name="concentration";
							seriesData[key].color = this.palette.color();
							seriesData[key].data=[];
						}

						seriesData[key].data[counter]={};
//						seriesData[key].data[counter].x = data[i].data.timestamp.$date/1000;// timestamp;
						//seriesData[key].data[counter].x = Date(data[i].data.timestamp).getTime()/1000;// timestamp;
						seriesData[key].data[counter].x = data[i].data.ts; //unixtime;
						seriesData[key].data[counter].y = value;

						//key++;
					}
//				}
			}

			counter++;
		}
		this.drawGraph(seriesData);

	};

};


function timeStampSort(array) {
  return  array.sort(function(a,b){
		return (new Date(b.data.ts) - new Date(a.data.ts));
	});
}
