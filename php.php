<html>
<head>
<title>VisotorNum</title>
</head>
<body>
<?php
$con = mysql_connect("mysql-n","n1922708admin","lgh123");
if(!$con)
{
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("n1922708_blog", $con);

mysql_query("UPDATE test SET visitorNum = visitorNum + 1 WHERE userID = 1");
$result = mysql_query("SELECT * FROM test where userID = '1'");

echo "<table border='1'>
<tr>
<th>userID</th>
<th>visitorNum</th>
</tr>";

while($row = mysql_fetch_array($result))
{
	echo "<tr>";
	echo "<td>" . $row['userID'] . "</td>";
	echo "<td>" . $row['visitorNum'] . "</td>";
	echo "</tr>";
}
echo "</table>";

mysql_close($con);
?>
</body>
</html>