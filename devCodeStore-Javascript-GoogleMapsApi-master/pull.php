<?php

// needs updating

$mysqli = mysqli_connect("mi-linux.wlv.ac.uk", "1305057", "mickymouse1", "db1305057");



if (!$mysqli) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}



$file = "/home/stud/0/1305057/public_html/store.txt";


$f = fopen($file, 'w'); // Open in write mode.MYSQLI_USE_RESULT

if ($result = $mysqli->query("SELECT * FROM Location")) {

printf("Select returned %d rows.\n", $result->num_rows);

 mysqli_data_seek($result,0);

 $row =  mysqli_fetch_row($result);

 printf ( $flag = $row[0]);
 printf("   ");
 printf (   $Id = $row[1]);
 printf("   ");
 printf (    $long = $row[2]);
 printf("   ");
   printf (   $lat = $row[3]);

}




//echo fwrite($f,);





//fclose($file);


 $mysqli->close();

/*

//mysqli_free_result($res);


fclose($f);
echo "<a href=/home/stud/0/1305057/public_html/store.txt></a>";

*/
?>
