<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User_Passwd_Modify_Model extends MY_Model{
    const TBL = 'user_passwd_modify';
    //构造函数
    public function __construct(){
        //调用父类构造函数，必不可少
        parent::__construct(); 
        $this->set_table('user_passwd_modify');
    }
    
}