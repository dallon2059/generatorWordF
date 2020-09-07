let countC1 = 0;

/**
 * A,B,C,D,E checkbox
 * @param {A,B,C,D,E} flg 
 */
var checkboxFunc = function (flg) {
  let $textarea = $('#' + flg + '_textarea')
  let isDisabled = $textarea.attr('disabled')
  // 如果disabled='true'，就解开,反之则加上
  if (isDisabled) {
    $textarea.removeAttr('disabled');
    $textarea.val("");
  } else {
    $textarea.attr('disabled', 'true')
    $textarea.val("无");
  }
}

/**
 * formatBtn
 * @param {A,B,C}} flg 
 */
var formatBtnFunc = function (flg) {
  let $textarea = $('#' + flg + '_textarea')
  let content = $textarea.val();
  if (content.trim() === "") {
    return false;
  }
  if (content === "无") {
    return false;
  }
  // 分行
  let lineArray = content.split('\n');
  content = "";
  for (let i=0; i<lineArray.length; i++) {
    
    content += (i+1) + "、" + getRealLine(lineArray[i]);
    if (i != lineArray.length -1) {
      content += '\n';
    }
  }
  $textarea.val(content);
}

/**
 * 获取去掉前面序号的每行
 * @param {textarea里的每一行字符串} line 
 */
var getRealLine = function (line) {
  if (line.trim() === "") {
    return ""
  }
  if (line.split(/\d{1}、/).length > 1) {
    return line.split(/\d{1}、/)[1];
  } else {
    return line;
  }
}

/**
 * 获取去掉前面序号的正文
 */
var getRealContent = function (content) {
  if (content.trim() === "") {
    return ""
  }
  let realContent = "";
  if (content.split('\n').length > 0) {
    let lineArray = content.split('\n');
    for(let i=0; i<lineArray.length; i++) {
      realContent += getRealLine(lineArray[i]);
      if (i != lineArray.length -1) {
        realContent += '\n';
      }
    }
  }
  return realContent;
}



/**
 * "、收到会员" + name + "的" + course + "的付款邮件，已经设置了有效期限，具体操作如下：");
 * 会员XXX（手动输入）购买了XXX（手动输入）点点数，系统没有自动添加，已经手动添加，并且设置了有效期限，具体操作如下：
 * 会员XXX（手动输入）购买了80点点数，系统没有自动添加，已经手动添加，具体操作如下：
 * 收到会员XXX（手动输入）的XXX（手动选择）的付款邮件，系统已经自动处理，没有操作，具体情况如下：
 * "、会员XXX（手动输入）取消了自动付款（顧客が自動支払いをキャンセルしました）。【※ 内容（情况5）的格式为：除句号外，正文部分加粗＋下划线】
 */
let C1_num = 0;

/**
 * 自动生成记录
 * @param {*} flg 
 */
var createC1 = function (flg) {
    C1_num = C1_num + 1;
    let $C1_container = $("#C1_container");
    let C1_html = $C1_container.html();
    let pre = "C1_" + C1_num + "_";
    let alljson = getData();
  if (flg === "1") {
    C1_html += `<div id="` + pre + `container" type="1">
    <label>` + C1_num + `、收到会员</label><input type="text" size="10" id="` + pre + `nameInput"><label>的</label><input type="text" size="10"
    id="` + pre + `courseInput"><label>的付款邮件，已经设置了有效期限，具体操作如下：</label>
  </div>`;
    
  } else if (flg === "2") {
    C1_html += `<div id="` + pre + `container" type="2">
    <label>` + C1_num + `、会员</label><input type="text" size="10" id="` + pre + `nameInput"><label>购买了</label><input type="text" size="10"
    id="` + pre + `pointInput"><label>点点数，系统没有自动添加，已经手动添加，并且设置了有效期限，具体操作如下：</label>
  </div>`;

  } else if (flg === "3") {
    C1_html += `<div id="` + pre + `container" type="3">
    <label>` + C1_num + `、会员</label><input type="text" size="10" id="` + pre + `nameInput"><label>购买了80点点数，系统没有自动添加，已经手动添加，具体操作如下：</label>
  </div>`;
  } else if (flg === "4") {
    C1_html += `<div id="` + pre + `container" type="4">
    <label>` + C1_num + `、收到会员</label><input type="text" size="10" id="` + pre + `nameInput"><label>的</label><input type="text" size="10"
    id="` + pre + `courseInput"><label>的付款邮件，系统已经自动处理，没有操作，具体情况如下：</label>
  </div>`;

  } else if (flg === "5") {
    C1_html += `<div id="` + pre + `container" type="5">
    <label>` + C1_num + `、会员</label><input type="text" size="10" id="` + pre + `nameInput"><label>取消了自动付款（顧客が自動支払いをキャンセルしました）。</label>
  </div>`;
  } 
  $C1_container.html(C1_html);
  resetValueC1(C1_num-1, alljson);
}
/**
 * C1 回退功能
 */
