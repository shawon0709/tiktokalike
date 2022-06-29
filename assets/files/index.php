<?php
/**
 * Created by PhpStorm.
 * User: Shawon
 * Date: 6/20/2022
 * Time: 12:19 AM
 */
if(isset($_POST['filelist'])){
    $curDir = dirname(__FILE__);
    $myfiles = scandir($curDir);
    foreach($myfiles as $file){
//        if(strpos($file, ".php") !== false){
//            //do nothing
//        }else{
//            if(strlen($file)>2){
//                echo $file.',';
//            }
//        }
//        function isVideo($file) {
//            return is_file($file) && (0 === strpos(mime_content_type($file), 'video/'));
//        }

        if(isVideo($file)){
            echo $file.',';
        };
    }
}

function isVideo($file) {
    return is_file($file) && (0 === strpos(mime_content_type($file), 'video/'));
}