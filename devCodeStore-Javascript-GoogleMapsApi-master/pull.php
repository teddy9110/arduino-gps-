<?php

// needs updating

$mysqli = mysqli_connect("mi-linux.wlv.ac.uk", "1305057", "mickymouse1", "db1305057");



if (!$mysqli) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$lineB = "\n";

$file = "/home/stud/0/1305057/public_html/store.txt";
//$time = date("d") ;


$f = fopen($file, 'w'); // Open in write mode.MYSQLI_USE_RESULT

if ($result = $mysqli->query("SELECT * FROM Location")) {

	printf("Select returned %d rows.\n", $result->num_rows);

		for($i =0; $i <$result->num_rows;$i++){

         			mysqli_data_seek($result,$i);

         			$row =  mysqli_fetch_row($result);

         			printf ( $flag = $row[0]);

        			echo fwrite($f, $flag);

              echo fwrite($f, ",");

              printf ( $flag = $row[1]);

              echo fwrite($f, $flag);

              echo fwrite($f, ",");

              printf ( $flag = $row[2]);

              echo fwrite($f, $flag);

              echo fwrite($f, ",");

              printf ( $flag = $row[3]);

              echo fwrite($f, $flag);

              echo fwrite($f, ",");

              echo fwrite($f, '\n\ ');

              echo fwrite($f,$lineB);

        //      $time = $row[4];
        //      printf($time);

		}
    	fclose($f);
}else{

  echo("failed sql ");
}



 $mysqli->close();

?>
