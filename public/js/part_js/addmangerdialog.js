// JavaScript Document
function select_value(t)
{
	$(t).parent().find("li.selected").removeClass("selected");
	$('#admin_name').val('');
	var value=$(t).text();
	//alert(value)
	$('#admin_name').val(value);
	
	$(t).addClass("selected");
//	var path = 'manager/get_is_ldap';
	var user_id=$(t).attr("user_id");
	$('#admin_name').attr("user_id",user_id)
//	var obj={
//		"user_id":user_id,
//		"login_name":$('#admin_name').val()
//	};
//	$.post(path,obj,function(data)
//	 {
//		 if(data.code==0)
//			 {
//			 $('#admin_option').html('');
//			 if(data.data.is_ldap==1)
//				 {
//					 //$('#admin_option').html('');
//					 var text='<dd class="option selected" target="1"  onclick="role_select(this)">请选择管理员角色</dd>'
//								+'<dd class="option" target="2"  role_id="3" onclick="role_select(this)">员工管理员</dd>'
//								+'<dd class="option" target="3" role_id="4" onclick="role_select(this)">帐号管理员</dd>';
//					$('#admin_option').append(text); 
//				 }
//				 else
//				 {
//					 //$('#admin_option').html('');
//					 var text='<dd class="option selected" target="1" onclick="role_select(this)">请选择管理员角色</dd>'
//								+'<dd class="option" target="2"  role_id="3" onclick="role_select(this)">员工管理员</dd>'
//								+'<dd class="option" target="3"  role_id="4" onclick="role_select(this)">帐号管理员</dd>';
//						//		+'<dd class="option" target="4"  role_id="5" onclick="role_select(this)">生态管理员</dd>';
//					$('#admin_option').append(text);
//				 }
//			 }
//		
//	 },'json')
}
function role_select(t)
{
	$('#admin_option dd.selected').removeClass("selected");
	$(t).addClass("selected");
	var value=$(t).text();
	$('#juese').find("span").text(value);
	$('#juese').find("span").addClass("selected");
	$(t).parent().parent().hide();
	var val = $('#juese').find('dd.selected').attr("target");
	
	if(val == 2 || val == 3){ 
		// 如果是员工管理员或者账号管理员，则显示维度选项
		$('.infoTable .hideBar01').removeClass('hide');
		
		// 判断此时有哪几种维度可选：部门，地区，成本中心
		area_path="manager/getRegion";
		$.post(area_path,[],function(data)
		  {
			  var dat=data.data.ret_data;
			  if(dat == ''){
				 // 如果地区维度没有值，则隐藏地区维度选项
				  $('#area_option').hide();
			  }
		  },'json');
		
		// 隐藏成本中心维度选项
		$('#cost_center_option').hide();
	}else{
		// 如果是生态管理员，则不显示维度选项，因为生态管理员没有维度
		$('.infoTable .hideBar01, .infoTable .hideBar02').addClass('hide');
	}
}
function first_area(t)
{
	$('#first_level').find("input").val('');
	if($(t).hasClass("checked"))
		{
			$(t).removeClass("checked");
		}
	else{
		$(t).addClass("checked");
	}
	//$(t).parent().find(".checked").removeClass("checked");
	
	// 判断地区是否可选
//	if($(t).find("input").val() == 0){
//		// TODO 方案：给当前输入框右边加“不可用”图标
//		var html = '<span id="error_msg" style="display:none;color:red;">错误</span>';
//		$("#first_level").parent().append(html);
//		$('#error_msg').show();
//	}
	var value=$(t).find("label").text();
	$('#first_level').find("input").val(value);
}
function area_select(t)
{
	$(t).parent().find("dd.selected").removeClass("selected");
	$(t).addClass("selected");
	
	// 判断地区是否可选
//	if($(t).parent().find('dd.selected').attr('target') == 0){
//		//alert(111)
//		var html = '<span id="err_msg" style="display:none;color:red;">错误</span>';
//		$("#second_level").parent().append(html);
//		$('#err_msg').show();
//	}
	var value=$(t).text();
	$('#second_level').find("input").val(value);
}
function add_admin()
{
	//alert(2)
	$("#error").hide();
	$('.error').removeClass("error");
	var admin=$('#admin_name').val();
	var user_id=$('#admin_name').attr("user_id");
	if(user_id==undefined)
	{
		user_id="";
	}
	var count=0;
	if(!/@/.test(admin))
	{
		//alert(1);
		count++;
		$('#admin_name').parent().addClass("error");
		$('#error').show();
	}
	var stat=$('#juese dd.selected').attr("role_id");
	//alert(stat)
	if(stat=="" || stat=="0" ||stat==undefined)
	{ //alert(stat);
		count++;
		
		$('#juese').addClass("error");
	}
	var first_level=$('#weidu01 dd.selected').attr("target");
	var ids='';
	var weidu_1='';
	if(first_level==1)
	{
		count++;
		$('#weidu01').addClass("error");
	}
	else
	{
		if(first_level==2 || first_level==4)
		{
			var zTree = $.fn.zTree.getZTreeObj("ztree3");
			var Nodes=zTree.getCheckedNodes(true);
			
			if(Nodes.length==0)
			{
				count++;
				$('#ztree3').parent().addClass("error");
			}
			else
			{
				
				
				for(var i=0;i<Nodes.length;i++)
					{
						var treeNode = Nodes[i];
						var id_2 = treeNode.pId;
						var org_code ='-' + treeNode.id;
						var node;
						while (zTree.getNodesByParam('id', id_2, null)[0] != null) {
							node = zTree.getNodesByParam('id', id_2, null)[0];
							id_2 = node.pId;
							org_code ='-' + node.id + org_code;;
							// value.push(node.name);
							// id_value.push(node.id);
				
						}
						
						//ids=ids+org_code+',';
						ids=ids+Nodes[i].id+',';
					}
				
			}
		}
		else if(first_level==3)
		{
			if($('#ztree3 li.checked').length==0)
			{
				count++;
				$('#ztree3').parent().addClass("error");
			}
			$('#ztree3 li.checked').each(function()
			{
				ids=ids+$(this).find("label").text()+',';
			})
			
		}
	}
	if(ids=="")
	{
		count++;
		$('#first_level').addClass("error");
	}else if(ids == '请选择管理部门'){
		count++;
		$('#first_level').addClass("error");
	}
	var staff_tag_post = ids;
	
	var lastIndex = staff_tag_post.lastIndexOf(",");
	
	if (lastIndex > -1) {
	  ids = staff_tag_post.substring(0, lastIndex) + staff_tag_post.substring(lastIndex + 1, staff_tag_post.length);
	}
	
	if(first_level==2)
	{
		//ids = (ids == '请选择管理部门') ? '' : ids;
		weidu_1='{"key":"department","value":"'+ids+'"}'
	}
	else if(first_level==4)
	{
		ids = (ids == '请选择管理成本中心') ? '' : ids;
		weidu_1='{"key":"costcenter","value":"'+ids+'"}'
	}
	else
	{
		ids = (ids == '该公司暂无地区可选') ? '' : ids;
		weidu_1='{"key":"region","value":"'+ids+'"}'
	}
	
	var second_level=$('#weidu02 dd.selected').attr("target");
	var weidu_2="";
	if(second_level != undefined){ // 有第二维度
		var ids1='';
		if(second_level==1)
		{
			count++;
			$('#weidu02').addClass("error");
		}
		else
		{
			if(second_level==2 || second_level==4)
			{
				//alert(1)
				var zTree1 = $.fn.zTree.getZTreeObj("ztree4");
				var Nodes1=zTree1.getCheckedNodes(true);
				
				if(Nodes1.length==0)
				{
					count++;
					$('#ztree4').parent().addClass("error");
				}
				else
				{
					for(var i=0;i<Nodes1.length;i++)
						{
							var treeNode = Nodes1[i];
							var id_2 = treeNode.pId;
							var org_code ='-' + treeNode.id;
							var node;
							while (zTree1.getNodesByParam('id', id_2, null)[0] != null) {
								node = zTree1.getNodesByParam('id', id_2, null)[0];
								id_2 = node.pId;
								org_code ='-' + node.id + org_code;;
								// value.push(node.name);
								// id_value.push(node.id);
					
							}
							//ids1=org_code;
							ids1=Nodes1[i].id;
						}
						
				}
			}
			else if(second_level==3)
			{
				if($('#ztree4 dd.selected').length==0)
				{
					count++;
					$('#ztree4').parent().addClass("error");
				}
				$('#ztree4 dd.selected').each(function()
				{
					ids1=$(this).text();
				})
			}
		}
		if(ids1=="")
		{
			count++;
			$('#second_level').addClass("error");
				
		}
		
		if(second_level==2)
		{
			//ids1 = (ids1 == '请选择管理部门') ? '' : ids1;
			weidu_2='{"key":"department","value":"'+ids1+'"}'
		}
		else if(second_level==4)
		{
			ids1 = (ids1 == '请选择管理成本中心') ? '' : ids1;
			weidu_2='{"key":"costcenter","value":"'+ids1+'"}'
		}
		else
		{
			ids1 = (ids1 == '该公司暂无地区可选') ? '' : ids1;
			weidu_2='{"key":"region","value":"'+ids1+'"}'
		}
	}else{
		weidu_2 += '""'; 
	}
	//alert(stat);
	// |------------------------xue.bai_2@quanshi.com  2014-10-08--------------------
	var manager_info = '{"login_name":"'+admin+'","user_id":"'+ user_id +'","role_id":'+ stat +',"w1":'+ weidu_1 +',"w2":'+ weidu_2 +'}';
	// ------------------------xue.bai_2@quanshi.com  2014-10-08--------------------|
	//alert(stat)
	var obj={
			"manager_info":manager_info
		//"user_id":user_id,
		//"role_id":stat,
		//"w1":ids,
		//"w2":ids1
	};
	if(count>0)
	{
		return false;
	}
	var path="manager/addManager";
	$.post(path,obj,function(data)
	 {
		 if(data.code==0)
		 {
			 //alert(data)
			 //$('#self_staff').remove();
			 hideDialog();
			 showDialog('manager/show_confirm_email_page?user_id=' + data.other_msg.user_id + '&id=' + data.other_msg.id);
//			 user_id = data.other_msg.user_id;
//			 id = data.other_msg.id;
//			 $.post('manager/show_confirm_email_page', {"user_id":user_id,"id":id}, function(data){
//				 
//			 });
			 //adminstaff_infor(this, data.other_msg.user_id, data.other_msg.id);
		 }
		 else
		 {
			 if(data.error_id=="user_id")
			 {
//				$('#admin_name').parent().addClass("error"); 
//				$('#error').show();
				$('#admin_name').parent().addClass("error");
				$('#error').show();
			 }
			 else if (data.error_id=="role_id")
			 {
				$('#juese').addClass("error"); 
				alert(data.prompt_text);
			 }
			 else if (data.error_id=="wl")
			 {
				$('#ztree3').parent().addClass("error"); 
				alert(data.prompt_text);
			 }else if (data.error_id=="w2")
			 {
				$('#ztree4').parent().addClass("error"); 
				alert(data.prompt_text);
			 }
			 
		 }
	 },'json')
	
}
$(function(){
		//$.fn.zTree.init($("#ztree3"), optionSetting, zNodes);
		//$.fn.zTree.init($("#ztree4"), radioSetting, zNodes);
		//$("#selectOption1").jScrollPane();
	//点击管理员角色
	$('#juese span').click(function()
			{
//				if($('#admin_name').val()=="")
//					{
//						
//						$(this).parent().find(".option_Box").hide();
//					}
//				else
//					{
						
						$(this).parent().find(".option_Box").show();
						
//					}
			});
		$('.dialogBody .infoTable .selectBox').combo({
			cont:'>.text',
			listCont:'>.optionBox',
			list:'>.optionList',
			listItem:' .option'
		});
		//点击管理员角色
		$('#juese span').click(function()
				{
					
					if($('#admin_name').val()=="")
						{
						
							$(this).parent().find(".optionBox").hide();
						}
					else
						{
						
							$(this).parent().find(".optionBox").show();
						}
				})

				
// start -->新建管理员时搜索员工功能		
function searchUser() {
	$('#search_admin').html('');
	$('#admin_name').attr("user_id", '');
	
	var keyword = $('#admin_name').val();
	var reg = /\s/g;
	keyword = keyword.replace(reg, '');
	
	if(keyword != '')
	{
		$('#error').css({'display':'none'});
		var path = 'search/searchManager';
		var obj = {
					"keyword":keyword
				};
		$.post(path, obj, function(data){
			var dat=data.data.ret_data;
			var html='';
			for(var i=0;i<dat.length;i++){
				html=html+'<li style="width:290px" onclick="select_value(this)" user_id="'+dat[i].user_id+'">'+dat[i].displayName+''+dat[i].loginName+'</li>';
			}
			html='<ul class="lianxiangUl selectOptionBox" style="display: block;">'+html+'</ul>';
			$('#search_admin1').html(html);
		},"json");							
	}else{
		$('.lianxiangUl').css({'display':'none'});
	}
}
var timer = null;
$('#admin_name').keyup(function(event){
	clearTimeout(timer);
	timer = setTimeout(function(){searchUser()}, 2000);
});
// end <--新建管理员时搜索员工功能
		
		
		$('#juese').combo({
			redata:true,
			changedFn:function(){					
					var val = $('#juese').find('dd.selected').attr("target");
					//alert(val);
					if(val == 2 || val == 3){
						$('.infoTable .hideBar01').removeClass('hide');
						// 如果是员工管理员或者账号管理员，则显示维度选项
						$('.infoTable .hideBar01').removeClass('hide');
						
						// 判断此时有哪几种维度可选：部门，地区，成本中心
						area_path="manager/getRegion";
						$.post(area_path,[],function(data)
						  {
							  var dat=data.data.ret_data;
							  if(dat == ''){
								 // 如果地区维度没有值，则隐藏地区维度选项
								  $('#area_option').hide();
							  }
						  },'json');
						
						// 隐藏成本中心维度选项
						$('#cost_center_option').hide();
						
					}else{
						$('.infoTable .hideBar01, .infoTable .hideBar02').addClass('hide');
					}
				}
		});
		
		$('#weidu01').combo({
			redata:true,
			changedFn:function(){
					var _this = $('#weidu01');
					var val = _this.find('input').val();
					//console.log(val);
					var _option = _this.parent().siblings('td').children();
					//_option.addClass('hide');
					
					if(val > 1) { 
						_option.eq(val-2).removeClass('hide');
						$("#weidu02").parent().siblings("td").children().addClass("hide");
						$("#weidu02 .text").attr({"title":"请选择第二个管理维度"}).text("请选择第二个管理维度");
						$("#weidu02 input").val("1");
						$("#weidu02 dd.option").eq(val-1).hide().siblings().show().removeClass("selected");
					}
					//$('.infoTable .hideBar02').addClass('hide');
					$('.infoTable .hideBar02').removeClass('hide');
				}
		});
		$('#weidu01 dd.option').click(function()
		   {
			   
			   var range;
			   var path=''; 
			   var t=-1;
			   $("#ztree3").html('');
			   $('#first_level #departmentSel').val('');
			  if($('.hideBar02').length!=0)
			  {
				   t=$('#weidu02 dd.selected').attr("target");
				   
			  }
			  //alert(t)
			   if($(this).attr("target")!="1")
			   { //alert($(this).attr("target"))
				   if($(this).attr("target")=="2")
				   {
					   range="department";
					   path="organize/get_org_tree";
					   $('#error_msg').hide();
					  	$('#first_level #departmentSel').val('请选择管理部门');
					   if($(this).attr("target")==t)
					   {
						 //alert(t)
						  // $('#weidu02 
						   $('#weidu02 span').text("请选择第二管理维度").attr({"title":"请选择第二个管理维度"});
						   //alert(1212)
					   }
					  
				   }
				   else if($(this).attr("target")=="3")
				   {
					   range="area";
					   $('#error_msg').hide();
					   $('#first_level #departmentSel').val('请选择管理地区');
					   path="manager/getRegion";
					    if($(this).attr("target")==t)
					   {
						  // alert(3)
						   $('#weidu02 span').text("请选择第二管理维度").attr({"title":"请选择第二个管理维度"});
					   }
				   }
				   else
				   {
					   range="costcenter";
					   $('#error_msg').hide();
					   $('#first_level #departmentSel').val('请选择管理成本中心');
					    if($(this).attr("target")==t)
					   {
						   //alert(4)
						    $('#weidu02 span').text("请选择第二管理维度").attr({"title":"请选择第二个管理维度"});
					   }
				   }
				   $('#first_level').removeClass("hide");
				   if($('.hideBar02').length==0)
				   {
					   // 判断地区是否有值
						area_path="manager/getRegion";
						$.post(area_path,[],function(data)
						  {
							  var dat=data.data.ret_data;
							  if(dat != ''){
								  //TODO 判断成本中心是否有值
								  
								  
								  var weidu=$('#weidu01').parent().parent().html();
								   var div='<tr class="hideBar02">'+weidu+'</tr>';
								   $('#weidu01').parent().parent().after(div);
								   $('.hideBar02').find("#weidu01").attr("id","weidu02");
								   $('#weidu02').parent().next().find("#first_level").attr("id","second_level");
								  $('#weidu02').find("a").attr({"cl_id":"weidu02"});
								   $('#weidu02').find("span").attr({"cl_id":"weidu02"});
								   $('#second_level').addClass("hide").css("z-index",100);
								   $('#weidu02 span').text("请选择第二管理维度").attr({"title":"请选择第二个管理维度"});
								   $('#weidu02 dd.selected').removeClass("selected");
								   //var ta=$(this).attr("target");
								   //$('#weidu02').attr("onclick","show_list()");
								   $('#weidu02').die('mouseup');
								 	$('#weidu02').live('mouseup',function(event)
									 {
										 var ta=$('#weidu01 dd.selected').attr("target");
										  $('#weidu02 dd').show();
										 $('#weidu02 dd').each(function()
										 {
											 if($(this).attr("target")==ta) // 如果第一维度已选中，则在第二维度中隐藏已经被选中的
											 {
												  $(this).hide().removeClass("selected");
											 }
										 })
										 $(this).find(".optionBox").show();
										 event.cancelBubble = true;
									 })
									$('#weidu02 dd').die('mouseup');
									$('#weidu02 dd').live('mouseup',function(event)
									{
										var ran;
										var path;
										$('#ztree4').html('');
										$('#weidu02 dd').removeClass("selected").removeClass("hover");
										$('#weidu02 span').text($(this).text());
										$(this).addClass("selected");
										 $('#second_level').removeClass("hide");
										 $('#second_level').find("ul.ztree").attr({"id":"ztree4"})
										$('#weidu02').find(".optionBox").hide();
										if($(this).attr("target")!="1")
										   { //alert($(this).attr("target"))
											   if($(this).attr("target")=="2")
											   {
												   ran="department";
												    path="organize/get_org_tree";
												    $('#err_msg').hide();
													$('#second_level #departmentSel').val('请选择管理部门');
												  
											   }
											   else if($(this).attr("target")=="3")
											   {
												   ran="area"; 
												   $('#err_msg').hide();
												   $('#second_level #departmentSel').val('请选择管理地区');
												  path="manager/getRegion";
											   }
											   else
											   {
												   ran="costcenter";
												   $('#err_msg').hide();
												   $('#second_level #departmentSel').val('请选择管理成本中心');
											   }
										   }
										   $.post(path,[],function(data)
											  {
												  if(ran=="area")
												  {
													  var html='';
													  var dat=data.data.ret_data;
													 
													  if(dat == ''){
														  html = '<dd target="0" onclick="area_select(this)">该公司暂无地区可选</dd>';
													  }
													  for(var i=0;i<dat.length;i++)
													  { //alert(dat[0].city)
														 html=html+'<dd class="option" target="1" onclick="area_select(this)" style="cursor:pointer">'+dat[i]+'</dd>';
													  }
													  //alert(html)
													  html="<dl>"+html+"</dl>";
													 $("#ztree4").append(html);
												  }else
												  {
													  var zNodes=$.parseJSON(data.prompt_text);
													  var leng=zNodes.length;
													   for(var i=0; i<leng;i++)
														{
															//cost_zNodes.push(childNodes[i]);
																if(!zNodes[i].isParent)
																{
																	zNodes[i].nocheck=false;
																	
																}
														}
														//zNodes=[{id:1,pId:0, name:"海尔",open:true,nocheck:true}];
													   $.fn.zTree.init($("#ztree4"),wdSetting,zNodes);
												  }
												 
											  },'json')
										event.cancelBubble = true;
										
										
									})
							  }
						  },'json');
					   
					  
						
				   }
				   $.post(path,[],function(data)
					  {
						  if(range=="area")
						  {
							  var html='';
							  var dat=data.data.ret_data;
							  
							  if(dat == ''){
								  html = '<li onclick="first_area(this)"><a ><label><input name="" type="hidden" value="0" />该公司暂无地区可选</label>'+'</a></li>';
							  }
							 
							  for(var i=0;i<dat.length;i++)
							  { //alert(dat[0].city)
								 html=html+'<li onclick="first_area(this)"><a ><label><input name="" type="checkbox" value="'+ dat[i] +'" />'+dat[i]+'</label>'+
								 '</a></li>';
							  }
							  //alert(html)
							 $("#ztree3").append(html);
						  }else
						  {
							  var zNodes=$.parseJSON(data.prompt_text);
							  var leng=zNodes.length;
							   for(var i=0; i<leng;i++)
								{
									//cost_zNodes.push(childNodes[i]);
										if(!zNodes[i].isParent)
										{
											zNodes[i].nocheck=false;
											
										}
								}
								//alert(1)
								//zNodes=[{id:1,pId:0, name:"海尔",open:true,nocheck:true}];
							   $.fn.zTree.init($("#ztree3"),weiduSetting,zNodes);
						  }
						 
					  },'json')
			   }
		   });
		
		$('#weidu02').combo({
			redata:true,
			changedFn:function(){
					var _this = $('#weidu02');
					var val = _this.find('input').val();
					var _option = _this.parent().siblings('td').children();
					_option.addClass('hide');
					if(val > 1) _option.eq(val-2).removeClass('hide');
				}
		});
		
		$("#selectOption2").click(function(){
			isChecked = $(this).find("input:checked");
			val = "";
			isChecked.parents("li").each(function(index, element) {
                val += $(this).text()+",";
            });
			
			if (val.length > 0 ) val = val.substring(0, val.length-1);
			$("#locationSel").attr("value",val);
		})
		
		$("#selectOption3").click(function(){
			isChecked = $(this).find("input:checked");
			val = "";
			isChecked.parents("li").each(function(index, element) {
                val += $(this).text()+",";
            });
			
			if (val.length > 0 ) val = val.substring(0, val.length-1);
			$("#centerSel").attr("value",val);
		})
		
		

	});
	
	$(document).click(function(event)
	   {
		  
		
		   if($(event.target).attr("cl_id")!="weidu02" && $(event.target).attr("cl_id")!="weidu01")
		   {
			   
			   $('.optionBox').hide();
			   $('.option_Box').hide();
			   
		   }
		    if($(event.target).attr("cl_id")!="part1" && $(event.target).attr("cl_id")!="part2")
		   { 
			   if($(event.target).parentsUntil(".selectOptionBox").hasClass("ztree"))
			   {
				  
				   return;
			   } 
			  
			   $('.selectOptionBox').hide();
		   }
		   
	   })
	function showMenu(t)
	{
		
		$(t).parent().find(".selectOptionBox").show();
	}
	
	