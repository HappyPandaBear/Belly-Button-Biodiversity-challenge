var jsonfile = "samples.json";

d3.json(jsonfile).then(function(d) {

});

function init() {
    var sampleid = d3.select("#selDataset");
    d3.json(jsonfile).then(function(data) {
        var samplnames = data.names;
            console.log(samplnames);
            
        samplnames.forEach((d) => {
            sampleid.append("option").text(d).property("value", d);

            
        });
        var firstname = samplnames[0];
        builddemotable(firstname);
        barGraph(firstname);
        bubbleGraph(firstname);
    });
}

function builddemotable(sample) {
    d3.json(jsonfile).then(function(data) {
        
        var samplemetadata = data.metadata;
        var filterdata = samplemetadata.filter(d => d.id == sample)
        var filterresults = filterdata[0];
        var sample_metadata = d3.select("#sample-metadata");

        sample_metadata.html("");
        Object.entries(filterresults).forEach(function([key, value]) {
            console.log(key,value);
            var row = sample_metadata.append("tr");           
            row.append("td").html(`<strong><font size = '2'>${key}</font></strong>:`);
            row.append("td").html(`<font size ='2'>${value}</font>`);
        });
            
    });
}
 
function barGraph(selected_id){
    d3.json(jsonfile).then(function(d) {
        var bacteriaBB = d.samples
        var filterBar = bacteriaBB.filter(d => d.id == selected_id)
        var otuIDs = filterBar.map(d => d.otu_ids)
        var otuSVals = filterBar.map(d => d.sample_values)
        var otuLabls = filterBar.map(d => d.otu_labels)
        var otuID10 = otuIDs[0].slice(0, 10) 
        var otuSVals10 = otuSVals[0].slice(0, 10)
        var otuLabls10 = otuLabls[0].slice(0, 10)
        var otuIDstr = otuID10.map(d => `OTU ID ${d}`);

        var data = [{
            type: 'bar',
            x: otuSVals10.reverse(),
            y: otuIDstr.reverse(),
            orientation: 'h',
            text: otuLabls10.reverse()
        }];
          
          Plotly.newPlot('bar', data);

    })
}

function bubbleGraph(selected_id){
    d3.json(jsonfile).then(function(d) {
        var bacteriaBB = d.samples;
        var filterBar = bacteriaBB.filter(d => d.id == selected_id)
        var otuIDs = filterBar.map(d => d.otu_ids)
        var otuSVals = filterBar.map(d => d.sample_values)
        var otuLabls = filterBar.map(d => d.otu_labels)
        
        var trace1 = {
            x: otuIDs[0],
            y: otuSVals[0],
            mode: 'markers',
            text: otuLabls[0],
            marker: {
              size: otuSVals[0],
              color: otuIDs[0]
              
            }
        };
          
          var data = [trace1];

          Plotly.newPlot('bubble', data);

    })
}

function optionChanged(newsample) {
    builddemotable(newsample);
    barGraph(newsample);
    bubbleGraph(newsample);

}

init();