var removeLastRecordC1 = function () {
  let pre = "C1_" + C1_num + "_";
  $('#' + pre + "container").remove();
  if (C1_num == 0) {
    return false;
  }
  C1_num = C1_num - 1;
}

/**
 * 1、新会员虹猫登录，已经发送了问候邮件，并且申请添加了Skype好友。 
 */
let C2_num = 0;
var createC2 = function () {
  C2_num = C2_num + 1;
  let $C2_container = $("#C2_container");
  let C2_html = $C2_container.html();
  let pre = "C2_" + C2_num + "_";
  let alljson = getData();
  C2_html += `<div id="` + pre + `container">
  <label>` + C2_num + `、新会员</label><input type="text" size="10" id="` + pre + `nameInput"><label>登录，已经发送了问候邮件，并且申请添加了Skype好友。</label>
</div>`;
  $C2_container.html(C2_html);
  resetValueC2(C2_num-1, alljson);
}
/**
 * C2 回退
 */
var removeLastRecordC2 = function () {
  let pre = "C2_" + C2_num + "_";
  $('#' + pre + "container").remove();
  if (C2_num == 0) {
    return false;
  }
  C2_num = C2_num - 1;
}

/**
 * C3 会员联系邮件：
 */
let C3_num = 0;
var createC3 = function (flg) {
  C3_num = C3_num + 1;
  let $C3_container = $("#C3_container");
  let C3_html = $C3_container.html();
  let pre = "C3_" + C3_num + "_";
  let alljson = getData();
  if (flg === "1") {
    C3_html += `<div id="` + pre + `container" type="1">
    <label>`+C3_num+`、收到会员</label><input type="text" size="10" id="`+pre+`nameInput"><label>的邮件</label><input type="text" size="10"
    id="`+pre+`mailInput"><label>，内容如下：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea1"></textarea>
    </div>
    <div></div>
    <label>我的回复：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea2"></textarea>
    </div>
  </div>`;
  } else if (flg === "2") {
    C3_html += `<div id="` + pre + `container" type="2">
    <label>`+C3_num+`、收到会员</label><input type="text" size="10" id="`+pre+`nameInput"><label>的邮件</label><input type="text" size="10"
    id="`+pre+`mailInput"><label>，内容如下：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea1"></textarea>
    </div>
  </div>`;
  }
  $C3_container.html(C3_html);
  resetValueC3(C3_num-1, alljson);
}
/**
 * c3 回退
 */
var removeLastRecordC3 = function() {
  let pre = "C3_" + C3_num + "_";
  $('#' + pre + "container").remove();
  if (C3_num == 0) {
    return false;
  }
  C3_num = C3_num - 1;
}

/**
 * 四）会员お問い合わせ：
 */
let C4_num = 0;
var createC4 = function (flg) {
  C4_num = C4_num + 1;
  let $C4_container = $("#C4_container");
  let C4_html = $C4_container.html();
  let pre = "C4_" + C4_num + "_";
  let alljson = getData();
  if (flg === "1") {
    C4_html += `<div id="`+pre+`container" type="1">
    <label>`+C4_num+`、收到会员</label><input type="text" size="10" id="`+pre+`nameInput"><label>的お問い合わせ，内容如下：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea1"></textarea>
    </div>
    <div></div>
    <label>我的回复：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea2"></textarea>
    </div>
  </div>`;
  } else if (flg === "2") {
    C4_html += `<div id="`+pre+`container" type="2">
    <label>`+C4_num+`、收到会员</label><input type="text" size="10" id="`+pre+`nameInput"><label>的お問い合わせ，没有回复，内容如下：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea1"></textarea>
    </div>
  </div>`;
  }
  $C4_container.html(C4_html);
  resetValueC4(C4_num-1, alljson);
}
/**
 * C4回退
 */
