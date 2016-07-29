
(function() {

    if(document.getElementById('data-pdb') != null) {
            var pdbid = window.frameElement.getAttribute('data-pdb');
        } 
        else {
            var pdbid = "5ddk";
        }
        
        // usually just use this
        //var pdbid = window.frameElement.getAttribute('data-pdb');
        
        var folder = pdbid.charAt(1).concat(pdbid.charAt(2));
        var url = 'pdb/' + folder + '/pdb' + pdbid + '.ent.gz';
        
        var element = document.getElementById('gl');
        var viewer = pv.Viewer(element, 
                            { quality : 'high', width: 'auto', height : 'auto',
                              antialias : true, outline : true});
        console.log("script entered");
         
        function load(pdbid) {
            console.log("load funct entered");
            document.getElementById('status').innerHTML ='loading ' + pdbid;
            pv.io.fetchPdb(url, function(structure) {
              window.structure = structure;
              preset();
              viewer.centerOn(structure);
            });
            document.getElementById('status').innerHTML = '';
        }
      
        function loadProtein() {
            console.log("loadProtein");
            load(pdbid);
        }
        function lines() {
            viewer.clear();
            viewer.lines('structure', structure);
        }
        function cartoon() {
            viewer.clear();
            viewer.cartoon('structure', structure, { color: color.ssSuccession() });
        }
        function lineTrace() {
            viewer.clear();
            viewer.lineTrace('structure', structure);
        }
        function sline() {
            console.log("IN SLINE");
            viewer.clear();
            viewer.sline('structure', structure);
        }
        function tube() {
            viewer.clear();
            viewer.tube('structure', structure);
        }
        function trace() {
            viewer.clear();
            viewer.trace('structure', structure);
        }
        function preset() {
            viewer.clear();
            var ligand = structure.select({rnames : ['RVP', 'SAH']});
            viewer.ballsAndSticks('ligand', ligand);
            viewer.cartoon('protein', structure);
            viewer.autoZoom();
        }
      
        document.getElementById('cartoon').onclick = cartoon;
        document.getElementById('line-trace').onclick = lineTrace;
        document.getElementById('preset').onclick = preset;
        document.getElementById('lines').onclick = lines;
        document.getElementById('trace').onclick = trace;
        document.getElementById('sline').onclick = sline;
        document.getElementById('tube').onclick = tube; 
/*            window.onresize = function(event) {
            pv.fitParent();
          } */
        document.addEventListener('DOMContentLoaded', loadProtein);



})();

