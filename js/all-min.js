'use strict';

var chart;
var url = '';
var data;
function init() {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url + 'js/chartData/data-1.json', true);
  xhr.send(null);
  xhr.onload = function () {
    data = JSON.parse(xhr.responseText).index;
    leavePeopleFun(data, 'index');
    fullWaterFun(data, 'index');
    console.log(data);
    ;
        var leave = document.querySelector('.drag-leavePeople');
    document.querySelector('.columnLeft').appendChild(leave);
    leavePeopleFun(data, 'index');
    $('.drag-tree').show();
    var leave = document.querySelector('.drag-leavePeople');
    document.querySelector('.columnRight').insertBefore(leave, document.querySelector('.drag-tree'));
    $('.svgMap').slideDown('3000');
    $('.drag-hurt').slideDown('3000');
  };
  var dashboard = document.querySelectorAll('.dashboard-row');
  for (var i = 0; dashboard.length > i; i++) {
    dashboard[i].addEventListener('click', function () {
      var id = parseFloat(this.getAttribute('data-id'));
      // config.pageId = id;
      console.log(id);
      // showPageData(id);
    });
  }
}
init();

var leavePeopleFun = function leavePeopleFun(data, type) {
  var leavePeople = {
    bindto: '.js-leavePeople',
    data: {
      columns: [],
      x: 'x',
      xFormat: '%m/%d %H',
      colors: {
        '撤離人數': '#FE0032'
      }
    }, axis: {

      x: {
        type: 'timeseries'
      }

    },
    legend: {
      show: false
    }, point: {
      r: 5
    }, grid: {

      x: {
        show: true
      }

    }, tooltip: {
      format: {
        title: function title(d) {
          return d.getDate() + '號 禮拜' + week(d.getDay()) + ' ' + d.getHours() + ':00';
        }
      }
      // , onresized: function () { leavePeopleFun(data, 'index');}
    } };
  var ary = data['撤離人數圖']['人數'];
  ary.unshift('撤離人數');
  leavePeople.data.columns[1] = ary;
  var time = data['撤離人數圖']['時間'];
  time.unshift('x');
  leavePeople.data.columns[0] = time;
  c3.generate(leavePeople);
};
function fullWaterFun(data) {
  var fullWater = {
    bindto: '.js-fullWater',
    data: {
      x: 'x',
      xFormat: '%m/%d %H',
      columns: [],

      colors: {
        '積水災情': '#00A8BF'
      }, type: 'area'
    }, axis: {

      y: {
        show: true
      },
      x: {
        show: false,
        type: 'timeseries',
        tick: {
          Format: '%m/%d %H'
        }
      }

    },
    legend: {
      show: false
    }, point: {
      r: 5
    }, grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    }, tooltip: {
      format: {
        title: function title(d) {
          return d.getDate() + '號 禮拜' + week(d.getDay()) + ' ' + d.getHours() + ':00';
        }
      }
      // , onresized: function () { fullWaterFun(data, 'index'); }
    } };
  var ary = data['積水災情圖']['件數'];
  ary.unshift('積水災情');
  fullWater.data.columns[1] = ary;
  var time = data['積水災情圖']['時間'];
  time.unshift('x');
  fullWater.data.columns[0] = time;
  renderC3(fullWater);
}
function week(day) {
  switch (day) {
    case 1:
      return '一';
      break;
    case 2:
      return '二';
      break;
    case 3:
      return '三';
      break;
    case 4:
      return '四';
      break;

    case 5:
      return '五';
      break;

    case 6:
      return '六';
      break;

    case 7:
      return '日';
      break;
    case 0:
      return '日';
    default:
      break;
  }
}

function renderC3(data) {
  c3.generate(data);
}

$('.header__ncdr').on('click', function () {
  $(this).hide();
});

$('.jsDragTab1').on('click', function (e) {
  $('#softableAside').show();
  $('#softableAside2').hide();
  $('#softableAside3').hide();
});
$('.jsDragTab2').on('click', function (e) {
  $('#softableAside').hide();
  $('#softableAside2').show();
  $('#softableAside3').hide();
});
$('.jsDragTab3').on('click', function (e) {
  $('#softableAside').hide();
  $('#softableAside2').hide();
  $('#softableAside3').show();
});
// function softable(){
//   // Grouping
//   var module = document.getElementById("module");
//   Sortable.create(module, { group: "omega" });
//   var dragArea = document.querySelectorAll('.dragArea');
//   for(let i=0;dragArea.length>i;i++){
//     Sortable.create(dragArea[i], {
//       animation: 200,
//       group: "omega",
//       sort: true,
//     });
//   }
// }
// softable();
// function init(url){
//   return new Promise(function (resolve, reject) {
// let req = new XMLHttpRequest();
// req.open('GET', './js/chartData/data-' + url + '.json');
// req.send();
// req.onload = function () {
//   let data = JSON.parse(req.response);
//   chart = c3.generate({
//     bindto: '#chart',
//     data: {
//       columns: data
//     }
//   });
//   setTimeout(() => {
//     resolve(req.response);
//   }, 3000);
// }
//   })
// }
// function get(url){
//   return new Promise(function (resolve, reject) {
//     let req = new XMLHttpRequest();
//     req.open('GET', './js/chartData/data-' + url+'.json');
//     req.send();
//     req.onload = function () {
//       let data = JSON.parse(req.response);
//       chart.load({
//         columns: data
//       });
//       setTimeout(() => {
//         resolve(req.response);
//       }, 3000);
//      }
//   })
// }
// init(1)
// .then(()=>get(2))


