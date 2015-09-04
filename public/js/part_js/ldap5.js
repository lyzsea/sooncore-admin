//LDap5
var filter_rule;
var	email_next;
var email_value;
var is_auto_del;
var ldap_name;
var obj;
function nextStep5() {
	var count=0;
    var select_box = 0; //选框的值,如果为0是未选中，为1是选中
    var Exception_rule = [];
    var Re_rule = []; ////设置的例外规则
    var objectclasses=$('#objectclasses').find("input").val();
    var idAttribute=$('#idAttribute').find("input").val();
    var nameAttribute=$('#nameAttribute').find("input").val();
    var relationshipType = 'DEFAULT';	//ldap的关系类型，1表示默认DEFAULT，2表示一对一OneToOne，3表示多对多ManyToMany
    var ldapOrgUserMappingObj = {
    		relationshipType: relationshipType,
    };
    
    if($('#custom_made').hasClass('checked')){
    	ldapOrgUserMappingObj.relationshipType = 'OneToOne';
    	ldapOrgUserMappingObj.userAttribute = $('.userAttribute').attr('value');
    	ldapOrgUserMappingObj.orgAttribute = $('.orgAttribute').attr('value');
    	
    	if($('#made2').hasClass('checked')){
    		ldapOrgUserMappingObj.relationshipType = 'ManyToMany';
    		ldapOrgUserMappingObj.objectClass = $('.objectClass').attr('value');
    		ldapOrgUserMappingObj.searchBase = $('.searchBase').attr('value');
    		ldapOrgUserMappingObj.searchFilter = $('.searchFilter').attr('value');
    		ldapOrgUserMappingObj.joinUserAttribute = $('.joinUserAttribute').attr('value');
    		ldapOrgUserMappingObj.joinOrgAttribute = $('.joinOrgAttribute').attr('value');
    	}
    }
    //如果是非标准的ldap则需要进行组织勾选
    var zTree = $.fn.zTree.getZTreeObj("sync_ldap_tree");
    var Re_context = zTree.getCheckedNodes(true);
    var sync_org = [];
    Re_context.shift();
    if(Re_context.length > 0){
    	for (var i = 0; i < Re_context.length; i++) {
            ///Re_data=Re_data+'{id:'+Re_con[i]+',pid:'+Re_con[i+1]+',name:'+Re_con[i+2]+',},';
    		sync_org[i] = Re_context[i].id;
        }
    }
    
    $('#select_tag').parent("div").removeClass("error");
    $('#select_Two').parent("div").removeClass("error");
    if ($("dd .checkbox").hasClass("checked")) {
        select_box = 1;
    }
    var i = 0;
    if ($(".ldapSetBox5 .addRule tbody tr").length > 2) {
        $(".ldapSetBox5 .addRule tbody tr").each(function() {
            if (!$(this).hasClass("noOrder") && !$(this).hasClass("hide_word")) {
                Exception_rule[i] = $(this).find("td:first").text();
                i = i + 1;
            }
        })
    }
    var strTwo = $('#Select_div').text();
    if ($('#select_tag').text() != "选择标签" || $('#select_tag').text() != "") {
		var email_value = $('#select_tag').val();
		var email_next = $('.site_domain').length ? $('.site_domain').text() : '';
		
	} else {
		email_value = "";
		$('#select_tag').parent("div").addClass("error");
		count++;
	}
    /*
	if(strTwo=="使用邮箱作为蜜蜂帐号")
	{
		 if ($('#select_tag').text() != "选择标签" || $('#select_tag').text() != "") {
				var str = $('#select_tag').text();
				email_value = str;
				
			} else {
				email_value = "";
				$('#select_tag').parent("div").addClass("error");
				count++;
			}
		 email_next='';
	}
   else
   {
	   if ($('#select_tag').text() != "选择标签" || $('#select_tag').text() != "") {
        var str = $('#select_tag').text();
		var str1=$('.site_domain').text();
        email_value = str;
        email_next=str1;
		} else {
			email_value = "";
			$('#select_tag').parent("div").addClass("error");
			count++;
		}
   }
   */
    if(objectclasses=='')
    	{
    		$("#objectclasses").addClass("error");
    		count++;
    	}
    if(idAttribute=='')
    {
    		$("#idAttribute").addClass("error");
    		count++;
    }
    if(nameAttribute=='')
    {
    		$("#nameAttribute").addClass("error");
    		count++;
    }
    
    if ($('#select_tag').val() == "选择标签" || $('#select_tag').val() == "") {
        $('#select_tag').parent("div").addClass("error");
//		$('.error5').show();
//        $('.error5').text("请设置蜜蜂账号") ;
		return false;
    } else {
    	if(count!=0)
		{
    		return false;
		}
		 $('.error5').hide();
        var path = "ldap/checkAllLdapParams";
        if ($('.del_ldap').hasClass("checked")) {
            is_auto_del = 1;
        } else {
            is_auto_del = 0;
        }
        
        obj = {
            server_info: server_info,//LDAP配置
            org_info: org_info,//同步的组织结构列表
            classes: classes,//员工标签
            property_info: property_info,//设定员工标签对应的组织标签
            ldapOrgUserMapping: ldapOrgUserMappingObj,
            filter_rule: Exception_rule.join(';'),
            email_next: email_next,
            email_value: email_value,
            is_auto_del: is_auto_del
//            objectclasses: objectclasses,
//            idAttribute: idAttribute,
//            nameAttribute: nameAttribute,
        };
        if($('#custom_made').hasClass('checked')){	//如果是非标准的ldap则需要添加同步组织属性
        	obj.sync_org = sync_org;
        }
        $("#checking").show();
        $.ajax({
            url: path,
            timeout: 6000,
            type: "POST",
            data: obj,
            success: function(data) {
                var json = $.parseJSON(data);
                if (json.code == 0) {
                    /* */
                    //var clr = setTimeout(function(){
					$('.error5').hide();
					$("#checking").hide();
                    showDialog("ldap/showSavePage");
                   
                }else {
					$("#checking").hide();
                    if (json.error == "select_two") {
                        $('#' + json.error_id + '').parent("div").addClass("error");
                        $('#select_tag').parent("div").addClass("error");
						$('.error5').show();
                        $('.error5').text("请设置蜜蜂账号");
                    } else if (json.error == "select_tag") {
                        $('#' + json.error_id + '').parent("div").addClass("error");
                        $('#select_tw0').parent("div").addClass("error");
						$('.error5').show();
                        $('.error5').text("请设置蜜蜂账号");
                    } else {
                        $('#' + json.error_id + '').parent("div").addClass("error");
                    }
                    return false;
                }
//				else
//					{
//						alert(json.prompt_text);
//					}
            },
            error: function() {
				$("#checking").hide();
                $('.ldapSetBox5 .error5').show();
				$('.ldapSetBox5 dd.error5').text("操作超时，请稍后再试");
            }
        })

    }

}
function addOrder() {
    $(".noOrder").find("span").attr("tagert", "0");
    $('.noOrder').hide().prev().show();
    $("#orderValue").val("");
}
function addOrderSuccess(t) {
    var val = $("#orderValue").val();
    if (val == "") {
        $("#orderValue").focus().parent(".inputBox").addClass("error");
        return false;
    } else {
        $(t).parents("tr").before('<tr><td width="326">' + val + '</td><td><a class="btnGray btn" onclick="editOrder(this)"><span class="text">&nbsp;编辑&nbsp;</span><b class="bgR"></b></a> &nbsp;' + '<a id="addOrderCancel" class="btnGray btn"  onclick="deleteOrder(this)"><span class="text">&nbsp;删除&nbsp;</span><b class="bgR"></b></a>' + '</td>' + ' </tr>');

        $(".noOrder").show().find("span").hide();
        $(t).parents("tr").hide();
    }
}

