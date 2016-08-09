/**
 * 
 * Insert widget script to display visualization tab
 */
(function() {
	// insert widget div after this script
    var widget_div = document.createElement('div');
    widget_div.setAttribute("id","viewport");
    widget_div.setAttribute("scoped","scoped");
    widget_div.setAttribute("style","width:1100px; height:500px;");
    var current_script = document.getElementById("ngl-widget");
    current_script.parentNode.insertBefore(widget_div, current_script.nextSibling);
    
    var stage;
    if (window.stage === undefined) {
        loadNGL();
    }
    
    // load necessary JavaScript from NGL github
	function loadNGL() {
        var script_ngl = document.createElement('script');
        script_ngl.setAttribute("type","text/javascript");
        script_ngl.setAttribute("src",
            "/resources/js/pv/ngl.js");
        if (script_ngl.readyState) {
            script_ngl.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    main();
                }
            };
        } else {
            script_ngl.onload = main;
        }
        current_script.parentNode.insertBefore(script_ngl, current_script.nextSibling); 
    }
	
	function main() {
		
		if(document.getElementById('data-pdb') != null) {
			var pdb = window.frameElement.getAttribute('data-pdb');
		} 
 		else {
 			var pdb = "5ddk";
 		}
		pdb = pdb.toLowerCase();
        var folder = pdb.charAt(1).concat(pdb.charAt(2));
        var url = 'pdb/' + folder + '/pdb' + pdb + '.ent.gz';		
        
        // load NGL viewer with specified URL
		stage = new NGL.Stage( "viewport", { backgroundColor: "white" } );
        stage.loadFile( url, { defaultRepresentation: true } );
		
	}
})();