var removeLastRecordC4 = function () {
  let pre = "C4_" + C4_num + "_";
  $('#' + pre + "container").remove();
  if (C4_num == 0) {
    return false;
  }
  C4_num = C4_num - 1;
}

/**
 * C5 其他
 */
let C5_num = 0;
var createC5 = function (flg) {
  C5_num = C5_num + 1;
  let $C5_container = $("#C5_container");
  let C5_html = $C5_container.html();
  let pre = "C5_" + C5_num + "_";
  let alljson = getData();
  if (flg === "1") {
    C5_html += `<div id="`+pre+`container" type="1">
    <label>`+C5_num+`、正文内容：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea1"></textarea>
    </div>
    <div></div>
    <label>邮件内容：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea2"></textarea>
    </div>
  </div>`;
  } else if (flg === "2") {
    C5_html += `<div id="`+pre+`container" type="2">
    <label>`+C5_num+`、正文内容：</label>
    <div></div>
    <div>
      <textarea rows="5" cols="80" style="resize: none;" id="`+pre+`textarea1"></textarea>
    </div>
  </div>`;
  }
  $C5_container.html(C5_html);
  resetValueC5(C5_num-1,alljson);
}
/**
 * C5回退
 */
var removeLastRecordC5 = function () {
  let pre = "C5_" + C5_num + "_";
  $('#' + pre + "container").remove();
  if (C5_num == 0) {
    return false;
  }
  C5_num = C5_num - 1;
}

var showTime = function () {
  let $select = $("#selectTime");
  let time = $select.val();
  $("#time").text(time);
}


/**********************************************************************************************************************
 * 下面进行取值操作
 * 
 * 
 ************************************************************************************************************************
 */

var getDataToJson = function () {
  let data = getData();
  var json = JSON.stringify(data);
  var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "data.json");
}



