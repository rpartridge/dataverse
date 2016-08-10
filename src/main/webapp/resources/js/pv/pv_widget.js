(function() {

    // css    
    var css_bootstrap = document.createElement('link');
    css_bootstrap.setAttribute("type","text/css");
    css_bootstrap.setAttribute("rel","stylesheet");
    css_bootstrap.setAttribute("href","https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css_bootstrap);

    var css_font_awesome = document.createElement('link');
    css_font_awesome.setAttribute("type","text/css");
    css_font_awesome.setAttribute("rel","stylesheet");
    css_font_awesome.setAttribute("href","https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css_font_awesome);
    
    var css_style = document.createElement('link');
    css_style.setAttribute("type","text/css");
    css_style.setAttribute("rel","stylesheet");
    css_style.setAttribute("href","/resources/css/vis_tab/visStyleSheet.css");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css_style);

    // insert widget div after this script
    var widget_div = document.createElement('div');
    widget_div.setAttribute("id","viewer");
    widget_div.setAttribute("scoped","scoped");
    widget_div.setAttribute("style","width:750px; height:500px; margin:0 auto;");
    var current_script = document.getElementById("pv-widget");
    current_script.parentNode.insertBefore(widget_div, current_script.nextSibling);
    
    var list = document.createElement('div');
    list.setAttribute("class","col-md-10 visualize");
    list.innerHTML = '<div id="inspector"> \
        <h2>Choose Style:</h2>  <ul>\
          <li id="preset">Preset</li>\
          <li id="cartoon">Cartoon</li>\
          <li id="tube">Tube</li>\
          <li id="lines">Lines</li>\
          <li id="line-trace">Line Trace</li>\
          <li id="sline">Smooth Line Trace</li>\
          <li id="trace">Trace</li>\
        </ul>\
        </div>';
    current_script.parentNode.insertBefore(list, current_script.nextSibling);

    var proteinViewer;
    if (window.proteinViewer === undefined) {
        console.log("zlib called");
        loadZlib();
    } else {
        proteinViewer = window.proteinViewer;
        console.log("main called in protein viewer");
        main();
    }

    function loadPv() {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",
            "resources/js/pv/bio-pv.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    console.log("main called in if");
                    main();
                }
            };
        } else {
            console.log("main called in else");
            script_tag.onload = main;
        }
        current_script.parentNode.insertBefore(script_tag, current_script.nextSibling);
    }

    function loadZlib() {
        var script_zlib = document.createElement('script');
        script_zlib.setAttribute("type","text/javascript");
        script_zlib.setAttribute("src",
            "resources/js/pv/gunzip.min.js");
        if (script_zlib.readyState) {
            script_zlib.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    console.log("PV called in if");
                    loadPv();
                }
            };
        } else {
            console.log("PV called in else");
            script_zlib.onload = loadPv();
        }
        current_script.parentNode.insertBefore(script_zlib, current_script.nextSibling);
    }

    function preset() {
        proteinViewer.clear();
        var ligand = structure.select({rnames : ['RVP', 'SAH']});
        proteinViewer.ballsAndSticks('ligand', ligand);
        proteinViewer.cartoon('protein', structure);
        proteinViewer.autoZoom();
    }

    function load(pdbid) {
        console.log("inside load...");
        pdbid = pdbid.toLowerCase();
        var folder = pdbid.charAt(1).concat(pdbid.charAt(2));
        var url = 'pdb/' + folder + '/pdb' + pdbid + '.ent.gz';
        pv.io.fetchPdb(url, function(structure) {
            window.structure = structure;
            preset();
            proteinViewer.centerOn(structure);
        });
    }
    function lines() {
        proteinViewer.clear();
        proteinViewer.lines('structure', structure);
    }
    function cartoon() {
        proteinViewer.clear();
        proteinViewer.cartoon('structure', structure, { color: color.ssSuccession() });
    }
    function lineTrace() {
        proteinViewer.clear();
        proteinViewer.lineTrace('structure', structure);
    }
    function sline() {
        proteinViewer.clear();
        proteinViewer.sline('structure', structure);
    }
    function tube() {
        proteinViewer.clear();
        proteinViewer.tube('structure', structure);
    }
    function trace() {
        proteinViewer.clear();
        proteinViewer.trace('structure', structure);
    }
    
    
    function main() {
        console.log("main is running");
        var options = {
                width: 750,
                height: 500,
                antialias: true,
                quality : 'medium'
        };
        proteinViewer = pv.Viewer(document.getElementById('viewer'), options);
            
        var pdb = window.frameElement.getAttribute('data-pdb');

        load(pdb);
        document.getElementById('cartoon').onclick = cartoon;
        document.getElementById('line-trace').onclick = lineTrace;
        document.getElementById('preset').onclick = preset;
        document.getElementById('lines').onclick = lines;
        document.getElementById('trace').onclick = trace;
        document.getElementById('sline').onclick = sline;
        document.getElementById('tube').onclick = tube; 
    }

})();