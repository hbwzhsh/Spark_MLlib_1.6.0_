/**
* Spark 任务状态监控
*/
var editFlag = undefined;
$(function() {

	$('#checkId').bind('click', function(){
		// TODO 更新jobinfoId即可
//$('#jobinfo_records').combobox("getValue")
        var records_ = $('#jobinfo_records').combobox("getValue");
        $('#jobinfoId').datagrid('options').queryParams={tableName: 'JobInfo' ,records: records_};
        $("#jobinfoId").datagrid('reload');
	});


	// jobinfoId
	$('#jobinfoId').datagrid(
			{
				border : false,
				fitColumns : false,
				singleSelect : true,
				width : 600,
				height : 250,
				nowrap : false,
				fit : true,
				pagination : true,// 分页控件
				pageSize : 4, // 每页记录数，需要和pageList保持倍数关系
				pageList : [ 4, 8, 12 ],
				rownumbers : true,// 行号
				pagePosition : 'top',
				url : 'dB/dB_getJobInfo.action',
				queryParams: {
					tableName: 'JobInfo' ,//,
					records: 10
				},
				idField:'id',
				columns : [[
						{
							field : 'id',
							title : 'ID',
							width : '30'
						},
						{
							field : 'jobId',
							title : '任务ID',
							width : '250'
						},
						{
							field : 'runState',
							title : '运行状态',
							width : '100'
						},
                        {
                            field : 'startTime',
                            title : '启动时间',
                            width : '170',
                            formatter : formatter_fun
                        },

                     {
                         field : 'modifiedTime',
                         title : '更新时间',
                         width : '170',
                         formatter : formatter_fun
                     },
                     {
                         field : 'finished',
                         title : '是否完成',
                         width : '70',
                         formatter : formatter_trueOrFalse
                     } ]]
			    });
	//jobinfoId
});


/**
* 格式化true或false
*/
function formatter_trueOrFalse(value,row,index){
    if(1 == value || "1" ==value){
        return "完成";
    }else{
        return "未完成";
    }
}
/**
* 格式化时间显示
*/
function formatter_fun(value,row,index){
    var date = new Date(value);
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1);
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minutes = date.getMinutes().toString();
    var seconds = date.getSeconds().toString();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return year + "/" + month + "/" + day + " " + hour + ":" + minutes + ":" + seconds;
}

