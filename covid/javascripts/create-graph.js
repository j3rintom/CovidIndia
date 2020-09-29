/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	Papa.parse("https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
	var date = [];
	var cases = ["Confirmed Cases"];

	for (var i = 1; i < data.length; i++) {
        if (data[i][1]=="India"){
            date.push(data[i][0]);
            cases.push(data[i][2]);
        }
	}

	console.log(date);
	console.log(cases);

	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	cases
	        ]
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: date,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 15
                	}
            	}
	        }
	    },
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
	    }
	});
}

parseData(createGraph);