function deleteOrder(t) {
    var len = $(t).parents("table").find("tr").length;
    $(t).parents("tr").remove();
    if (len == 3) {
        $(".noOrder").find("span").show();
    }
}
function cancelAddOrder() {
    $('.noOrder').show().prev().hide();
}

var editVal;
function editOrder(t) {
    var val = $(t).parent("td").prev().text();
    editVal = val;
    $(t).parent("td").prev().html('<div class="inputBox w318">' + '<b class="bgR"></b>' + '<label class="label"></label>' + '<input class="input" value="' + val + '" />' + '</div>');
    $(t).parent("td").html('<a class="btnBlue yes" onclick="editOrderSuccess(this)"><span class="text">&nbsp;确定&nbsp;</span><b class="bgR"></b></a>&nbsp; <a class="btnGray btn" onclick="cancelEditOrder(this)"><span class="text">&nbsp;取消&nbsp;</span><b class="bgR"></b></a>')
}

function editOrderSuccess(t) {
    var val = $(t).parent("td").prev().find("input").val();
    if (val == "") {
        $(t).parent("td").prev().find("input").focus();
        return false;
    } else {
        $(t).parent("td").prev().text(val);
        $(t).parent("td").html('<a class="btnGray btn" onclick="editOrder(this)"><span class="text">&nbsp;编辑&nbsp;</span><b class="bgR"></b></a> &nbsp;' + '<a id="addOrderCancel" class="btnGray btn" onclick="deleteOrder(this)"><span class="text">&nbsp;删除&nbsp;</span><b class="bgR"></b></a>')
    }
}

function cancelEditOrder(t) {
    $(t).parent("td").prev().text(editVal);
    $(t).parent("td").html('<a class="btnGray btn"  onclick="editOrder(this)"><span class="text">&nbsp;编辑&nbsp;</span><b class="bgR"></b></a> &nbsp;' + '<a id="addOrderCancel" class="btnGray btn" onclick="deleteOrder(this)"><span class="text">&nbsp;删除&nbsp;</span><b class="bgR"></b></a>');
}
function ldapf_select(t)
{
	if($(t).attr("target")==1)
	   {
		$('.site_domain').hide();
	   }
	   else
	   {
		   $('.site_domain').show();
	   }
}

$(function()
{     
	$('.ldapSetBox5 .infoTable .selectBox').combo({
        cont: '>.text',
        listCont: '>.optionBox',
        list: '>.optionList',
        listItem: '.option'
    });
	$('.ldapSetBox5 label.checkbox').click(function()
	{
		if($(this).hasClass("checked"))
		{
			$(this).removeClass("checked");
		}
		else
		{
			$(this).addClass("checked");
		}
	});
	$('.ldapSetBox5 .optionList dd').die('mouseover');
  	$('.ldapSetBox5 .optionList dd').live('mouseover',function()
	{
		$(this).addClass("hover");
	})
	$('.ldapSetBox5 .optionList dd').die('mouseout');
	$('.ldapSetBox5 .optionList dd').live('mouseout',function()
	{
		$(this).removeClass("hover");
	});
	/*$(document).click(function(e)
   	{
		if(!$(e.target).hasClass("selectBox"))
		{
			$('.ldapSetBox5 .optionList').hide();
		}
		
   	})*/
});

//处理输入属性的时候样式问题
$('.step5Input').click(function(){
	$(this).attr('value', '').css('color','#4f4f4f');
});
$('.step5Input').bind('blur', function(){
	if($(this).val() == ''){
		$(this).attr('value', '选择标签').removeAttr('style');
	}
});
