var row = document.querySelector('.rows');
var cell = document.querySelector('.cell');
var createTable = document.querySelector('.createTable');
var send = document.querySelector('.dragTableSend');
var dataDragTable = {
  "columns": [],
  "columnsDetail": []
};
cell.addEventListener('input', function () {

  var num = parseInt(cell.value);
  var percent = (100 / num).toFixed(2)
  var str = '';
  for (var i = 0; num > i; i++) {
    str += '<td><input type="text" value="'
      + percent + '"/></td>'
  }
  document.querySelector('.dragTable tr').innerHTML = str;
  createTable.style.display = "block"
})

// 建立表格
createTable.addEventListener('click', function () {
  var dragTable = document.querySelectorAll('.dragTable td input');
  console.log(dragTable)
  var widthTotal = 0;
  console.log(row.value)
  var rowValue = parseInt(row.value);
  var cellValue = parseInt(cell.value);
  var widthAry = [];
  for (var i = 0; dragTable.length > i; i++) {
    console.log(dragTable[i].value);
    widthTotal += parseInt(dragTable[i].value);
    widthAry.push(parseInt(dragTable[i].value))

  }
  if (widthTotal > 100) {
    alert('您的寬度已超過 100%，請重新調整');
  } else {
    step1TableData(rowValue, cellValue, widthAry);
    // createTable.style.display = "none"
  }
})
function step1TableData(row, cell, widthAry) {
  dataDragTable.columns = [row, cell];
  for (var i = 0; dataDragTable.columns[0] > i; i++) {
    for (var j = 0; dataDragTable.columns[1] > j; j++) {
      var data = {
        "name": (i + 1) + '-' + (j + 1),
        "width": widthAry[j] + "%",
        "content": []
      };
      dataDragTable.columnsDetail.push(data);
    }
  }
  createTableFun();
}

// 渲染拖拉表格
function createTableFun() {
  var str = '';
  for (var i = 0; dataDragTable.columns[0] > i; i++) {
    str += '<div class="contentTr" style=height:"' + 150 + 'px">'
    for (var j = 0; dataDragTable.columns[1] > j; j++) {
      str += '<div class="contentTd contentTd-' + (i + 1) + '-' + (j + 1) + '"><div style="">.</div></div>'

    }
    str += '</div>'

  }
  console.log(str);
  document.querySelector('.contentTable').innerHTML = str;
  draTabelFun();
}


function draTabelFun() {
  Sortable.create(softableAside, {
    animation: 200,
    group: "shared",
    sort: true
  });
  Sortable.create(softableAside2, {
    animation: 200,
    group: "shared",
    sort: true
  });
  var tdLen = dataDragTable.columns[0] * dataDragTable.columns[1];
  var data = dataDragTable.columnsDetail;
  for (var i = 0; dataDragTable.columnsDetail.length > i; i++) {
    var path = document.querySelector('.contentTd-' + data[i].name);
    console.log(data)
    data[i].content = [];
    // console.log(path);
    Sortable.create(path, {
      animation: 200,
      group: "shared",
      sort: true,
      onEnd: function (/**Event*/evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        console.log(evt, itemEl)
        // evt.to;    // target list
        // evt.from;  // previous list
        // evt.oldIndex;  // element's old index within old parent
        // evt.newIndex;  // element's new index within new parent
      },
    });

    // 設定各 td 寬度
    path.setAttribute('style', 'width:' + data[i].width)

  }



}
