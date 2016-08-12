(function() {
	// css
	var meta1 = document.createElement('meta');
    meta1.setAttribute("name","viewport");
    meta1.setAttribute("content","width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(meta1);
	
	var css_ngl = document.createElement('link');
	css_ngl.setAttribute("type","text/css");
	css_ngl.setAttribute("rel","stylesheet");
	css_ngl.setAttribute("href","http://arose.github.io/ngl/css/font-awesome.min.css");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css_ngl);
    
    var css_main = document.createElement('link');
    css_main.setAttribute("type","text/css");
    css_main.setAttribute("rel","stylesheet");
    css_main.setAttribute("href","http://arose.github.io/ngl/css/main.css");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css_main);
	
    // insert widget div after this script
    var ngl_widget_div = document.createElement('div');
    ngl_widget_div.setAttribute("id","viewer");
    ngl_widget_div.setAttribute("scoped","scoped");
    var current_script = document.getElementById("ngl-widget");
    current_script.parentNode.insertBefore(ngl_widget_div, current_script.nextSibling);
	
    var stage;
    if (window.stage === undefined) {
    	console.log("ngl called");
        loadNGL();
    }
    
    //main();
    
    function loadNGL() {
        var script_ngl = document.createElement('script');
        script_ngl.setAttribute("type","text/javascript");
        script_ngl.setAttribute("src",
            "http://arose.github.io/ngl/js/ngl.js");
        if (script_ngl.readyState) {
        	script_ngl.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                	console.log("load called in if");
                    loadAll();
                }
            };
        } else {
        	console.log("load called in else");
        	script_ngl.onload = loadAll();
        }
        current_script.parentNode.insertBefore(script_ngl, current_script.nextSibling); 
    }
    function loadAll() {
    	var script_signals = document.createElement('script');
        script_signals.setAttribute("type","text/javascript");
        script_signals.setAttribute("src",
            "http://arose.github.io/ngl/js/lib/signals.min.js");
        current_script.parentNode.insertBefore(script_signals, current_script.nextSibling);
        
        var script_tether = document.createElement('script');
        script_tether.setAttribute("type","text/javascript");
        script_tether.setAttribute("src",
            "http://arose.github.io/ngl/js/lib/tether.min.js");
        current_script.parentNode.insertBefore(script_tether, current_script.nextSibling);
        
        var script_cp = document.createElement('script');
        script_cp.setAttribute("type","text/javascript");
        script_cp.setAttribute("src",
            "http://arose.github.io/ngl/js/lib/colorpicker.min.js");
        current_script.parentNode.insertBefore(script_cp, current_script.nextSibling);
        
        var script_ui = document.createElement('script');
        script_ui.setAttribute("type","text/javascript");
        script_ui.setAttribute("src",
        		"http://arose.github.io/ngl/js/ui/ui.js");
        current_script.parentNode.insertBefore(script_ui, current_script.nextSibling);
        
        var script_uie = document.createElement('script');
        script_uie.setAttribute("type","text/javascript");
        script_uie.setAttribute("src",
        		"http://arose.github.io/ngl/js/ui/ui.extra.js");
        current_script.parentNode.insertBefore(script_uie, current_script.nextSibling);
        
        var script_iungl = document.createElement('script');
        script_iungl.setAttribute("type","text/javascript");
        script_iungl.setAttribute("src",
        		"http://arose.github.io/ngl/js/ui/ui.ngl.js");
        current_script.parentNode.insertBefore(script_iungl, current_script.nextSibling);
        
        var script_gui = document.createElement('script');
        script_gui.setAttribute("type","text/javascript");
        script_gui.setAttribute("src",
        		"http://arose.github.io/ngl/js/gui.js");
        current_script.parentNode.insertBefore(script_gui, current_script.nextSibling);
        
        var script_ex = document.createElement('script');
        script_ex.setAttribute("type","text/javascript");
        script_ex.setAttribute("src",
        		"http://arose.github.io/ngl/js/examples.js");
        current_script.parentNode.insertBefore(script_ex, current_script.nextSibling);
        
        var script_plug = document.createElement('script');
        script_plug.setAttribute("type","text/javascript");
        script_plug.setAttribute("src",
        		"http://arose.github.io/ngl/js/plugins.js");
        if (script_plug.readyState) {
        	script_plug.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                	console.log("main called in if");
                    main();
                }
            };
        } else {
        	console.log("main called in else");
        	script_plug.onload = main;
        }
        current_script.parentNode.insertBefore(script_plug, current_script.nextSibling);
        
        
    }    
    
    function main() {
    	//loadNGL();
    		
    	NGL.cssDirectory = "css/";
        NGL.documentationUrl = "api/dev/index.html";

        // Datasources
        NGL.DatasourceRegistry.add(
            "data", new NGL.StaticDatasource( "data/" )
        );

        // Plugins
        NGL.PluginRegistry.add(
            "apbs", "plugins/apbs.plugin"
        );

        //

        document.addEventListener( "DOMContentLoaded", function(){
            stage = new NGL.Stage();
            NGL.StageWidget( stage );

            var example = NGL.getQuery( "example" );
            if( example ) NGL.ExampleRegistry.load( example, stage );

            var load = NGL.getQuery( "load" );
            if( load ) stage.loadFile( load, { defaultRepresentation: true } );

            var plugin = NGL.getQuery( "plugin" );
            if( plugin ) NGL.PluginRegistry.load( plugin, stage );
        } );
    }
	
})();