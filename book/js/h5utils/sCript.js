(function(PovezaveKrogci){
 
    PovezaveKrogci.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = PovezaveKrogci.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = PovezaveKrogci(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            PovezaveKrogci(this).replaceWith(PovezaveKrogci(shuffled[i]));
        });
 
        return PovezaveKrogci(shuffled);
 
    };
 
})(PovezaveKrogci);


;(function() {	
	jsPlumb.ready(function() {
		//svoja instanca - svoj sandbox
		var AppletKrogci = jsPlumb.getInstance();
		PovezaveKrogci('.odgovorAppletKrogci').shuffle();
		
		
		//odgovori
		var i=0;
		PovezaveKrogci(".krogecAppletKrogci").each(function(i,e) {
            var p = PovezaveKrogci(e).parent();
			if(i%2==0)
			{
				AppletKrogci.addEndpoint(PovezaveKrogci(e), {
					parent:p,
					endpoint:["Dot", { radius:4 }],
					anchor:"RightMiddle",
					tolerance:"touch",
					detachable:false,
					isSource:true,
					isTarget:true,
					connector:["Straight"],
					connectorStyle : { strokeStyle:"#F00F0F", lineWidth:3},
					maxConnections:1,
					beforeDrop:function(params) {
							if("_"+params.sourceId == params.targetId || params.sourceId == "_"+params.targetId)
							{
								params.connection.getPaintStyle().strokeStyle = '#00FF00';
								params.connection.repaint();
								params.connection.setDetachable(false);
								return true;
							}
							else
							{
								params.connection.setDetachable(true);
								return true;
							}
					}
				});
			}
			else
			{
				AppletKrogci.addEndpoint(PovezaveKrogci(e), {
					parent:p,
					endpoint:["Dot", { radius:4 }],
					anchor:"LeftMiddle",
					tolerance:"touch",
					detachable:false,
					isSource:true,
					isTarget:true,
					connector:["Straight"],
					connectorStyle : { strokeStyle:"#F00F0F", lineWidth:3},
					maxConnections:1,
					beforeDrop:function(params) {
							if("_"+params.sourceId == params.targetId || params.sourceId == "_"+params.targetId)
							{
								params.connection.getPaintStyle().strokeStyle = '#00FF00';
								params.connection.repaint();
								params.connection.setDetachable(false);
								return true;
							}
							else
							{
								params.connection.setDetachable(true);
								return true;
							}
					}
				});
			}
            });		
	});	
})();