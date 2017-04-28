<?php
//echo "inside twitter-sentiment module";
header('Access-Control-Allow-Origin: *');

exec('sudo ./twitter.sh ');
header('Location: /Research-Platform-Stock-Market/view/twitter.html');
?>
