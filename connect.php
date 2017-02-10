<?php

	
function Connection()
{
/*
	$server="mi-linux.wlv.ac.uk";
		
	$user="1305057";
		
	$pass="mickymouse1";
		
	$db="db1305057";
	   	
*/
		
	$mysqli = new mysqli("mi-linux.wlv.ac.uk", "1305057", "mickymouse1", "database");
			if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
				}
				
		//	echo $mysqli->host_info . "\n";
		
		return($mysqli);

	
	
}

?>


