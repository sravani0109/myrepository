var fs= require('fs');
var countries = {};
var continents = [];
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
  var strArr = data.split("\n"),
      obj1 = { "list" : []},
      obj2 = { "list" : []},
      obj3 = { "list" : []},
      obj4 = { "africanCountries" : []};

  for(var i=0;i<strArr.length;i++){
    strArr[i] = strArr[i].trim();
  }
  for(var i=0;i<strArr.length;i++)
  {
    var wordArr = strArr[i].split(",");
    if(wordArr[3] === "AG.LND.ARBL.ZS")
    {
      if(wordArr[0]=="India")
      {
        for(var k=1960,l=4;l<wordArr.length;k++,l++)
        {
          if(Number(wordArr[l]) != 0)
            obj1.list.push( {"year" : k , "perc" : Number(wordArr[l]) } );
        }
      }
      if((wordArr[1].length == 3) && (countries[' '+wordArr[1]] == ' AF'))
      {
          if(Number(wordArr[54]) != 0)
            obj4.africanCountries.push( {"country" : wordArr[1] , "perc" : Number(wordArr[54]) } );
      }
      else if(countries[wordArr[2]] == ' AF')
      {
          if(Number(wordArr[55]) != 0)
            obj4.africanCountries.push( {"country" : wordArr[2] , "perc" : Number(wordArr[55]) } );
      }
    }

    else if(wordArr[3] === "AG.LND.ARBL.HA.PC")
    {
      if(wordArr[0]=="India")
      {
        for(var k=1960,l=4;l<wordArr.length;k++,l++)
        {
          if(Number(wordArr[l]) != 0)
          obj2.list.push( {"year" : k , "hpp" : Number(wordArr[l]) } );
        }
      }
    }

    else if(wordArr[3] === "AG.LND.ARBL.HA")
    {
      if(wordArr[0]=="India")
      {
        for(var k=1960,l=4;l<wordArr.length;k++,l++)
        {
            if(Number(wordArr[l]) != 0)
          obj3.list.push( {"year" : k , "hectares" : Number(wordArr[l]) } );
        }
      }
    }
  }

  fs.writeFile('../json/plot1.json',JSON.stringify(obj1,null,2));
  fs.writeFile('../json/plot2.json',JSON.stringify(obj2,null,2));
  fs.writeFile('../json/plot3.json',JSON.stringify(obj3,null,2));
  fs.writeFile('../json/plot4.json',JSON.stringify(obj4,null,2));


})
