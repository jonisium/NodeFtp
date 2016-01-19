
/*
 * GET home page.
 */

var cli = "ls";

Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};
function run_cmd(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
} // ()

var runShell= function (cli, callback)
{
   var ret =[];
   run_cmd(cli, ["-l"], function(text) {
   var arr = text.split('\n');

   arr.forEach(function(f){
      var f1 = f.replace(/\s+/g,' ') ;
       var fs = f1.split(' ');
/*      if(fs.length < 3)
        { 
        
         }
      else
        {
           if(f1.substring(0,1) == "d")
             {
                  f1=f.replace(fs[8], '<a href="?folder=' + fs[8] + '" >' + fs[8] + '</a>');
              }
             else
             {
                 f1 = f.replace(fs[8],'<a href="' +  fs[8] + '" >' + fs[8] + '</a>');
              }
          } 
          */
        ret.push(f) ;
      });
     callback(null,ret);
   });


}




exports.index = function (req, res) {
     runShell("ls",function(err, data)
     {
       
             res.render('index', { title: 'Express', data:data});
     })

};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};
