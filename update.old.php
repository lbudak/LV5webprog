<?php 
    require 'ferit.database.php';
    $db = new Database("db", "ferit", "user", "test");
    $db->Connect();
    $var_value = $_GET['idEdit'];
    
    require 'picture.php';
	$filecount = countPng();     
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
	<h2>UPDATE FIGHTER</h2>
	<form method="post" action="update.php">
	<?php
        $query = "SELECT * FROM cats WHERE id = " .  $var_value;
        $results = $db->Read($query);
        if(mysqli_num_rows($results) > 0):
        while($row = mysqli_fetch_assoc($results)):
    ?>
	
		<div class="input-group">
			<label>Name</label>
			<input type="text" name="name" value="<?=$row["name"]?>">
		</div>
		<div class="input-group">
			<label>Age</label>
			<input type="number" name="age" value="<?=$row["age"]?>">
		</div>
		<div class="input-group">
			<label>Cat info</label>
			<input type="text" name="info" size="100" value="<?=$row["info"]?>">
		</div>
		<div class="input-group">
			<label>Win</label>
			<input type="number" name="wins" value="<?=$row["wins"]?>">
		</div>
        <div class="input-group">
			<label>Loss</label>
			<input type="number" name="loss" value="<?=$row["loss"]?>"> 
		</div>
        <br>
        <div>
            <label>Cat image</label>
            <?php echo '<img src="' . $row['image'] . '" width="150" height="150">' ?>
            <label>Select new picture</label>
            <select name="cats">
                <?php
					for($i = 1; $i <= $filecount; $i++):
				?>
				    <option value="./img/cat<?=$i?>.png">cat<?=$i?></option>
				<?endfor;?>
			 </select>
            
        </div>
        <?php endwhile; endif;?>
        <?$db->CloseConnection();?>
        <br>
        <button type="submit" name="update" value="<?=$var_value?>">Update</button> 
        </form>

        <br>

        <form method="get" action="delete.php">
            <button type="submit" name="delete" value="<?=$var_value?>">Delete fighter</button>
		</form>
        <p>
		    <a href="index.php"> <- Go back</a>
		</p>
</body>
</html>