var getData = function () {
  // 获取每个模块记录的个数
  let C1_count = C1_num;
  let C2_count = C2_num;
  let C3_count = C3_num;
  let C4_count = C4_num;
  let C5_count = C5_num;
  let saveJson = {};
  
  // 获取时间
  let date = $("#dateInput").val();
  let time = $("#selectTime").val();
  saveJson['title'] = date + time + "值班报告";

  // 获取A的正文
  let A_textarea_value = $("#A_textarea").val();
  saveJson['solved'] = getRealContent(A_textarea_value) === "无" ? undefined : getRealContent(A_textarea_value);
  // 获取B的正文
  let B_textarea_value = $("#B_textarea").val();
  saveJson['unsolved'] = getRealContent(B_textarea_value) === "无" ? undefined : getRealContent(B_textarea_value);
  // 获取C1的部分
  let C1_Json = {};
  for(let i=1; i<=C1_count; i++) {
    let $container = $('#C1_'+i+'_container');
    let type = $container.attr('type');
    if (type === "1") {
      let $nameInput = $("#C1_" + i + "_nameInput");
      let $courseInput = $("#C1_" + i + "_courseInput");
      let name = $nameInput.val();
      let course = $courseInput.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['course'] = course;
      subJson['type'] = type;
      C1_Json[i] = subJson;
    } else if (type === "2") { 
      let $nameInput = $("#C1_" + i + "_nameInput");
      let $pointInput = $("#C1_" + i + "_pointInput");
      let name = $nameInput.val();
      let point = $pointInput.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['point'] = point;
      subJson['type'] = type;
      C1_Json[i] = subJson;
    } else if (type === "3") { 
      let $nameInput = $("#C1_" + i + "_nameInput");
      let name = $nameInput.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['type'] = type;
      C1_Json[i] = subJson;
    } else if (type === "4") {
      let $nameInput = $("#C1_" + i + "_nameInput");
      let $courseInput = $("#C1_" + i + "_courseInput");
      let name = $nameInput.val();
      let course = $courseInput.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['course'] = course;
      subJson['type'] = type;
      C1_Json[i] = subJson;
    } else if (type === "5") {
      let $nameInput = $("#C1_" + i + "_nameInput");
      let name = $nameInput.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['type'] = type;
      C1_Json[i] = subJson;
    }
  }

  // 获取C2的部分
  let C2_Json = {};
  let nameArray = [];
  for(let i=1; i<=C2_count; i++) {
    let $nameInput = $("#C2_" + i + "_nameInput");
    let name = $nameInput.val();
    nameArray[i-1] = name;
  }
  C2_Json['name'] = nameArray;

  // 获取C3的部分
  let C3_Json = {};
  for(let i=1; i<=C3_count; i++) {
    let $container = $('#C3_'+i+'_container');
    let type = $container.attr('type');
    if (type === "1") {
      let $nameInput = $("#C3_" + i + "_nameInput");
      let $mailInput = $("#C3_" + i + "_mailInput");
      let $mailTextarea = $("#C3_" + i + "_textarea1");
      let $replyTextarea = $("#C3_" + i + "_textarea2");
      let name = $nameInput.val();
      let mail = $mailInput.val();
      let mailContent = $mailTextarea.val();
      let replyContent = $replyTextarea.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['mail'] = mail;
      subJson['mailContent'] = mailContent;
      subJson['replyContent'] = replyContent;
      subJson['type'] = type;
      C3_Json[i] = subJson;
    } else if (type === "2") { 
      let $nameInput = $("#C3_" + i + "_nameInput");
      let $mailInput = $("#C3_" + i + "_mailInput");
      let $mailTextarea = $("#C3_" + i + "_textarea1");
      let name = $nameInput.val();
      let mail = $mailInput.val();
      let mailContent = $mailTextarea.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['mail'] = mail;
      subJson['mailContent'] = mailContent;
      subJson['type'] = type;
      C3_Json[i] = subJson;
    }
  }

  // 获取C4的部分
  let C4_Json = {};
  for(let i=1; i<=C4_count; i++) {
    let $container = $('#C4_'+i+'_container');
    let type = $container.attr('type');
    if (type === "1") {
      let $nameInput = $("#C4_" + i + "_nameInput");
      let $mailTextarea = $("#C4_" + i + "_textarea1");
      let $replyTextarea = $("#C4_" + i + "_textarea2");
      let name = $nameInput.val();
      let mailContent = $mailTextarea.val();
      let replyContent = $replyTextarea.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['mailContent'] = mailContent;
      subJson['replyContent'] = replyContent;
      subJson['type'] = type;
      C4_Json[i] = subJson;
    } else if (type === "2") { 
      let $nameInput = $("#C4_" + i + "_nameInput");
      let $mailTextarea = $("#C4_" + i + "_textarea1");
      let name = $nameInput.val();
      let mailContent = $mailTextarea.val();
      let subJson = {};
      subJson['name'] = name;
      subJson['mailContent'] = mailContent;
      subJson['type'] = type;
      console.log(subJson);
      C4_Json[i] = subJson;
    }
  }

  // 获取C5的部分
  let C5_Json = {};
  for(let i=1; i<=C5_count; i++) {
    let $container = $('#C5_'+i+'_container');
    let type = $container.attr('type');
    if (type === "1") {
      let $contentTextarea = $("#C5_" + i + "_textarea1");
      let $mailTextarea = $("#C5_" + i + "_textarea2");
      let content = $contentTextarea.val();
      let mail = $mailTextarea.val();
      let subJson = {};
      subJson['content'] = content;
      subJson['mail'] = mail;
      subJson['type'] = type;
      C5_Json[i] = subJson;
    } else if (type === "2") { 
      let $contentTextarea = $("#C5_" + i + "_textarea1");
      let content = $contentTextarea.val();
      let subJson = {};
      subJson['content'] = content;
      subJson['type'] = type;
      C5_Json[i] = subJson;
    }
  }

  // D 需要告诉下一位值班负责人的事
  // 获取B的正文
  let D_textarea_value = $("#D_textarea").val();
  saveJson['inherit'] = getRealContent(D_textarea_value) === "无" ? undefined : getRealContent(D_textarea_value);
  // 将数据都放入saveJson中
  saveJson['C1'] = C1_Json;
  saveJson['C2'] = C2_Json;
  saveJson['C3'] = C3_Json;
  saveJson['C4'] = C4_Json;
  saveJson['C5'] = C5_Json;
  return saveJson;
}

/*************************************************************
 * 重置
 * 
 * 
 * 
 ****************************************************************/




