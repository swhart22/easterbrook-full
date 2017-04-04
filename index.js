//set some variables 
var title = 'Easterbrook Case Explorer';
var introTitle = 'A review by Injustice Watch identified 17 cases since 2010 in which opinions by Easterbrook involved factual error:';

//create containers within target container
//document.getElementById('target').innerHTML += '<div id="title">'+title+'</div>';
document.getElementById('target').innerHTML += '<div id="intro"></div>';
document.getElementById('target').innerHTML += '<div id="explainer"></div>';
document.getElementById('target').innerHTML += '<div id="innerwrapper"></div>';
document.getElementById('innerwrapper').innerHTML += '<div id="icons"></div>'
document.getElementById('innerwrapper').innerHTML += '<div id="modals"></div>';

//load csv
d3.csv('dummy.csv', function(data){
	/***********
	DATA MUNGING 
	***********/
	//count frequency of each of the actions involved
	var countActions = 
	
  		_.map(_.countBy(data, 'action'), function(count, action) {
    			return {
    				action:action,
    				
    				count:count
    				
    			}		
  	});
  	
  	console.log(countActions);
	//create array of unique categories from dataset
	var uniqueActions = _.map(_.uniqBy(data, 'action'), function(item, i){
		
		return {

			action: item.action,
			id: i
			
		};
	
	});
	uniqueActions.forEach(function(uniqueActions){
	
		countActions.forEach(function(countActions){
		
			var counts = countActions['count'];
			
			if (countActions['action'] == uniqueActions['action']){uniqueActions['count'] = counts;}
		
		});
	
	});
	
	console.log(uniqueActions);
	//create new column in og dataset to map IDs by action 
	data.forEach(function(data,i){
		if (data['type'] != 'explainer'){
			
			data['id'] = i;
				
		}
		//uniqueActions.forEach(function(uniqueActions){
			
			//var uniqueId = uniqueActions['id'];
			
			//if (uniqueActions['action'] == data['action']) {data['id'] = uniqueId;}
			
		//});
		
	});
	
	console.log(data);
	/******************
	BUILD PAGE ELEMENTS 
	******************/
	//color scale
	var y = ['#233142','#455D7A','#F95959','#999999','#339999','#99CC99'];
	var z = d3.scaleOrdinal(y);
	//create intro
	d3.select('#intro').append('div')
		.attr('class','intro-title')
		.html(introTitle);
	//create lines that say how many cases fall under each category
	var introViz = uniqueActions.forEach(function(d){
	
		d3.select('#intro').append('div')
			.attr('class','intro-viz')
			.html(function(){
			//gotta account for plurals
			if (d['count'] != 1) {
				return '<strong>' + d['count'] + '</strong> cases involved <span style="background-color:'+z(d['action'])+';" class="intro-viz-highlight class-0'+d['id']+'">' + d['action'].toLowerCase() + '</span>.';
				}
			else {
				return '<strong>' + d['count'] + '</strong> case involved <span style="background-color:'+z(d['action'])+';" class="intro-viz-highlight class-0'+d['id']+'">' + d['action'].toLowerCase() + '</span>.';
			}
			
			});
			
	});
	
	//create case icons
	var icons = data.forEach(function(d){
		if (d['type'] == 'case'){
		
			d3.select('#icons').append('div')
				.classed('icon',true)
				.attr('id',function(){
					
					return 'icon-0' + d['id'];
					
				})
				.html('<div class="case-names"><div class="file-background" style="background-color:'+z(d['action'])+'"><img src="file-grey.png" class="file-icon"></div><div>' + d['case'] + '</div></span>');	
		}
	});
	
	//create modals
	var modals = data.forEach(function(d){
		if (d['type'] == 'case'){
		
			d3.select('#modals').append('div')
				.attr('class','iw-modal')
				.style('display','none')
				.attr('id',function(){
			
					return 'modal-0' + d['id'];
			
				})
				.html('<div class="iw-modal-content"><div class="close">Close &#10006;</div><div class="modal-case-name">'+d['case']+'</div><div class="action"><span  class="action-highlight" style="background-color:'+z(d['action'])+';">'+d['action']+'</span></div><div>'+d['description']+'</div></div>');
				
			d3.selectAll('.action-highlight')
				.style('color','#fafafa')
				.style('font-weight',300)
				.style('text-transform','uppercase')
				.style('padding',4)
				.style('border-radius',4);
			
			d3.selectAll('.action')
				.style("margin-top",10);
				
			}
	});

	/************
	INTERACTIVITY 
	************/
	//click handlers for each category
	var clickCategory = uniqueActions.forEach(function(d){
	
		d3.select(".class-0"+d['id'])
			.on('click',function(){
				
				
				
			});
			
	});
	//click handlers for each case
	var clicks = data.forEach(function(d){
			d3.select('#icon-0' + d['id'])
				.on('click',function(){
					d3.select('#modal-0' + d['id'])
						.style('display','block');
				});
				
			d3.selectAll('.close')
				.on('click',function(){
					d3.selectAll('.iw-modal')
						.style('display','none');
				});
			
		});
	
});

var pymChild = new pym.Child();

d3.selectAll('a')
	.attr('target','_blank');