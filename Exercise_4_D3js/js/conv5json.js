var fs= require('fs');
var countries = {};
var continents = [];
var  obj5 = {"continents" : []};
var func = fs.readFile('../../csv/countries.csv','utf8',function(err,data){
    if(err){
        return  console.log(err);
    }
    var countArr = data.split("\n");

    for(var i=0;i<countArr.length;i++){
      countArr[i] = countArr[i].trim();
    }

    for(var i=1;i<countArr.length-1;i++)
    {
      var lineArr = countArr[i].split(",");
      countries[lineArr[4]] = lineArr[6];
      if((continents.indexOf(lineArr[6]) == -1) && (lineArr[6].length <5 ))
      {
        continents.push(lineArr[6]);
      }
    }
});

fs.readFile('../../csv/WDI_Data.csv','utf8',function(err,data){
  if(err){
  return  console.log(err);
  }
  var strArr = data.split("\n");
  for(var i=0;i<strArr.length;i++){
    strArr[i] = strArr[i].trim();
  }

  var eu = {},
      as = {},
      na = {},
      af = {},
      sa = {},
      oc = {};
  var arr1 = [],
      arr2 = [],
      arr3 = [],
      arr4 = [],
      arr5 = [],
      arr6 = [];
  for(k=1961;k<=2013;k++)
  {
    arr1.push({"year" : k , "hectares" : 0});
    arr2.push({"year" : k , "hectares" : 0});
    arr3.push({"year" : k , "hectares" : 0});
    arr4.push({"year" : k , "hectares" : 0});
    arr5.push({"year" : k , "hectares" : 0});
    arr6.push({"year" : k , "hectares" : 0});
  }
  eu["eu"] = arr1;
  as["as"] = arr2;
  na["na"] = arr3;
  af["af"] = arr4;
  sa["sa"] = arr5;
  oc["oc"] = arr6;

  for(var i=0;i<strArr.length;i++)
  {
    wordArr = strArr[i].split(",");
    var  x=1;
    //console.log(wordArr[1].length);
    if(wordArr[1] != undefined  && wordArr[1].length == 3)
    {
      x=1;
    }
    else {
      x=2;
    }
    if(wordArr[x+2] === "AG.LND.ARBL.HA")
    {
         if(countries[' ' + wordArr[x]] === ' EU')
          {
            var li = eu.eu;
            for(var k=1961,l=x+4;k<=2013;k++,l++)
            {
              if(Number(wordArr[l]) != 0)
              li[k-1961].hectares += Number(wordArr[l]);
            }
            eu.eu = li;
          }

          else if(countries[' ' + wordArr[x]] === ' AS')
          {
            var li = as.as;
            for(var k=1961,l=x+4;k<=2013;k++,l++)
            {
              if(Number(wordArr[l]) != 0)
              li[k-1961].hectares += Number(wordArr[l]);
            }
            as.as = li;
          }

          else if(countries[' ' + wordArr[x]] === ' NA')
          {
            var li = na.na;
            for(var k=1961,l=x+4;k<=2013;k++,l++)
            {
              if(Number(wordArr[l]) != 0)
              li[k-1961].hectares += Number(wordArr[l]);
            }
            na.na = li;
          }

          else if(countries[' ' + wordArr[x]] === ' AF')
          {
            var li = af.af;
            for(var k=1961,l=x+4;k<=2013;k++,l++)
            {
              if(Number(wordArr[l]) != 0)
              li[k-1961].hectares += Number(wordArr[l]);
            }
            af.af = li;
          }

          else if(countries[' ' + wordArr[x]] === ' SA')
          {
            var li = sa.sa;
            for(var k=1961,l=x+4;k<=2013;k++,l++)
            {
              if(Number(wordArr[l]) != 0)
              li[k-1961].hectares += Number(wordArr[l]);
            }
            sa.sa = li;
          }

          else if(countries[' ' + wordArr[x]] === ' OC')
          {
            var li = oc.oc;
            for(var k=1961,l=x+4;k<=2013;k++,l++)
            {
              if(Number(wordArr[l]) != 0)
              li[k-1961].hectares += Number(wordArr[l]);
            }
            oc.oc = li;
          }
      }
    }
  obj5.continents.push(eu);
  obj5.continents.push(as);
  obj5.continents.push(na);
  obj5.continents.push(af);
  obj5.continents.push(sa);
  obj5.continents.push(oc);
  fs.writeFile('../json/plot5.json',JSON.stringify(obj5,null,2));
}
);

//var fs= require('fs');