/**
 * C2重置值
 */
var resetValueC2 = function (C2_count, alljson) {
  // 页面所有的数据集合
  let nameArray = alljson.C2.name;
  // 从页面中找到应该设置值的地方，以及应该设置的值
  for(let i=1; i<=C2_count; i++) {
    let $nameInput = $("#C2_" + i + "_nameInput");
    $nameInput.val(nameArray[i-1]);
  }
}

/**
 * C1重置值
 */
var resetValueC1 = function (C1_count , alljson) {
  // 从页面中找到应该设置值的地方，以及应该设置的值
  for(let i=1; i<=C1_count; i++) {
    let json = alljson.C1[i + ""];
    let type = json.type;
    if (type === "1") {
      // 找到输入框并且赋值
      let $nameInput = $("#C1_" + i + "_nameInput");
      let $courseInput = $("#C1_" + i + "_courseInput");
      $nameInput.val(json.name);
      $courseInput.val(json.course);
      console.log(json.name);
      console.log(json.course);

    } else if (type === "2") { 
      let $nameInput = $("#C1_" + i + "_nameInput");
      let $pointInput = $("#C1_" + i + "_pointInput");
      $nameInput.val(json.name);
      $pointInput.val(json.point);

    } else if (type === "3") {
      let $nameInput = $("#C1_" + i + "_nameInput");
      $nameInput.val(json.name);

    } else if (type === "4") {
      let $nameInput = $("#C1_" + i + "_nameInput");
      let $courseInput = $("#C1_" + i + "_courseInput");
      $nameInput.val(json.name);
      $courseInput.val(json.course);

    } else if (type === "5") {
      let $nameInput = $("#C1_" + i + "_nameInput");
      $nameInput.val(json.name);
    }
  }
}

/**
 * C3重置值
 */
var resetValueC3 = function (C3_count , alljson) {
  for(let i=1; i<=C3_count; i++) {
    let json = alljson.C3[i + ""];
    let type = json.type;
    if (type === "1") {
      let $nameInput = $("#C3_" + i + "_nameInput");
      let $mailInput = $("#C3_" + i + "_mailInput");
      let $mailTextarea = $("#C3_" + i + "_textarea1");
      let $replyTextarea = $("#C3_" + i + "_textarea2");
      $nameInput.val(json.name);
      $mailInput.val(json.mail);
      $mailTextarea.val(json.mailContent);
      $replyTextarea.val(json.replyContent);

    } else if (type === "2") { 
      let $nameInput = $("#C3_" + i + "_nameInput");
      let $mailInput = $("#C3_" + i + "_mailInput");
      let $mailTextarea = $("#C3_" + i + "_textarea1");
      $nameInput.val(json.name);
      $mailInput.val(json.mail);
      $mailTextarea.val(json.mailContent);
    }
  }
}

/**
 * C4重置
 */
var resetValueC4 = function (C4_count , alljson) {
  for(let i=1; i<=C4_count; i++) {
    let json = alljson.C4[i + ""];
    let type = json.type;
    if (type === "1") {
      let $nameInput = $("#C4_" + i + "_nameInput");
      let $mailTextarea = $("#C4_" + i + "_textarea1");
      let $replyTextarea = $("#C4_" + i + "_textarea2");
      $nameInput.val(json.name);
      $mailTextarea.val(json.mailContent);
      $replyTextarea.val(json.replyContent);

    } else if (type === "2") { 
      let $nameInput = $("#C4_" + i + "_nameInput");
      let $mailTextarea = $("#C4_" + i + "_textarea1");
      $nameInput.val(json.name);
      $mailTextarea.val(json.mailContent);
    }
  }
}


/**
 * C5重置
 */
var resetValueC5 = function (C5_count , alljson) {
  for(let i=1; i<=C5_count; i++) {
    let json = alljson.C5[i+ ""];
    let type = json.type;
    if (type === "1") {
      let $contentTextarea = $("#C5_" + i + "_textarea1");
      let $mailTextarea = $("#C5_" + i + "_textarea2");
      $contentTextarea.val(json.content);
      $mailTextarea.val(json.mail);

    } else if (type === "2") { 
      let $contentTextarea = $("#C5_" + i + "_textarea1");
      $contentTextarea.val(json.content);
    }
  }
}