$(document).ready(function () {
  function taipeiMap(Data) {
    var density;
    if (Data == "none") {
      density = {
        "南港區": 0,
        "士林區": 50,
        "大同區": 80,
        "萬華區": 50,
        "中山區": 50,
        "中正區": 20,
        "信義區": 0,
        "內湖區": 20,
        "北投區": 100,
        "文山區": 0,
        "松山區": 20,
        "大安區": 20

      };
    } else {
      density = Data['淹水災情'];
    }

    var width = 285,
        height = 374,
        centered;

    var svg = d3.select(".svgMap-map").append("svg").attr("width", width).attr("height", height);
    svg.append("rect").attr("class", "background").attr("width", width).attr("height", height).on("click", clicked);
    var g = svg.append("g");
    var path = d3.geo.path().projection( // 路徑產生器
    d3.geo.mercator().center([121.2254962, 25.0169626]).scale(75000).translate([width / -0.96, height / 1.3]) // 座標變換函式
    );
    var color = d3.scale.linear().domain([0, 100]).range(["#e0f7f5", "#025448"]);
    d3.json("js/map.json", function (topodata) {
      var features = topojson.feature(topodata, topodata.objects["100--_2_1"]).features;
      // 這裡要注意的是 topodata.objects["county"] 中的 "county" 為原本 shp 的檔名
      for (var idx = features.length - 1; idx >= 0; idx--) {
        features[idx].total = density[features[idx].properties.TOWN];
      }g.append("g").attr("id", "states").selectAll("path").data(features).enter().append("path").attr({
        "d": path, "fill": function fill(d) {
          if (d.total == 0) {
            return '#f6e8c5';
          } else {
            return color(d.total);
          }
        }, "stroke-width": 2, "stroke": "#fff"
      }).on("click", clicked).on("mousemove", text);
      g.append("path").datum(topojson.mesh(topodata, topodata.objects["100--_2_1"], function (a, b) {
        return a !== b;
      })).attr("id", "state-borders");

      g.append("g").attr("class", "states-names").selectAll("text").data(features).enter().append("svg:text").attr("dy", "2.15em").text(function (d) {
        return d.properties.TOWN;
      }).attr("x", function (d) {
        return path.centroid(d)[0];
      }).attr("y", function (d) {
        return path.centroid(d)[1];
      }).attr("text-anchor", "middle").attr('fill', 'orange');
    });
    $('.svgMap-jsMessage h2').text('北投區');
    $('.svgMap-jsMessage em').text('100');
    function text(d) {
      $('.svgMap-jsMessage h2').text(d.properties.TOWN);
      $('.svgMap-jsMessage em').text(d.total);
    }
    function clicked(d) {
      var x, y, k;
      if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
      } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
      }
      // console.log(g.select(this));

      g.selectAll("path").classed("active", centered && function (d) {
        return d === centered;
      });

      g.transition().duration(150).attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");
    }
    if (document.querySelectorAll('.svgMap-map svg').length == 2) {
      var elem = document.querySelectorAll('.svgMap-map svg')[0];
      elem.parentNode.removeChild(elem);
    }
  }
  taipeiMap('none');

  function addData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'json/fullwater.json');
    xhr.send();
    xhr.onload = function () {
      var data = JSON.parse(xhr.responseText);
      var timeAry = [];
      for (var i = 0; data.length > i; i++) {
        timeAry.push(data[i].Time);
      }
      addSlider(timeAry, data);
    };
  }
  addData();

  function addSlider(data, result) {
    var data = data;
    var result = result;
    var dataLen = data.length;
    var mapNum = result.length;
    var slider = $("#slider").slider({
      min: 1,
      max: dataLen,
      value: dataLen,
      create: function create(event, ui) {
        $('.title span').text(data[$(this).slider("value") - 1]);
      },
      slide: function slide(event, ui) {
        sliderFun(event, ui);
      },
      change: function change(event, ui) {
        sliderFun(event, ui);
      }
    });
    function sliderFun(event, ui) {
      var values = ui.value - 1;
      var slectData = result[values].JsonTimeDatas;
      var obj = {
        "時間": result[values].Time + '點',
        "淹水災情": {
          "楠梓區": 0,
          "左營區": 0,
          "鼓山區": 0,
          "三民區": 0,
          "苓雅區": 0,
          "新興區": 0,
          "前金區": 0,
          "鹽埕區": 0,
          "前鎮區": 0,
          "旗津區": 0,
          "小港區": 0,
          "鳳山區": 0,
          "茂林區": 0,
          "甲仙區": 0,
          "六龜區": 0,
          "杉林區": 0,
          "美濃區": 0,
          "內門區": 0,
          "仁武區": 0,
          "田寮區": 0,
          "旗山區": 0,
          "梓官區": 0,
          "阿蓮區": 0,
          "湖內區": 0,
          "岡山區": 0,
          "茄萣區": 0,
          "路竹區": 0,
          "鳥松區": 0,
          "永安區": 0,
          "燕巢區": 0,
          "大樹區": 0,
          "大寮區": 0,
          "林園區": 0,
          "彌陀區": 0,
          "橋頭區": 0,
          "大社區": 0,
          "那瑪夏區": 0,
          "桃源區": 0
        }
      };
      for (var i = 0; slectData.length > i; i++) {
        var title = slectData[i].Subject;
        obj['淹水災情'][title] = slectData[i].Total;
      }
      taipeiMap(obj);
      $('.title span').text(data[ui.value - 1]);
    }
    $('.sliderControl__right').on('click', function () {
      if (mapNum !== 3) {
        slider.slider("value", mapNum + 1);
        mapNum = mapNum + 1;
      }
    });
    $('.sliderControl__left').on('click', function () {

      if (mapNum !== 1) {
        slider.slider("value", mapNum - 1);
        mapNum = mapNum - 1;
      }
    });
  }
});