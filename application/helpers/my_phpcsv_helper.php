<?php
/**
 * PHPEXCEL生成excel文件
 * @desc 支持任意行列数据生成excel文件，暂未添加单元格样式和对齐
*/
include_once APPPATH . 'helpers/my_publicfun_helper.php';//公用函数

require_once 'phpexcel/Classes/PHPExcel.php';
require_once 'phpexcel/Classes/PHPExcel/Writer/Excel2007.php';
//require_once 'phpexcel/Classes/PHPExcel/Writer/Excel5.php';
include_once 'phpexcel/Classes/PHPExcel/IOFactory.php'; 

$fileName = "test_excel";
/**$headArr = array("第一列","第二列","第三列");
 * $_POST[name]可以把表单中输入的信息存入到excel中的表头位置
 * 
 */

 $headArr = array("","","");

// 给excel中填入了死的信息
 /*  $data = array(array(1,2,5),
              array(1,3),
              array(5,7));*/
// 可获得表单中输入的内容
$data = array(array($_POST[name],$_POST[age],$_POST[Position]),
              array(),
              array());
getExcel($fileName,$headArr,$data);
	 
	 
 if ( ! function_exists('getExcel'))
{
    function getExcel($fileName,$headArr,$data){
       /*
        if(bn_is_empty($data) || !is_array($data)){
            die("data must be a array");
        }
        * 如果为空的文件名，则退出！
        */
        if(bn_is_empty($fileName)){
            exit;
        }
        //获得当前的日期
        $date = date("Y_m_d",time());
        $fileName .= "_{$date}.xlsx";

        //创建新的PHPExcel对象
        $objPHPExcel = new PHPExcel();
        $objProps = $objPHPExcel->getProperties();

        //设置表头
        $key = ord("A");
        foreach($headArr as $v){
            $colum = chr($key);
            $objPHPExcel->setActiveSheetIndex(0) ->setCellValue($colum.'1', $v);
            $key += 1;
        }

        $column = 2;
        $objActSheet = $objPHPExcel->getActiveSheet();
        foreach($data as $key => $rows){ //行写入
            $span = ord("A");
            foreach($rows as $keyName=>$value){// 列写入
                $j = chr($span);
                $objActSheet->setCellValue($j.$column, $value);
                $span++;
            }
            $column++;
        }

        $fileName = iconv("utf-8", "gb2312", $fileName);
        //重命名表
        $objPHPExcel->getActiveSheet()->setTitle('Simple');
        //设置活动单指数到第一个表,所以Excel打开这是第一个表
        $objPHPExcel->setActiveSheetIndex(0);
        //将输出重定向到一个客户端web浏览器(Excel2007)
              header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              header("Content-Disposition: attachment; filename=\"$fileName\"");
              header('Cache-Control: max-age=0');
              $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
              if(!bn_is_empty($_GET['excel'])){
                $objWriter->save('php://output'); //文件通过浏览器下载
              }else{
                //  $objWriter->save($fileName); //脚本方式运行，保存在当前目录
                $objWriter->save(  'php://output');
            }
      exit;

    }
}